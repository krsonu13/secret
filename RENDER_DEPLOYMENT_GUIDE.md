# 🚀 Step-by-Step Render Deployment Guide

Your project is **100% Render deployment-ready**! You can deploy the complete full-stack app (React Frontend + Express API + PostgreSQL Database) on Render.com in just a few minutes.

---

## 📋 Pre-requisites: Push to GitHub

If you haven't pushed this folder to a GitHub repository yet, run these commands in your Mac terminal:

```bash
cd ~/Desktop/vaishnavi

# Initialize git repository if not already done
git init
git add .
git commit -m "Happy Birthday Sister - Full Stack Web Application"

# Create a new repository on GitHub (e.g., https://github.com/your-username/vaishnavi-birthday)
# Then link and push:
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## 🌟 Method 1: The Easiest Way — Render Blueprint (Automatic 1-Click)

This project includes a pre-configured `render.yaml` file. Render will automatically create both the PostgreSQL database and the Web Service for you!

1. Go to **[dashboard.render.com](https://dashboard.render.com/)** and log in (or sign up with GitHub).
2. Click the **"New +"** button at the top right, then select **"Blueprint"**.
3. Connect your GitHub repository (`YOUR_REPO_NAME`).
4. Render will read `render.yaml` and show:
   - **birthday-postgres-db** (Free PostgreSQL Database)
   - **birthday-sister-app** (Full-stack Web Service)
5. Click **"Apply"**!
6. Render will automatically:
   - Provision PostgreSQL
   - Run `npm run render:build` (builds the React frontend and compiles the backend)
   - Connect the database and auto-seed initial data
   - Start the live website!

Once the build finishes (takes ~2-3 minutes), Render will give you a live URL, e.g.:
👉 **`https://birthday-sister-app.onrender.com`**

---

## 🛠️ Method 2: Manual Step-by-Step Setup on Render

If you prefer to configure services manually in the Render dashboard:

### Step 1: Create PostgreSQL Database
1. In Render Dashboard, click **New +** → **PostgreSQL**.
2. Name: `birthday-postgres-db`
3. Database: `birthday_db`
4. User: `birthday_user`
5. Region: Pick the region closest to you (e.g., Singapore or Oregon).
6. Plan: **Free**.
7. Click **Create Database**.
8. After it is created, copy the **"Internal Database URL"** (or External Database URL).

### Step 2: Create Web Service
1. Click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Name**: `vaishnavi-birthday`
   - **Region**: Same as your database.
   - **Branch**: `main`
   - **Root Directory**: Leave blank (root).
   - **Runtime**: `Node`
   - **Build Command**: `npm run render:build`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**
4. Scroll down to **Environment Variables** and add:
   - `DATABASE_URL`: *(Paste the PostgreSQL connection string from Step 1)*
   - `JWT_SECRET`: `vaishnavi_birthday_secret_key_super_secure_2026_sister_love`
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
5. Click **Create Web Service**!

---

## 🔑 Logging Into Admin on Your Live Website

Once deployed, visit your live URL:
- **Public Site**: `https://your-app-name.onrender.com`
- **Admin Login**: `https://your-app-name.onrender.com/admin/login`

### Default Admin Login (Auto-seeded on first run):
- **Email**: `admin@birthday.com`
- **Password**: `SisterSurprise2026!`

From the Admin Dashboard, you can:
- Change her name, birthday countdown date, and hero messages
- Upload real photos directly to her Memory Lane
- Add your own milestones to "Our Story" timeline
- Moderate guest birthday wishes submitted by friends & family

---

## 💡 Important Tips for Render Free Tier:
- **Zero Cold Start Downtime**: The database and server automatically wake up on demand.
- **Auto-Seed**: When the app first connects to a fresh database on Render, it automatically seeds all placeholder memories, reasons, wishes, and admin credentials so the site is never blank!
