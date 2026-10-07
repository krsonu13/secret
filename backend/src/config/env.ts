import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://sonukumar@localhost:5432/birthday_db',
  JWT_SECRET: process.env.JWT_SECRET || 'vaishnavi_birthday_secret_key_super_secure_2026_sister_love',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
