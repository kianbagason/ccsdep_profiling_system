# 🚀 CCS Profiling System Deployment Guide

## 📋 Deployment Architecture
- **Frontend**: Vercel (React App)
- **Backend**: Render (Node.js API)
- **Database**: MongoDB Atlas (Cloud Database)

---

## 🗄️ Step 1: Setup MongoDB Atlas

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster (Free Tier - M0)
4. Choose region closest to your users

### 2. Configure Database Access
1. Go to "Database Access" → "Add New Database User"
2. Create user with strong password
3. Give "Read and write to any database" permissions

### 3. Configure Network Access
1. Go to "Network Access" → "Add IP Address"
2. Choose "Allow Access from Anywhere" (0.0.0.0/0)
3. Click "Confirm"

### 4. Get Connection String
1. Go to "Database" → "Connect" → "Connect your application"
2. Copy the connection string
3. Replace `<password>` with your database user password

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 1. Connect GitHub to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your GitHub repository
5. Choose the `client` folder as root directory

### 2. Configure Vercel Settings
1. **Framework Preset**: Create React App
2. **Build Command**: `npm run build`
3. **Output Directory**: `build`
4. **Environment Variables**:
   - `REACT_APP_API_URL`: `https://your-render-app-url.onrender.com`

### 3. Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the Vercel URL (needed for backend CORS)

---

## ⚙️ Step 3: Deploy Backend to Render

### 1. Connect GitHub to Render
1. Go to [Render](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your GitHub repository

### 2. Configure Render Settings
1. **Name**: `ccs-profiling-system-api`
2. **Root Directory**: `.` (root of repo)
3. **Runtime**: Node
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. **Instance Type**: Free (starts at $0/month)

### 3. Environment Variables
Add these in Render Dashboard:
```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://your-vercel-app-url.vercel.app
```

### 4. Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy the Render URL

---

## 🔧 Step 4: Update Environment Variables

### Frontend (Vercel)
1. Go to Vercel Dashboard → Your Project → Settings
2. Add Environment Variable:
   - `REACT_APP_API_URL`: `https://your-render-app.onrender.com`
3. Redeploy from Vercel dashboard

### Backend (Render)
1. Go to Render Dashboard → Your Service → Environment
2. Add/Update Environment Variables:
   - `MONGODB_URI`: `mongodb+srv://username:password@cluster.mongodb.net/ccs_profiling_system`
   - `CLIENT_URL`: `https://your-vercel-app.vercel.app`
3. Redeploy from Render dashboard

---

## 📊 Step 5: Test Deployment

### 1. Check Backend Health
```bash
curl https://your-render-app.onrender.com/api/health
```

### 2. Check Frontend
1. Visit your Vercel URL
2. Navigate through all pages
3. Test CRUD operations

### 3. Test API Endpoints
- Students: `/api/students`
- Faculty: `/api/faculty`
- Instruction: `/api/instruction`
- Schedule: `/api/scheduling`
- Events: `/api/events`

---

## 🎯 Final URLs Structure
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-api.onrender.com`
- **Database**: MongoDB Atlas (no direct URL)

---

## 🔍 Troubleshooting

### Common Issues:
1. **CORS Errors**: Update `CLIENT_URL` in backend
2. **Database Connection**: Check MongoDB Atlas whitelist
3. **Build Failures**: Check package.json versions
4. **API 404s**: Verify route paths in production

### Debug Commands:
```bash
# Check backend logs on Render
# Go to Render Dashboard → Your Service → Logs

# Check frontend deployment on Vercel
# Go to Vercel Dashboard → Your Project → Logs
```

---

## 🎉 Success Indicators
✅ Frontend loads without errors
✅ All navigation works
✅ API endpoints respond correctly
✅ Data operations (CRUD) work
✅ No CORS errors in browser console
✅ Mobile responsive design works

Your CCS Profiling System is now live! 🚀
