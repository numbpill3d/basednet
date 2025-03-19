# BasedNet Deployment Guide

This guide will help you deploy BasedNet to production using Vercel and set up all necessary services. We've created automated scripts to make the deployment process as smooth as possible.

## Automated Deployment Process

The easiest way to deploy BasedNet is to use our automated setup and deployment scripts:

```bash
# Run the setup wizard
npm run setup
```

The setup wizard will guide you through:
1. Database configuration
2. Authentication setup
3. IPFS integration
4. Monitoring configuration
5. Deployment preparation and pre-launch checks
6. Vercel deployment

If you prefer to handle the deployment process step by step, follow the manual instructions below.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Supabase, Railway, or self-hosted)
- IPFS node access (via Infura or Pinata)
- Vercel account
- Domain name (optional but recommended)

## Step 1: Database Setup

1. Create a PostgreSQL database
2. Run our database setup script:
   ```bash
   npm run setup:db
   ```
   
   Or manually run the schema setup:
   ```bash
   psql -U your_user -d your_database < src/db/schema.sql
   ```

## Step 2: Environment Variables

All required environment variables are listed in `.env.example`. You can set them up by:

1. Running our setup scripts:
   ```bash
   npm run setup:db     # For database variables
   npm run setup:auth   # For authentication variables
   npm run setup:ipfs   # For IPFS variables
   ```

2. Or manually creating a `.env` file with the following variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/basednet
POSTGRES_USER=your-postgres-user
POSTGRES_PASSWORD=your-postgres-password
POSTGRES_HOST=your-postgres-host
POSTGRES_PORT=5432
POSTGRES_DB=basednet

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-generated-secret
INDIE_AUTH_CLIENT_ID=your-indie-auth-client-id
INDIE_AUTH_CLIENT_SECRET=your-indie-auth-client-secret
INDIE_AUTH_REDIRECT_URI=https://your-domain.com/api/auth/callback

# Rate Limiting
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

# Feature Flags
ENABLE_WEBRING=true
ENABLE_AI_DISCOVERY=true
ENABLE_FEDERATION=true
ENABLE_CHAT=true

# IPFS
IPFS_PROJECT_ID=your-ipfs-project-id
IPFS_PROJECT_SECRET=your-ipfs-project-secret
IPFS_GATEWAY=https://ipfs.io/ipfs/

# Pinata IPFS Service (if using Pinata)
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET_KEY=your-pinata-secret-key

# Analytics & Monitoring
SENTRY_DSN=your-sentry-dsn
```

## Step 3: Deployment Readiness Check

Before deploying, run our comprehensive deployment readiness check to ensure everything is configured correctly:

```bash
npm run check:deployment
```

This will:
1. Verify all environment variables are properly set
2. Check database connection is working
3. Validate IPFS configuration
4. Ensure authentication is properly configured
5. Verify the application builds successfully
6. Check for security vulnerabilities
7. Confirm Vercel CLI is installed

The script will provide a detailed report of your deployment readiness status and clear next steps.

If any checks fail, the script will provide specific instructions to fix the issues before proceeding with deployment. You can also run individual checks:

```bash
npm run check:env      # Check environment variables only
npm run check:launch   # Run pre-launch checks without Vercel CLI check
```

## Step 4: Vercel Deployment

Once all pre-launch checks pass, you can deploy to Vercel using our deployment script:

```bash
npm run deploy
```

This script will:
1. Check if Vercel CLI is installed and install it if needed
2. Help you log in to Vercel if necessary
3. Set up environment variables from your `.env` file
4. Deploy your application to Vercel

Alternatively, you can deploy manually:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

4. Follow the prompts to:
   - Link to your GitHub repository
   - Configure your project
   - Set up environment variables

## Step 5: Domain Setup

1. Add your domain in Vercel dashboard
2. Configure DNS settings as per Vercel's instructions
3. Wait for SSL certificate provisioning
4. Update your `NEXTAUTH_URL` and `INDIE_AUTH_REDIRECT_URI` environment variables to use your custom domain

## Step 6: Post-Deployment Verification

After deployment, verify that everything is working correctly:

1. Test authentication flow
   - Try logging in with IndieAuth
   - Verify that sessions persist correctly

2. Verify database connections
   - Create a test profile
   - Check that data is being stored correctly

3. Test IPFS uploads
   - Upload a test file
   - Verify it's accessible via the IPFS gateway

4. Check webring functionality
   - Create or join a test webring
   - Verify navigation between webring sites

5. Verify federation features (if enabled)
   - Test ActivityPub integration
   - Check for proper federation with other instances

## Monitoring & Maintenance

You can use our monitoring setup script to configure monitoring services:

```bash
npm run setup:monitoring
```

This script will help you:
1. Set up Sentry for error tracking and performance monitoring
2. Guide you through uptime monitoring options (UptimeRobot, Pingdom, StatusCake)
3. Help you set up analytics (Plausible, Google Analytics, Fathom)

For a comprehensive monitoring solution, we recommend:
1. Sentry for error tracking and performance monitoring
2. UptimeRobot for basic uptime monitoring (free tier available)
3. Plausible for privacy-focused analytics

Regular maintenance tasks:
- Database backups (set up automated backups with your database provider)
- IPFS content pinning (ensure your content remains available)
- Security updates (regularly update dependencies with `npm audit fix`)
- Performance monitoring (use Sentry performance monitoring)

## Security Considerations

1. Enable rate limiting
   - BasedNet includes Upstash Redis rate limiting
   - Ensure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set

2. Set up CORS properly
   - Review and update CORS settings in `next.config.js` if needed

3. Configure security headers
   - BasedNet includes Helmet for security headers
   - Review and update security headers in `middleware.ts` if needed

4. Enable DDoS protection
   - Vercel provides basic DDoS protection
   - Consider additional protection for high-traffic sites

5. Regular security audits
   - Run `npm run security:audit` regularly
   - Address any vulnerabilities promptly

## Scaling

As your user base grows:

1. Configure database connection pooling
   - Update the database configuration in `src/lib/db.ts`
   - Adjust pool size based on traffic

2. Set up caching
   - Implement Redis caching for frequently accessed data
   - Use Next.js ISR for static content

3. Use CDN for static assets
   - Vercel provides CDN by default
   - Configure cache headers for optimal performance

4. Configure IPFS gateway caching
   - Use a dedicated IPFS gateway with caching
   - Consider running your own IPFS gateway for high-traffic sites

5. Set up load balancing if needed
   - Vercel handles this automatically
   - For custom deployments, consider using a load balancer

## Troubleshooting

Common issues and solutions:

1. Database connection issues:
   - Check connection string format
   - Verify network access and firewall rules
   - Ensure database user has proper permissions
   - Check SSL requirements

2. IPFS upload failures:
   - Verify credentials are correct
   - Check file size limits (default is 50MB)
   - Test gateway access with a simple CID
   - Verify IPFS service is operational

3. Authentication problems:
   - Verify IndieAuth configuration is correct
   - Check callback URLs match exactly
   - Ensure NEXTAUTH_SECRET is set
   - Check for HTTPS requirements

4. Build failures:
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check for environment variable issues
   - Review build logs for specific errors

5. Performance issues:
   - Enable monitoring to identify bottlenecks
   - Check database query performance
   - Optimize image and asset loading
   - Implement caching where appropriate

## Support

For issues and support:
- Open an issue on GitHub
- Check documentation
- Join our community channels

Remember to always test in a staging environment before deploying to production.
