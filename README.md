# Happy Birthday, My Dear Sister ❤️

A full-stack, emotional, and interactive birthday web application crafted with love for my sister. Built with a modern, glassmorphic sibling aesthetic and backed by an Express + PostgreSQL + Prisma backend with a full admin management dashboard.

---

## 🌟 Key Features

### 1. Public Sibling Experience (`/`)
- **Fullscreen Hero Landing**: Staggered motion typography, floating hearts and particle stars, and an animated **"Open Your Surprise 🎁"** call-to-action button with confetti explosions.
- **Dynamic Birthday Countdown**: Fetches the exact birthday date from PostgreSQL and counts down in real-time (Days | Hours | Minutes | Seconds). Automatically switches to **"IT’S YOUR DAY! 🎉❤️"** celebration mode with fireworks when the special date arrives.
- **Personalized Emotional Message**: *"A Message From My Heart ❤️"* displayed with elegant glassmorphism and animated text reveal.
- **Memory Lane Gallery**: High-res masonry photo grid with dates, titles, captions, stories, and an interactive **Fullscreen Lightbox** with next/prev controls.
- **Our Story So Far Timeline**: Vertical milestone timeline with Framer Motion scroll animations tracing the journey from childhood fights to today.
- **"Things That Make You… YOU ❤️"**: Animated glow cards highlighting her unique qualities (her smile, crazy side, kind heart, strength, and family bond).
- **Interactive Surprise Gift Box**: 3D-styled animated gift box that darkens the screen upon click, triggers celebratory fireworks, and reveals an emotional sibling lifetime pledge.
- **"Close Your Eyes & Make A Wish ✨"**: 3D animated cake with glowing candles that can be blown out with smoke animations, cheers, and blessings.
- **Birthday Wishes & Moderated Guestbook**: Cards of warm wishes from family/friends + a public submission form with moderation status (Pending → Approved).
- **Floating Music Player**: User-controlled ambient background player with animated sound visualizer bars (supports custom uploaded MP3 audio or automatic synthesized real-time chiptune melody).
- **Extra Creative Touches**:
  - Heart cursor trail on desktop
  - Subtle birthday scroll progress indicator
  - Secret Easter Egg: Click the navbar heart 5 times to reveal: *"P.S. You’re stuck with me forever. 😂❤️"*
  - Reduced-motion accessibility support (`prefers-reduced-motion`)

### 2. Admin Dashboard (`/admin`)
- Accessible via secure login at `/admin/login`
- **Dashboard Overview**: Metrics on total memories, total wishes, pending wishes requiring approval, and active birthday date.
- **Birthday Settings**: Edit sister name, birthday date, hero subtitles, main emotional message, and final message.
- **Memories CRUD**: Upload real photos, set captions, descriptions, dates, and display order.
- **Timeline CRUD**: Manage chapters, descriptions, dates, and milestones.
- **Reasons CRUD**: Manage cards, descriptions, and icon styles.
- **Wishes Moderation**: Review guest wishes with 1-click **Approve**, **Reject**, or **Delete** actions.
- **Music Management**: Set music title, upload custom audio files, or toggle playback.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, Canvas Confetti
- **Backend**: Node.js, Express.js, TypeScript, Multer, Express Rate Limit, Cookie-Parser, CORS
- **Database & ORM**: PostgreSQL, Prisma ORM
- **Authentication**: JWT, bcrypt password hashing, HTTP-only cookie support
- **Storage**: Local filesystem storage (`/uploads/memories`, `/uploads/music`) with clean abstraction layer for future S3/Cloudinary migration

---

## 🚀 Quick Start & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (or Docker)

### 1. Database Setup
Ensure PostgreSQL is running locally and create the database:
```bash
createdb birthday_db
```

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```
*Backend runs on [http://localhost:5000](http://localhost:5000)*

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
*Frontend runs on [http://localhost:5173](http://localhost:5173)*

---

## 🔑 Default Admin Credentials (from Seed Script)
- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@birthday.com`
- **Password**: `SisterSurprise2026!`

*(You can change these anytime in `/backend/prisma/seed.ts` or via the database).*

---

## 🐳 Docker Deployment
To run everything via Docker Compose:
```bash
docker-compose up --build
```

---

## 📄 API Documentation

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/birthday` | Get public birthday profile & messages | No |
| `GET` | `/api/memories` | Get all memory photos | No |
| `GET` | `/api/timeline` | Get story timeline events | No |
| `GET` | `/api/reasons` | Get reasons why she is special | No |
| `GET` | `/api/wishes` | Get approved guest wishes | No |
| `POST` | `/api/wishes` | Submit a new guest wish (rate-limited) | No |
| `GET` | `/api/music` | Get music configuration | No |
| `POST` | `/api/auth/login` | Admin login | No |
| `POST` | `/api/auth/logout` | Admin logout | No |
| `GET` | `/api/auth/me` | Verify admin session | Yes (Admin) |
| `PUT` | `/api/admin/birthday` | Update birthday settings | Yes (Admin) |
| `POST` | `/api/admin/memories` | Upload memory photo & details | Yes (Admin) |
| `DELETE` | `/api/admin/memories/:id`| Delete memory | Yes (Admin) |
| `POST` | `/api/admin/timeline` | Add timeline milestone | Yes (Admin) |
| `POST` | `/api/admin/reasons` | Add reason card | Yes (Admin) |
| `GET` | `/api/admin/wishes` | View all wishes (pending & approved) | Yes (Admin) |
| `PATCH`| `/api/admin/wishes/:id/approve` | Approve a guest wish | Yes (Admin) |
| `PATCH`| `/api/admin/wishes/:id/reject` | Reject a guest wish | Yes (Admin) |
| `PUT` | `/api/admin/music` | Update music or upload audio file | Yes (Admin) |
