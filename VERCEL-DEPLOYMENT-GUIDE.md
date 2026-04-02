# Vercel Deployment Guide - CCS Profiling System Frontend

## ✅ Prerequisites Completed

- ✅ All 17 frontend files updated to use centralized API service
- ✅ Backend URL configured: `https://ccsdep-profiling-system.onrender.com`
- ✅ MongoDB Atlas connected to backend
- ✅ DNS issues resolved in backend

---

## Step-by-Step Deployment to Vercel

### Step 1: Prepare Your Frontend Code

Make sure all changes are committed:

```bash
git add .
git commit -m "Update all API calls to use Render backend"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to client folder**:
   ```bash
   cd client
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

#### Option B: Using GitHub Integration

1. Go to https://vercel.com/new
2. Import your Git repository
3. Set the **Root Directory** to `client`
4. Add environment variables (see Step 3)
5. Click "Deploy"

---

### Step 3: Set Environment Variables in Vercel

**CRITICAL**: You must set this environment variable in Vercel:

```
Name: REACT_APP_API_URL
Value: https://ccsdep-profiling-system.onrender.com
```

**How to add:**

1. Go to your project in Vercel Dashboard
2. Click on **"Settings"**
3. Click on **"Environment Variables"**
4. Click **"Add New"**
5. Enter:
   - Key: `REACT_APP_API_URL`
   - Value: `https://ccsdep-profiling-system.onrender.com`
6. Click **"Save"**
7. **Redeploy** your application for changes to take effect

---

### Step 4: Update Backend CORS

Your backend needs to allow requests from your Vercel domain.

**Update `server.js`**:

```javascript
// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app'  // Replace with your actual Vercel URL
  ],
  credentials: true
}));
```

**Then redeploy backend to Render**:

```bash
git add .
git commit -m "Update CORS to allow Vercel frontend"
git push origin main
```

---

## Testing After Deployment

### 1. Test Frontend Deployment
Visit your Vercel URL: `https://your-app.vercel.app`

### 2. Test API Connection
Open browser console and verify:
- No CORS errors
- API calls going to `https://ccsdep-profiling-system.onrender.com`
- Data is loading correctly

### 3. Test All Features
- ✅ Dashboard loads student data
- ✅ Student list displays
- ✅ Add/Edit/Delete operations work
- ✅ Faculty, Events, Schedules, Instructions all work
- ✅ Query system filters load properly

---

## Troubleshooting

### Issue: CORS Errors

**Solution**: Make sure your backend CORS includes your Vercel domain:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-app.vercel.app'],
  credentials: true
}));
```

### Issue: API Calls Failing

**Check**:
1. Environment variable is set correctly in Vercel
2. Backend is running on Render: https://ccsdep-profiling-system.onrender.com/api/health
3. MongoDB Atlas connection is working

### Issue: Build Fails on Vercel

**Check**:
1. Node version in `client/package.json` matches Vercel's supported versions
2. All dependencies are installed
3. Build script runs locally: `npm run build`

---

## Vercel Configuration (vercel.json)

If you need custom configuration, create `client/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": { "cache-control": "s-maxage=31536000, immutable" },
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## URLs Summary

- **Frontend (Vercel)**: `https://your-app.vercel.app`
- **Backend (Render)**: `https://ccsdep-profiling-system.onrender.com`
- **Database**: MongoDB Atlas (connected via backend)

---

## Post-Deployment Checklist

- ✅ Frontend deployed to Vercel
- ✅ Environment variable `REACT_APP_API_URL` set
- ✅ Backend CORS updated with Vercel domain
- ✅ All CRUD operations tested
- ✅ No console errors
- ✅ MongoDB data persisting correctly
- ✅ All pages loading without errors

---

## Quick Commands Reference

### Local Testing
```bash
# Start backend
node server.js

# In another terminal, start frontend
cd client
npm start
```

### Build & Deploy
```bash
cd client
npm run build
vercel --prod
```

### Check Backend Health
```
https://ccsdep-profiling-system.onrender.com/api/health
```

---

## Success Indicators

✅ All API calls use: `https://ccsdep-profiling-system.onrender.com/api/...`  
✅ No localhost references in production code  
✅ Environment variable configured in Vercel  
✅ CORS allows Vercel domain  
✅ MongoDB Atlas receiving data  
✅ All 17 component files using `apiService`  

**You're ready to deploy!** 🚀
