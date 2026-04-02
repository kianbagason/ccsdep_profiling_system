# Project Reorganization Guide

## New Structure

```
Profiling_System/
├── backend/           # All backend files
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── ... (other backend files)
├── frontend/          # All frontend files  
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/
├── README.md
├── vercel.json
└── ... (root level docs)
```

## Manual Steps to Reorganize

### Step 1: Close All Programs
- Close VS Code, PowerShell, any programs using the project files
- This prevents "file in use" errors

### Step 2: Move Backend Files

Create these folders if they don't exist:
```
backend/
frontend/
```

**Move to `backend/` folder:**
- `models/` → `backend/models/`
- `routes/` → `backend/routes/`
- `server.js` → `backend/server.js`
- `.env` → `backend/.env`
- `package.json` → `backend/package.json`
- `package-lock.json` → `backend/package-lock.json`
- `populate-sample-data.js` → `backend/populate-sample-data.js`
- `populate-additional-data.js` → `backend/populate-additional-data.js`
- `test-atlas-connection.js` → `backend/test-atlas-connection.js`
- `test-connection.js` → `backend/test-connection.js`
- `verify-atlas-connection.js` → `backend/verify-atlas-connection.js`
- `check-atlas-config.js` → `backend/check-atlas-config.js`
- `test-with-google-dns.js` → `backend/test-with-google-dns.js`
- `diagnose-connection.js` → `backend/diagnose-connection.js`
- `render.yaml` → `backend/render.yaml`

### Step 3: Move Frontend Files

**Move entire client folder:**
- Rename/move `client/` → `frontend/`

Or move individual items:
- `client/src/` → `frontend/src/`
- `client/public/` → `frontend/public/`
- `client/build/` → `frontend/build/`
- `client/package.json` → `frontend/package.json`
- `client/package-lock.json` → `frontend/package-lock.json`
- `client/tailwind.config.js` → `frontend/tailwind.config.js`

### Step 4: Update Configuration Files

#### Update `vercel.json` (in root):
```json
{
  "version": 2,
  "env": {
    "NODE_VERSION": "18",
    "NODE_OPTIONS": "--max-old-space-size=4096"
  },
  "installCommand": "cd frontend && npm install --legacy-peer-deps",
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/build",
  "public": true,
  "rewrites": [
    {
      "source": "/static/(.*)",
      "destination": "/static/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/$1"
    }
  ]
}
```

#### Update `frontend/.env` (if exists):
```
REACT_APP_API_URL=https://ccsdep-profiling-system.onrender.com
```

### Step 5: Update Deployment Commands

**For Render (backend):**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`

**For Vercel (frontend):**
- Already configured in `vercel.json`
- Just add environment variable: `REACT_APP_API_URL`

### Step 6: Test Everything

**Test Backend:**
```bash
cd backend
node server.js
```

Should see:
```
CCS Profiling System server running on port 5000
Environment: development
✅ MongoDB connected successfully
```

**Test Frontend:**
```bash
cd frontend
npm start
```

Should open browser to http://localhost:3000

### Step 7: Commit and Push

```bash
git add -A
git commit -m "Reorganize project structure into backend and frontend folders"
git push origin master
```

---

## Alternative: Automated Script

If you prefer an automated approach, run this PowerShell script **as Administrator**:

```powershell
# Close all programs first!

# Create directories
New-Item -ItemType Directory -Path "backend" -Force
New-Item -ItemType Directory -Path "frontend" -Force

# Move backend files
Move-Item -Path "models" -Destination "backend\models" -Force -ErrorAction SilentlyContinue
Move-Item -Path "routes" -Destination "backend\routes" -Force -ErrorAction SilentlyContinue
Move-Item -Path "server.js" -Destination "backend\server.js" -Force -ErrorAction SilentlyContinue
Move-Item -Path ".env" -Destination "backend\.env" -Force -ErrorAction SilentlyContinue
Move-Item -Path "package.json" -Destination "backend\package.json" -Force -ErrorAction SilentlyContinue
Move-Item -Path "package-lock.json" -Destination "backend\package-lock.json" -Force -ErrorAction SilentlyContinue

# Move test/util scripts to backend
Get-ChildItem -Filter "*.js" | Where-Object Name -like "*test*" -or Name -like "*check*" -or Name -like "*verify*" -or Name -like "*diagnose*" -or Name -like "*populate*" | Move-Item -Destination "backend\" -Force

# Move render.yaml
Move-Item -Path "render.yaml" -Destination "backend\render.yaml" -Force -ErrorAction SilentlyContinue

# Move client to frontend
Remove-Item -Path "frontend" -Recurse -Force -ErrorAction SilentlyContinue
Move-Item -Path "client" -Destination "frontend" -Force
```

Run from PowerShell (as Administrator):
```powershell
cd C:\Users\admin\Documents\Profiling_System
.\REORGANIZE-PROJECT.ps1
```

---

## After Reorganization

### Update Git Remote (if needed)

If your remote URL changes:
```bash
git remote set-url origin https://github.com/kianbagason/ccsdep_profiling_system.git
git push origin master
```

### Redeploy

**Vercel:**
- Will auto-detect changes
- May need to redeploy manually from dashboard

**Render:**
- Update Root Directory to `backend`
- Redeploy

---

## Benefits of This Structure

✅ Clear separation of concerns  
✅ Independent deployment configurations  
✅ Easier to understand which files belong where  
✅ Standard full-stack project layout  
✅ Better for team collaboration  

---

Need help? Share any errors you encounter during reorganization!
