# Webhaven Deployment Guide

This guide will help you deploy Webhaven to production using Vercel and set up all necessary services.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Supabase, Railway, or self-hosted)
- IPFS node access (via Infura or Pinata)
- Vercel account
- Domain name (optional but recommended)

## Step 1: Database Setup

1. Create a PostgreSQL database
2. Run the schema setup:
   ```bash
   psql -U your_user -d your_database < src/db/schema.sql
   ```

## Step 2: Environment Variables

Create the following environment variables in Vercel:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/webhaven

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-generated-secret
INDIE_AUTH_CLIENT_ID=your-indie-auth-client-id
INDIE_AUTH_CLIENT_SECRET=your-indie-auth-client-secret

# IPFS
IPFS_PROJECT_ID=your-ipfs-project-id
IPFS_PROJECT_SECRET=your-ipfs-project-secret
```

## Step 3: IPFS Setup

1. Create an account on Infura or Pinata
2. Get your IPFS project credentials
3. Add them to your environment variables

## Step 4: Vercel Deployment

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
   vercel
   ```

4. Follow the prompts to:
   - Link to your GitHub repository
   - Configure your project
   - Set up environment variables

## Step 5: Domain Setup

1. Add your domain in Vercel dashboard
2. Configure DNS settings as per Vercel's instructions
3. Wait for SSL certificate provisioning

## Step 6: Post-Deployment

1. Test authentication flow
2. Verify database connections
3. Test IPFS uploads
4. Check webring functionality
5. Verify federation features

## Monitoring & Maintenance

1. Set up monitoring:
   - Add Sentry for error tracking
   - Configure logging
   - Set up uptime monitoring

2. Regular maintenance:
   - Database backups
   - IPFS content pinning
   - Security updates

## Security Considerations

1. Enable rate limiting
2. Set up CORS properly
3. Configure security headers
4. Enable DDoS protection
5. Regular security audits

## Scaling

As your user base grows:

1. Configure database connection pooling
2. Set up caching
3. Use CDN for static assets
4. Configure IPFS gateway caching
5. Set up load balancing if needed

## Troubleshooting

Common issues and solutions:

1. Database connection issues:
   - Check connection string
   - Verify network access
   - Check firewall rules

2. IPFS upload failures:
   - Verify credentials
   - Check file size limits
   - Test gateway access

3. Authentication problems:
   - Verify IndieAuth configuration
   - Check callback URLs
   - Validate session handling

## Support

For issues and support:
- Open an issue on GitHub
- Check documentation
- Join our community channels

Remember to always test in a staging environment before deploying to production.