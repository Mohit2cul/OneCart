# OneCart Deployment Guide

## 🚀 Quick Setup Checklist

### ✅ Step 1: Backend Deployment (Render.com)

1. **Go to Render Dashboard** → Your backend service
2. **Navigate to Environment tab**
3. **Add these EXACT environment variables:**

```
NODE_ENV=production
CORS_ORIGINS=https://onecart-frontend.vercel.app,https://onecart-admin-six.vercel.app
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
ADMIN_EMAIL=<your_admin_email>
ADMIN_PASSWORD=<your_admin_password>
CLOUDINARY_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

4. **Click "Save Changes"** (Render will auto-redeploy)
5. **Wait for deployment to complete** (check logs)

---

### ✅ Step 2: Frontend Deployment (Vercel)

**For Main Frontend:**
1. Go to **Vercel Dashboard** → `onecart-frontend` project
2. Navigate to **Settings** → **Environment Variables**
3. Add this variable:
   ```
   VITE_SERVER_URL=https://onecart-hkks.onrender.com
   ```
4. Select all environments: **Production**, **Preview**, **Development**
5. Click **Save**
6. Go to **Deployments** tab → Click "Redeploy" on latest deployment

**For Admin Frontend:**
1. Go to **Vercel Dashboard** → `onecart-admin-six` project
2. Navigate to **Settings** → **Environment Variables**
3. Add this variable:
   ```
   VITE_SERVER_URL=https://onecart-hkks.onrender.com
   ```
4. Select all environments: **Production**, **Preview**, **Development**
5. Click **Save**
6. Go to **Deployments** tab → Click "Redeploy" on latest deployment

---

### ✅ Step 3: Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **authonecart-33b56**
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Add these domains:
   - `onecart-frontend.vercel.app`
   - `onecart-admin-six.vercel.app`
5. Click **Save**

---

### ✅ Step 4: Verification

**Test Backend:**
1. Visit: `https://onecart-hkks.onrender.com/api/health`
2. Should see: `{"status":"healthy",...}`

**Test CORS:**
1. Visit: `https://onecart-hkks.onrender.com/api/test-cors`
2. Should see: `{"message":"✓ CORS is working!",...}`
3. Check `allowedOrigins` includes your Vercel URLs

**Test Frontend:**
1. Visit: `https://onecart-frontend.vercel.app`
2. Open Browser DevTools (F12) → Console
3. Should NOT see any CORS errors
4. Try Google Login → Check console for detailed logs

---

## 🔍 Troubleshooting

### Issue: "Network Error" on Google Login

**Cause:** Backend URL is incorrect or not set  
**Fix:**
1. Check Vercel env vars: `VITE_SERVER_URL` must be `https://onecart-hkks.onrender.com` (no trailing slash)
2. Redeploy Vercel after adding/changing env vars
3. Hard refresh browser (Ctrl+Shift+R)

---

### Issue: "CORS Error"

**Cause:** CORS_ORIGINS not set correctly on backend  
**Fix:**
1. Check Render env vars
2. `CORS_ORIGINS` must be: `https://onecart-frontend.vercel.app,https://onecart-admin-six.vercel.app`
3. NO spaces between URLs, NO trailing slashes
4. Redeploy Render service

---

### Issue: "auth/unauthorized-domain"

**Cause:** Domain not authorized in Firebase  
**Fix:**
1. Go to Firebase Console → Authentication → Settings → Authorized domains
2. Add your Vercel deploy domains
3. Wait 1-2 minutes for changes to propagate

---

### Issue: Cookies not working (login succeeds but immediately logs out)

**Cause:** Cookie settings not correct for production  
**Fix:**
1. Verify `NODE_ENV=production` is set on Render
2. Check browser DevTools → Application → Cookies
3. Cookie should have: `SameSite=None; Secure`
4. If showing `SameSite=Strict`, backend env is not set

---

## 📝 Important Notes

1. **Always redeploy after changing environment variables**
2. **Clear browser cache/cookies if cookies aren't working**
3. **For Google Auth to select account, use incognito or clear Google cookies**
4. **Check Render logs** if backend returns 500 errors
5. **Backend URL should NEVER have trailing slash** in env vars

---

## 🔐 Environment Variables Reference

### Backend (Render)
- `NODE_ENV` → Controls cookie security settings
- `CORS_ORIGINS` → Allows specific frontends to access API
- Other vars → Database, auth, services

### Frontend (Vercel)
- `VITE_SERVER_URL` → Points to your backend API

**Critical:** Vite env vars MUST start with `VITE_` to be exposed to client!

---

## ✨ Success Indicators

✅ Backend health check returns 200  
✅ CORS test shows your domains in allowedOrigins  
✅ Google login prompts for account selection  
✅ Login succeeds and redirects to home  
✅ User data persists after refresh  
✅ Logout works and clears session

---

Need help? Check the browser console and Render logs for detailed error messages.
