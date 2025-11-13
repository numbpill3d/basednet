#!/bin/bash

# BasedNet Deployment Script for Vercel
# This script helps deploy BasedNet to Vercel with proper configuration

set -e

echo "🚀 BasedNet Deployment to Vercel"
echo "================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI is not installed${NC}"
    echo "Installing Vercel CLI..."
    npm install -g vercel@latest
fi

# Check if logged in to Vercel
echo "Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel${NC}"
    echo "Please log in to Vercel:"
    vercel login
fi

echo -e "${GREEN}✅ Authenticated with Vercel${NC}"
echo ""

# Merge to main branch first
echo "Preparing deployment..."
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${BLUE}📦 Current branch: $CURRENT_BRANCH${NC}"
    echo "Switching to main branch..."
    git checkout main
    echo "Merging changes..."
    git merge claude/codebase-audit-deploy-ready-011CV4TQrtydsb2RNvi6FKjs
    git push origin main
fi

echo -e "${GREEN}✅ Code ready for deployment${NC}"
echo ""

# Check for existing .vercel directory
if [ ! -d ".vercel" ]; then
    echo -e "${YELLOW}⚠️  No Vercel project link found${NC}"
    echo "This will create a new Vercel project or link to an existing one."
    echo ""
fi

# Deploy to Vercel
echo "Deploying to Vercel production..."
echo ""
echo -e "${BLUE}Note: You'll be prompted to configure the project if this is the first deployment${NC}"
echo ""

vercel --prod

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure your custom domain (basednet.lol) in Vercel dashboard"
echo "2. Set up environment variables (see DEPLOYMENT_GUIDE.md)"
echo "3. Run database migrations"
echo "4. Test your deployment"
echo ""
echo "📚 Read DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo -e "${GREEN}🎉 Your site should be live soon!${NC}"
