import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { ENV } from './config/env.js';
import routes from './routes/index.js';
import { autoSeedIfEmpty } from './utils/seedData.js';

const app = express();

// Flexible CORS allowing localhost, Render domains, and custom domain
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.endsWith('.onrender.com') ||
      (ENV.FRONTEND_URL && origin === ENV.FRONTEND_URL)
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Allow all for seamless deployment
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static user uploads
const uploadsPath = path.resolve(process.cwd(), ENV.UPLOAD_DIR);
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// Mount REST API routes
app.use('/api', routes);

// Global health check
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date(), env: ENV.NODE_ENV });
});

// Serve Frontend Static Build if present (Enables unified single-service deploy on Render!)
const possibleDistPaths = [
  path.resolve(process.cwd(), '../frontend/dist'),
  path.resolve(process.cwd(), 'frontend/dist'),
  path.resolve(process.cwd(), 'dist/public'),
  path.resolve(process.cwd(), '../dist')
];

const resolvedDist = possibleDistPaths.find(p => fs.existsSync(p));

if (resolvedDist) {
  console.log(`📦 Serving frontend static build from ${resolvedDist}`);
  app.use(express.static(resolvedDist));

  // Catch-all route for SPA client routing (/admin, /admin/login, etc.)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(resolvedDist, 'index.html'));
  });
}

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = Number(process.env.PORT) || Number(ENV.PORT) || 5001;

app.listen(PORT, async () => {
  console.log(`✨ Birthday Server running at http://localhost:${PORT}`);
  console.log(`📁 Static uploads served from ${uploadsPath}`);
  // Automatically seed database on first startup if empty
  await autoSeedIfEmpty();
});
