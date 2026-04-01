# 🚀 DEPLOYMENT CHECKLIST - Clean Setup

## ✅ What's Been Configured

### Frontend (Vercel)
- ✅ `vercel.json` created with correct build configuration
- ✅ API configured to use Render backend: `https://ccs-profiling-backend.onrender.com`
- ✅ Build command: `cd client && npm ci && npm run build`
- ✅ Output directory: `client/build`
- ✅ Latest commit pushed: `8ec3a30`

### Backend (Render)
- ✅ Deployed at: `https://ccs-profiling-backend.onrender.com`
- ✅ Auto-deploy enabled on commit
- ✅ Environment variables configured in Render dashboard

---

## 📋 STEP-BY-STEP DEPLOYMENT GUIDE

### Step 1: Delete Old Vercel Projects ✋
1. Go to: https://vercel.com/dashboard
2. For EACH project (`g681` and `qggv`):
   - Click on the project
   - Go to **Settings** → **General**
   - Scroll down → Click **"Delete Project"**
   - Confirm deletion

### Step 2: Create New Vercel Deployment 🆕
1. Go to: https://vercel.com/new
2. Click **"Import Project"** or **"Add New..."** → **"Project"**
3. Under **"Import Git Repository"**, select: `kianbagason/ccsdep_profiling_system`
4. Click **"Import"**

### Step 3: Configure Build Settings ⚙️

**Framework Preset:**
- Select: **Create React App**

**Root Directory:**
- Click **"Edit"**
- Set to: `client`

**Build Command:**
- Should auto-fill as: `npm run build`
- If not, set manually: `npm run build`

**Output Directory:**
- Should auto-fill as: `build`
- If not, set manually: `build`

**Install Command:**
- Leave as default or: `npm install`

### Step 4: Add Environment Variables 🌍

Click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://ccs-profiling-backend.onrender.com` |

### Step 5: Deploy! 🎯
1. Click **"Deploy"**
2. Wait 3-5 minutes for build to complete
3. Watch the build logs for any errors

### Step 6: Verify Deployment ✅

After deployment shows "Ready":
1. Click on your new deployment URL
2. Test if the app loads
3. Open browser console (F12) and check for API errors
4. Try loading data from the backend

---

## 🔧 BACKEND CONFIGURATION (Render)

### Update CORS Settings on Render:
1. Go to: https://dashboard.render.com/
2. Click on: **ccs-profiling-backend**
3. Go to: **Environment** tab
4. Add/Update environment variable:

| Key | Value |
|-----|-------|
| `CLIENT_URL` | `https://YOUR-NEW-VERCEL-URL.vercel.app` |

5. Click **"Save Changes"**
6. Wait for redeploy to complete (~2 minutes)

---

## 🎉 FINAL VERIFICATION

### Test Your Application:
1. ✅ Visit your Vercel URL
2. ✅ Check if homepage loads without 404
3. ✅ Open browser DevTools (F12)
4. ✅ Check Network tab for successful API calls
5. ✅ Verify data is loading from Render backend

### Test Backend Health:
Visit: `https://ccs-profiling-backend.onrender.com/api/health`

Should return:
```json
{
  "status": "OK",
  "message": "CCS Profiling System API is running",
  "timestamp": "..."
}
```

---

## 🐛 TROUBLESHOOTING

### If Build Fails:
- Check build logs for specific error
- Common issues:
  - Missing dependencies → Check `package.json`
  - TypeScript errors → Check type definitions
  - Build command failed → Verify paths are correct

### If 404 Persists:
- Verify Root Directory is set to `client`
- Check that `vercel.json` exists in repository
- Review build output directory matches configuration

### If API Calls Fail:
- Check CORS settings on Render backend
- Verify `CLIENT_URL` includes your new Vercel URL
- Check browser console for CORS errors

---

## 📞 SUPPORT

If you encounter any issues during deployment:
1. Copy the error message from Vercel build logs
2. Share the specific step where it fails
3. Include any error messages from browser console

---

**Last Updated:** April 1, 2026  
**Latest Commit:** `8ec3a30` - Add clean vercel.json configuration
