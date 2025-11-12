# BasedNet - Vercel Deployment Guide for basednet.lol

## 🚀 Quick Deployment Steps

### Step 1: Merge Your Changes
First, merge the deployment-ready branch to main:

```bash
# Switch to main branch
git checkout main

# Merge the deployment-ready branch
git merge claude/codebase-audit-deploy-ready-011CV4TQrtydsb2RNvi6FKjs

# Push to main
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project**: Click "Add New..." → "Project"
3. **Import Git Repository**:
   - Connect your GitHub account if not already connected
   - Select the `numbpill3d/basednet` repository
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

5. **Environment Variables** - Add these in the Vercel dashboard:

   **Required Variables:**
   ```
   DATABASE_URL=postgresql://[user]:[password]@[host]:5432/basednet
   NEXTAUTH_URL=https://basednet.lol
   NEXTAUTH_SECRET=[generate-random-string]
   ```

   **Authentication (IndieAuth):**
   ```
   INDIE_AUTH_CLIENT_ID=[your-indieauth-client-id]
   INDIE_AUTH_CLIENT_SECRET=[your-indieauth-client-secret]
   ```

   **IPFS (Choose Infura OR Pinata):**
   ```
   IPFS_PROJECT_ID=[your-ipfs-project-id]
   IPFS_PROJECT_SECRET=[your-ipfs-project-secret]
   IPFS_GATEWAY=https://ipfs.io/ipfs/
   ```

   **Rate Limiting (Upstash Redis):**
   ```
   UPSTASH_REDIS_REST_URL=[your-upstash-redis-url]
   UPSTASH_REDIS_REST_TOKEN=[your-upstash-redis-token]
   ```

   **Optional:**
   ```
   NODE_ENV=production
   SENTRY_DSN=[your-sentry-dsn]
   ```

6. **Click "Deploy"**

#### Option B: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy: Y
# - Link to existing project? [if you have one]: Y/N
# - Project name: basednet
# - Directory: ./
```

### Step 3: Configure Custom Domain (basednet.lol)

1. **In Vercel Dashboard**:
   - Go to your project → "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `basednet.lol`
   - Click "Add"

2. **DNS Configuration** (at your domain registrar):

   Vercel will show you the required DNS records. You'll need to add:

   **For apex domain (basednet.lol):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

   **Alternative (if A record doesn't work):**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS Propagation** (5-30 minutes)

4. **SSL Certificate**: Vercel will automatically provision an SSL certificate once DNS is configured

### Step 4: Update Environment Variables

After deployment, update these in Vercel dashboard:

1. Go to Project → "Settings" → "Environment Variables"
2. Update `NEXTAUTH_URL` if not already set to: `https://basednet.lol`
3. Redeploy to apply changes

---

## 🔧 Required Services Setup

### Database (PostgreSQL)

**Option 1: Neon (Recommended)**
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Add to Vercel as `DATABASE_URL`

**Option 2: Supabase**
1. Go to https://supabase.com
2. Create a new project
3. Get connection string from Settings → Database
4. Add to Vercel as `DATABASE_URL`

### Upstash Redis (Rate Limiting)

1. Go to https://upstash.com
2. Create a new Redis database
3. Select "Global" for best performance
4. Copy the REST URL and REST Token
5. Add to Vercel:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### IPFS Provider

**Option 1: Infura**
1. Go to https://infura.io
2. Create account and new project
3. Enable IPFS API
4. Copy Project ID and Secret
5. Add to Vercel as `IPFS_PROJECT_ID` and `IPFS_PROJECT_SECRET`

**Option 2: Pinata**
1. Go to https://pinata.cloud
2. Create account
3. Get API key from dashboard
4. Add to Vercel as `PINATA_API_KEY` and `PINATA_SECRET_KEY`

### IndieAuth (Authentication)

1. Go to https://indieauth.com
2. Register your domain/application
3. Get client ID and secret
4. Add to Vercel:
   - `INDIE_AUTH_CLIENT_ID`
   - `INDIE_AUTH_CLIENT_SECRET`

---

## 🗃️ Database Setup

After deployment, you need to initialize the database:

### Option 1: Run Migration Locally

```bash
# Set your production DATABASE_URL
export DATABASE_URL="postgresql://[your-production-db-url]"

# Run migrations
npm run db:migrate
```

### Option 2: Via Vercel CLI

```bash
# Connect to production environment
vercel env pull .env.production

# Load the environment
source .env.production

# Run migration
npm run db:migrate
```

### Database Schema

The migration will create these tables:
- `users` - User accounts
- `profiles` - User profiles and customization
- `webrings` - Webring communities
- `webring_members` - Webring membership
- `ipfs_content` - IPFS content tracking
- `activities` - ActivityPub activities (future)

---

## ✅ Post-Deployment Checklist

- [ ] Site loads at https://basednet.lol
- [ ] SSL certificate is active (🔒 in browser)
- [ ] Database connection works
- [ ] Can create an account (IndieAuth working)
- [ ] Can edit profile
- [ ] Can view dashboard
- [ ] Can browse users
- [ ] Can create/join webrings
- [ ] Help page displays correctly
- [ ] All API endpoints respond (check Network tab)
- [ ] Rate limiting works (test with multiple requests)

---

## 🐛 Troubleshooting

### "Internal Server Error" on pages

**Cause**: Database not connected or migrations not run

**Fix**:
1. Check `DATABASE_URL` is set correctly in Vercel
2. Run database migrations
3. Verify database is accessible from Vercel's IP

### "Authentication Failed"

**Cause**: IndieAuth credentials incorrect or callback URL wrong

**Fix**:
1. Verify `INDIE_AUTH_CLIENT_ID` and `INDIE_AUTH_CLIENT_SECRET`
2. Check callback URL in IndieAuth settings matches: `https://basednet.lol/api/auth/callback`
3. Verify `NEXTAUTH_URL=https://basednet.lol`
4. Regenerate `NEXTAUTH_SECRET` if needed

### Domain not resolving

**Cause**: DNS not configured or not propagated

**Fix**:
1. Check DNS records at your registrar
2. Use `dig basednet.lol` to verify DNS propagation
3. Wait up to 24 hours for full propagation
4. Try clearing your DNS cache: `sudo dscacheutil -flushcache` (Mac)

### Build fails on Vercel

**Cause**: Missing dependencies or environment variables at build time

**Fix**:
1. Check Vercel build logs
2. Ensure all environment variables are set
3. Try rebuilding: `vercel --prod --force`

### Rate limiting not working

**Cause**: Redis not connected

**Fix**:
1. Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
2. Check Upstash dashboard that database is active
3. Test connection manually

---

## 📊 Monitoring

### Vercel Analytics
- Automatically enabled in Vercel dashboard
- View under "Analytics" tab

### Sentry (Optional)
1. Create account at https://sentry.io
2. Create new Next.js project
3. Copy DSN
4. Add as `SENTRY_DSN` in Vercel
5. Redeploy

---

## 🔄 Continuous Deployment

Once set up, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for PRs
- Run builds and tests
- Update production site

To manually redeploy:
```bash
vercel --prod
```

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Project Issues: https://github.com/numbpill3d/basednet/issues

---

## 🎉 You're Done!

Your BasedNet site should now be live at **https://basednet.lol**!

Share it with the world and start building your indie web community! 🌐✨
