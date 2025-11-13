# 🚀 Quick Deploy to Vercel - basednet.lol

## Fastest Way to Get Online (5 minutes)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Merge your changes to main:**
   ```bash
   git checkout main
   git merge claude/codebase-audit-deploy-ready-011CV4TQrtydsb2RNvi6FKjs
   git push origin main
   ```

2. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/new
   - Click "Import Git Repository"
   - Select `numbpill3d/basednet`
   - Click "Import"

3. **Configure (one-time):**
   - Framework: Next.js (auto-detected)
   - Leave all settings as default
   - Click "Deploy"

4. **Add Domain:**
   - After deploy, go to Project Settings → Domains
   - Add: `basednet.lol`
   - Follow DNS instructions shown

### Option 2: Use the Deploy Script

```bash
# Run the deployment script
./deploy.sh
```

The script will:
- Log you in to Vercel
- Merge to main branch
- Deploy to production
- Guide you through setup

### Option 3: Manual CLI Deploy

```bash
# 1. Merge to main
git checkout main
git merge claude/codebase-audit-deploy-ready-011CV4TQrtydsb2RNvi6FKjs
git push origin main

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod
```

---

## Essential Environment Variables

**Set these in Vercel Dashboard → Settings → Environment Variables:**

### Minimum Required (to get site running):

```bash
# Database (use Neon.tech free tier)
DATABASE_URL=postgresql://user:pass@host.neon.tech/basednet?sslmode=require

# Auth (generate random string)
NEXTAUTH_URL=https://basednet.lol
NEXTAUTH_SECRET=your-random-secret-here-min-32-chars

# IndieAuth (or use any OAuth provider)
INDIE_AUTH_CLIENT_ID=your-client-id
INDIE_AUTH_CLIENT_SECRET=your-client-secret
```

### Optional (can add later):

```bash
# Redis for rate limiting
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# IPFS for decentralized storage
IPFS_PROJECT_ID=your-ipfs-project-id
IPFS_PROJECT_SECRET=your-ipfs-secret
IPFS_GATEWAY=https://ipfs.io/ipfs/
```

---

## Quick Services Setup

### 1. Database - Neon (2 minutes)
1. Go to https://neon.tech
2. Sign up (free)
3. Create project
4. Copy connection string → Add as `DATABASE_URL`

### 2. Generate NEXTAUTH_SECRET (30 seconds)
```bash
openssl rand -base64 32
```
Copy output → Add as `NEXTAUTH_SECRET`

### 3. IndieAuth (2 minutes)
1. Go to https://indieauth.com
2. Register app with callback: `https://basednet.lol/api/auth/callback`
3. Copy credentials → Add as env vars

---

## DNS Configuration for basednet.lol

**At your domain registrar (where you bought basednet.lol):**

Add these DNS records:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 300

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300
```

**Wait 5-30 minutes for DNS propagation**

---

## After Deployment

### 1. Run Database Migrations

```bash
# Get your production DB URL from Vercel
export DATABASE_URL="your-production-database-url"

# Run migrations
npm run db:migrate
```

### 2. Test Your Site

Visit https://basednet.lol and check:
- ✅ Site loads
- ✅ Can create account
- ✅ Can edit profile
- ✅ Can browse users
- ✅ Can create webrings

### 3. If Something Breaks

Check Vercel logs:
- Dashboard → Your Project → Deployments → Click latest → "View Logs"

Common issues:
- **500 Error**: Database not connected or migrations not run
- **Auth Error**: Check NEXTAUTH_URL and NEXTAUTH_SECRET
- **Build Error**: Check build logs in Vercel

---

## Status Check

```bash
# Check if site is live
curl -I https://basednet.lol

# Should return: HTTP/2 200
```

---

## Need Help?

1. Check full guide: `DEPLOYMENT_GUIDE.md`
2. Check Vercel logs in dashboard
3. Verify all environment variables are set
4. Ensure database migrations ran successfully

---

## 🎉 That's it!

Your site should be live at **https://basednet.lol** within 5-10 minutes of deployment!
