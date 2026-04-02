# Render Environment Variables Configuration

## 🔧 How to Add CLIENT_URL in Render

### **Quick Steps:**

1. Go to https://dashboard.render.com/
2. Select your web service (ccsdep-profiling-system)
3. Click **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add the variable and save
6. Redeploy the service

---

## 📝 Environment Variables to Add

### **Option 1: Single Origin (Simple)**

```
Key:   CLIENT_URLS
Value: https://ccsdep-profiling-system.vercel.app
```

### **Option 2: Multiple Origins (Recommended)**

Separate multiple URLs with commas (no spaces):

```
Key:   CLIENT_URLS
Value: https://ccsdep-profiling-system.vercel.app,http://localhost:3000,https://your-production-url.com
```

**Example with multiple environments:**
```
CLIENT_URLS = https://ccsdep-profiling-system.vercel.app,http://localhost:3000,https://staging.yourapp.com
```

---

## 🎯 Complete Setup Guide

### **Step 1: Deploy Frontend to Vercel First**

1. Push code to GitHub
2. Vercel will auto-deploy
3. Get your Vercel URL from dashboard
   - Example: `https://ccsdep-profiling-system.vercel.app`

### **Step 2: Add Environment Variable to Render**

1. **Login to Render**: https://dashboard.render.com/

2. **Find Your Service**:
   - Click "Web Services"
   - Select "ccsdep-profiling-system"

3. **Navigate to Environment**:
   - Click "Environment" tab at the top

4. **Add New Variable**:
   ```
   Key:   CLIENT_URLS
   Value: https://ccsdep-profiling-system.vercel.app
   ```

5. **Save Changes**:
   - Click "Save Changes" button

6. **Redeploy**:
   - Go to "Manual Deploy" or "Overview" tab
   - Click "Deploy" to restart with new config

---

## ✅ Verification

After adding the environment variable and redeploying:

### **Check Render Logs:**
1. Go to "Logs" tab
2. Look for successful startup message
3. Should see no CORS errors

### **Test from Frontend:**
1. Open your Vercel app URL
2. Try to load data (students, faculty, etc.)
3. Check browser console for CORS errors
4. If working → No CORS errors! ✅

---

## 🔍 Troubleshooting

### **Issue: Still getting CORS errors**

**Solution 1:** Make sure you used the correct Vercel URL
- Check for typos
- Include `https://` prefix
- No trailing slash

**Solution 2:** Wait for Render to finish deploying
- Check logs for "Server running on port 5000"
- Status should be "Live"

**Solution 3:** Clear browser cache
- Press `Ctrl + Shift + Delete`
- Or try incognito mode

### **Issue: Multiple origins not working**

Make sure format is correct:
```
✅ CORRECT:
https://url1.com,https://url2.com,http://localhost:3000

❌ WRONG:
https://url1.com, https://url2.com  (no spaces!)
https://url1.com;https://url2.com  (use commas, not semicolons)
```

---

## 📊 Current Backend CORS Configuration

Your backend (`backend/server.js`) now supports:

```javascript
// Multiple comma-separated origins
const allowedOrigins = process.env.CLIENT_URLS 
  ? process.env.CLIENT_URLS.split(',') 
  : ['http://localhost:3000']; // Default fallback
```

**This means:**
- If `CLIENT_URLS` is set → uses that list
- If not set → defaults to `http://localhost:3000`
- Supports multiple origins (separated by commas)
- Allows requests with no origin (mobile apps, curl, etc.)

---

## 🎉 Success Checklist

- [ ] Frontend deployed to Vercel
- [ ] Got Vercel URL (e.g., `https://ccsdep-profiling-system.vercel.app`)
- [ ] Added `CLIENT_URLS` to Render environment
- [ ] Redeployed backend on Render
- [ ] Tested frontend - can fetch data successfully
- [ ] No CORS errors in browser console

---

## 🔗 Related Files

- **Backend CORS Config**: `backend/server.js` (lines 26-42)
- **Render Dashboard**: https://dashboard.render.com/
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## 💡 Pro Tips

1. **Use separate variables for different environments:**
   ```
   CLIENT_URLS = https://prod.yourapp.com          # Production
   CLIENT_URLS = https://staging.yourapp.com       # Staging
   ```

2. **Test locally before deploying:**
   ```bash
   cd backend
   CLIENT_URLS=http://localhost:3000 node server.js
   ```

3. **Monitor CORS issues in production:**
   - Check Render logs regularly
   - Use browser DevTools Network tab
   - Set up error tracking (Sentry, etc.)

---

## 🆘 Need Help?

If you're still having CORS issues:

1. **Check Render logs** for error messages
2. **Verify the exact URL** in Vercel dashboard
3. **Test API directly** using curl or Postman
4. **Check browser console** for specific CORS error

**Common pattern:**
```
Access to fetch at 'https://api.com/data' from origin 'https://frontend.com' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header...
```

This means the origin (`https://frontend.com`) is not in your `CLIENT_URLS` list!

---

**That's it! Once you add this variable and redeploy, your frontend and backend will communicate perfectly!** 🎊
