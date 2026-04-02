# Vercel Deployment Troubleshooting

## Current Status
✅ Code committed and pushed to GitHub (master branch)
✅ Build works locally with `NODE_OPTIONS="--max-old-space-size=4096"`
✅ TypeScript errors fixed
✅ tsconfig.json created
✅ Import extensions removed
✅ vercel.json configured with memory limit

## If Vercel Build Still Fails:

### Step 1: Check the Full Error Log

Go to Vercel Dashboard → Your Project → Click on the failed deployment → View Build Logs

Look for these specific errors:

#### Error Type A: "Module not found: Can't resolve '../services/apiService'"
**Cause**: Missing tsconfig.json or wrong module resolution  
**Solution**: Already fixed in latest commit - clear Vercel cache

#### Error Type B: "TS2691: An import path cannot end with a '.tsx' extension"
**Cause**: Import statements with .tsx extensions  
**Solution**: Already fixed in App.tsx and index.tsx - clear Vercel cache

#### Error Type C: "process out of memory"
**Cause**: Not enough memory for build  
**Solution**: Added NODE_OPTIONS in vercel.json - should work now

### Step 2: Clear Vercel Build Cache

**Method A: Via Dashboard (If Available)**
1. Go to Vercel Dashboard
2. Click your project
3. Settings → Builds
4. Look for "Clear Build Cache" button
5. Click it
6. Redeploy

**Method B: Delete and Redeploy Project**
1. Go to https://vercel.com/dashboard
2. Click your project
3. Settings → scroll to bottom → "Delete Project"
4. Confirm deletion
5. Go to https://vercel.com/new
6. Import your repository again
7. Configure:
   - Framework Preset: Create React App
   - Root Directory: (leave empty - we use vercel.json)
8. Deploy

### Step 3: Add Environment Variable

After successful build, IMMEDIATELY add:

1. Settings → Environment Variables
2. Add New:
   ```
   Name: REACT_APP_API_URL
   Value: https://ccsdep-profiling-system.onrender.com
   Environments: Production, Preview, Development (check all)
   ```
3. Save
4. Redeploy to apply

### Step 4: Update Backend CORS

Once frontend is deployed, you'll get a Vercel URL like:
```
https://ccsdep-profiling-system.vercel.app
```

Update your backend server.js CORS configuration:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://ccsdep-profiling-system.vercel.app'  // Replace with your actual URL
  ],
  credentials: true
}));
```

Then commit and push to trigger Render redeployment.

---

## Alternative: Manual Deployment via Vercel CLI

If GitHub auto-deploy keeps failing, try manual deploy:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Navigate to client folder
cd client

# Deploy with production flag
vercel --prod
```

This bypasses GitHub integration and deploys directly from your machine.

---

## Build Commands Reference

### Local Build Test
```bash
cd client
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

Should output:
```
✓ Compiled successfully.
File sizes after gzip:
  70.33 kB  build\static\js\main.caefeeb3.js
  5.03 kB   build\static\css\main.9ad67637.css
The build folder is ready to be deployed.
```

### Vercel Build Command (from vercel.json)
```json
{
  "buildCommand": "cd client && npm run build",
  "installCommand": "cd client && npm install --legacy-peer-deps"
}
```

---

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution**: Clear cache, ensure tsconfig.json exists

### Issue: "Import path cannot end with extension"
**Solution**: Remove .tsx/.ts from all imports (already fixed)

### Issue: "Out of memory"
**Solution**: NODE_OPTIONS set in vercel.json (already done)

### Issue: "CORS error after deployment"
**Solution**: Update backend CORS to include Vercel domain

### Issue: "API calls fail but build succeeds"
**Solution**: Add REACT_APP_API_URL environment variable

---

## Success Checklist

- [ ] Build completes without errors
- [ ] No TypeScript errors in logs
- [ ] No memory allocation errors
- [ ] Environment variable REACT_APP_API_URL added
- [ ] Backend CORS updated with Vercel URL
- [ ] Frontend loads without console errors
- [ ] API calls successfully fetch data from Render backend
- [ ] All CRUD operations work (Create, Read, Update, Delete)

---

## Next Steps After Successful Deployment

1. Test all pages:
   - Dashboard (/)
   - Students (/students)
   - Faculty (/faculty)
   - Events (/events)
   - Schedules (/schedule)
   - Instructions (/instruction)
   - Query System (/query)

2. Verify MongoDB Atlas connection:
   - Check backend logs on Render
   - Confirm data is being saved

3. Monitor performance:
   - Check Vercel Analytics
   - Monitor Render backend response times

---

## Contact Points

If still stuck after trying everything:
- Vercel Support: https://vercel.com/support
- Check Vercel community Discord
- Review Vercel documentation: https://vercel.com/docs
