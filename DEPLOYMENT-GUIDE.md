# Deployment Guide - Render + Vercel

This guide will help you deploy the CCS Profiling System with:
- **Backend API** → Render.com
- **Frontend** → Vercel

---

## Prerequisites

1. **MongoDB Atlas Account** (free tier available)
   - Create account at: https://www.mongodb.com/cloud/atlas/register
   - Create a cluster and get your connection string

2. **Render Account**
   - Sign up at: https://render.com

3. **Vercel Account**
   - Sign up at: https://vercel.com

---

## Step 1: Deploy Backend to Render

### 1.1 Connect Your Repository
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the repository containing your code

### 1.2 Configure Web Service
Fill in the following settings:

```
Name: ccs-profiling-backend
Region: Singapore (or closest to your location)
Branch: main (or your default branch)
Root Directory: (leave blank)
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### 1.3 Add Environment Variables

In Render dashboard, add these environment variables:

```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/ccs_profiling_system?retryWrites=true&w=majority
CLIENT_URL=https://your-app.vercel.app (you'll get this after deploying frontend)
JWT_SECRET=your-secret-key-here-generate-a-random-string
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Important:** Replace `MONGODB_URI` with your actual MongoDB Atlas connection string.

### 1.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment to complete (~2-5 minutes)
3. Copy your Render URL (e.g., `https://ccs-profiling-backend.onrender.com`)

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
```

### 2.2 Deploy via Vercel Dashboard

**Option A: Using Vercel Dashboard (Easiest)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:

```
Framework Preset: Create React App
Root Directory: client
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

5. Add Environment Variable:
   - Name: `REACT_APP_API_URL`
   - Value: Your Render backend URL (e.g., `https://ccs-profiling-backend.onrender.com`)

6. Click **"Deploy"**

**Option B: Using Vercel CLI**

```bash
# Navigate to client directory
cd client

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

When prompted, add the environment variable:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### 2.3 Update CORS Settings

After getting your Vercel URL:

1. Go back to **Render Dashboard**
2. Update the `CLIENT_URL` environment variable with your Vercel URL:
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```
3. Redeploy the backend service

---

## Step 3: Verify Deployment

### 3.1 Test Backend API
Visit your Render URL in browser:
```
https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "CCS Profiling System API is running",
  "timestamp": "2024-..."
}
```

### 3.2 Test Frontend
Visit your Vercel URL:
```
https://your-app.vercel.app
```

The app should load and connect to the backend API.

---

## Step 4: MongoDB Atlas Setup (If Not Done)

### 4.1 Create Cluster
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier M0)
3. Wait for cluster to be created

### 4.2 Create Database User
1. Go to **Database Access**
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Set username and password
5. Grant **Read and write to any database** permission
6. Click **"Add User"**

### 4.3 Whitelist IP Address
1. Go to **Network Access**
2. Click **"Add IP Address"**
3. For development, select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 4.4 Get Connection String
1. Go to **Database**
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `ccs_profiling_system`

Example:
```
mongodb+srv://myUser:myPassword@cluster0.xxxxx.mongodb.net/ccs_profiling_system?retryWrites=true&w=majority
```

---

## Troubleshooting

### Backend Issues on Render

**Problem:** Backend crashes or won't start
```bash
# Check logs in Render dashboard
Dashboard → Your Service → Logs
```

**Problem:** MongoDB connection error
- Verify MongoDB Atlas connection string
- Check Network Access allows all IPs (0.0.0.0/0)
- Ensure database user credentials are correct

**Problem:** CORS errors
- Update `CLIENT_URL` in Render to match your Vercel URL exactly
- Include `https://` prefix
- Redeploy backend after changing env vars

### Frontend Issues on Vercel

**Problem:** API calls fail
- Check `REACT_APP_API_URL` environment variable in Vercel
- Verify backend URL is accessible
- Check browser console for errors

**Problem:** Build fails
- Ensure Node version is >= 14.0.0
- Check build logs in Vercel dashboard
- Run `npm run build` locally to test

---

## Updating Your Deployment

### Update Backend (Render)
```bash
# Push changes to Git
git add .
git commit -m "Your message"
git push

# Render auto-deploys on push
# Or manually redeploy from Render dashboard
```

### Update Frontend (Vercel)
```bash
# Push changes to Git
git add .
git commit -m "Your message"
git push

# Vercel auto-deploys on push
# Or deploy via CLI:
cd client
vercel --prod
```

---

## Environment Variables Summary

### Render (Backend)
| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Production mode |
| `PORT` | `10000` | Render provides this |
| `MONGODB_URI` | `mongodb+srv://...` | MongoDB Atlas connection |
| `CLIENT_URL` | `https://your-app.vercel.app` | Frontend URL |
| `JWT_SECRET` | `random-string` | Secret key for JWT |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

### Vercel (Frontend)
| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-backend.onrender.com` | Backend API URL |

---

## Performance Tips

1. **Enable Caching**: Consider adding Redis for frequently accessed data
2. **Optimize Images**: Compress images before deploying
3. **CDN**: Vercel automatically serves static assets via CDN
4. **Database Indexes**: Add indexes to frequently queried fields
5. **Monitor Usage**: Both Render and Vercel have usage limits on free tier

---

## Support

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Project Issues**: Check application logs in respective dashboards

---

**Last Updated:** April 2026
