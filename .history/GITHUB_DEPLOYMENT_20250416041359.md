# Deploying BasedNet using GitHub Actions and Vercel

## Overview

This document outlines an improved approach to deploying BasedNet to Vercel using GitHub Actions. This approach offers several advantages over direct deployment from a local machine:

1. **Consistent Environment**: Builds happen in a clean Ubuntu environment, avoiding Windows-specific path issues
2. **Automated Workflow**: Deployments are triggered automatically when you push to the main branch
3. **Reproducible Builds**: Every build uses the same setup, reducing "works on my machine" problems
4. **Version Control**: Deployment configuration is tracked in version control

## Prerequisites

Before using this deployment method, you'll need:

1. A GitHub account with your BasedNet code pushed to a repository
2. A Vercel account linked to your GitHub account
3. A Vercel project created for BasedNet

## Setup Instructions

### 1. Generate a Vercel API Token

1. Log in to your [Vercel dashboard](https://vercel.com/dashboard)
2. Go to Settings → Tokens
3. Create a new token with "Full Account" scope
4. Copy the token value (you won't be able to see it again)

### 2. Add the Vercel Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `VERCEL_TOKEN`
5. Value: Paste your Vercel API token
6. Click "Add secret"

### 3. Initial Setup on Vercel

1. From the Vercel dashboard, click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure your project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
4. Add all required environment variables from your `.env` file
5. Deploy once manually through the Vercel interface to set up the project

### 4. Use GitHub Actions for Future Deployments

After the initial setup, all future deployments will happen automatically through GitHub Actions when you push to the main branch.

## How It Works

The workflow file `.github/workflows/vercel-deploy.yml` defines the deployment process:

1. Checkout the code from GitHub
2. Set up Node.js
3. Install dependencies
4. Install Vercel CLI
5. Pull environment variables from Vercel
6. Build the project
7. Deploy to Vercel

## Troubleshooting

If you encounter deployment issues:

1. Check the GitHub Actions logs for detailed build information
2. Verify all required environment variables are set in Vercel
3. Ensure your Vercel token has the correct permissions
4. Check that the Node.js version in the workflow matches your project requirements

## Manual Deployment

You can also trigger a deployment manually:

1. Go to your GitHub repository
2. Navigate to Actions → "Deploy to Vercel" workflow
3. Click "Run workflow"
4. Select the branch you want to deploy
5. Click "Run workflow"

This will start the deployment process without requiring a code push.

## Security Considerations

The GitHub Actions workflow is configured to deploy only on pushes to the main branch and manual triggers. This prevents unauthorized deployments from feature branches.

The Vercel token is stored securely in GitHub Secrets and is never exposed in logs or outputs.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)