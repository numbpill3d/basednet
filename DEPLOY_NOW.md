# 🚀 DEPLOY BASEDNET.LOL RIGHT NOW

## The site isn't showing up because it needs to be deployed! Here's how:

### FASTEST METHOD (Recommended) - Vercel Dashboard

**Do this right now:**

1. **Go to Vercel:** https://vercel.com/new

2. **Import Repository:**
   - Click "Import Git Repository"
   - Select `numbpill3d/basednet`
   - **IMPORTANT:** Set branch to `claude/codebase-audit-deploy-ready-011CV4TQrtydsb2RNvi6FKjs`
   - Click "Import"

3. **Configure (Leave defaults):**
   - Framework: Next.js ✅
   - Root Directory: `./` ✅
   - Build Command: `npm run build` ✅
   - Click **"Deploy"**

4. **Add Environment Variables** (Required for site to work):

   After deployment starts, go to Settings → Environment Variables and add:

   **CRITICAL - Add these NOW:**
   ```
   NEXTAUTH_URL=https://basednet.lol
   NEXTAUTH_SECRET=your-secret-here-minimum-32-characters-long
   ```

   **Database (Get from Neon.tech):**
   ```
   DATABASE_URL=postgresql://user:pass@host.neon.tech/basednet?sslmode=require
   ```

   Then click "Redeploy" to apply env vars.

5. **Configure Domain:**
   - Go to Project → Settings → Domains
   - Add `basednet.lol`
   - Vercel will show DNS instructions

6. **Update DNS at your registrar:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## WHY THE SITE ISN'T SHOWING UP

Your code is ready, but:
- ❌ Not deployed to Vercel yet
- ❌ DNS not pointing to Vercel
- ❌ Environment variables not configured

After following steps above:
- ✅ Code will be deployed
- ✅ DNS will point to your deployment
- ✅ Site will be live!

---

## QUICK SERVICES NEEDED

### 1. Get Database (2 minutes)
- Go to https://neon.tech
- Create free account
- Create project
- Copy connection string
- Add as `DATABASE_URL` in Vercel

### 2. Generate Auth Secret (30 seconds)
```bash
openssl rand -base64 32
```
- Copy output
- Add as `NEXTAUTH_SECRET` in Vercel

### 3. Setup IndieAuth (2 minutes) - OPTIONAL FOR NOW
- Can skip for initial deployment
- Add later when you want login to work

---

## AFTER DEPLOYMENT

### Run Database Migrations

```bash
# From your terminal with DATABASE_URL from Vercel
export DATABASE_URL="your-production-db-url"
npm run db:migrate
```

### Test Your Site

Visit https://basednet.lol - should load!

---

## TIMELINE

- **Deploy to Vercel**: 2-5 minutes
- **DNS Propagation**: 5-30 minutes
- **Total**: ~10-35 minutes until live

---

## NEED HELP?

Check the logs in Vercel Dashboard → Deployments → Latest → View Logs

Common issues:
- Build failing? Check environment variables are set
- 500 error? Database not connected or migrations not run
- DNS not resolving? Wait longer or check DNS configuration

---

## 🎯 DO THIS NOW

1. Open https://vercel.com/new
2. Import `numbpill3d/basednet`
3. Deploy from branch: `claude/codebase-audit-deploy-ready-011CV4TQrtydsb2RNvi6FKjs`
4. Add environment variables
5. Configure DNS
6. Wait ~10 minutes

Your site will be LIVE! 🎉
