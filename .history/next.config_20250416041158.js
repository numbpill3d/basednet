/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://basednet.lol',
  },
  
  // Optimize for Vercel deployment
  output: 'standalone', // Creates a standalone build that's optimized for Vercel
  
  experimental: {
    // Enable modern features
    serverComponentsExternalPackages: [], // For better handling of server components
    optimizeCss: true, // For CSS optimization
  },
  
  // Disable unnecessary source maps in production
  productionBrowserSourceMaps: false,
  
  // Improve build performance
  swcMinify: true,
  
  // Disable image optimization if not needed (reduces build time)
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

// Exporting the configuration without Sentry for now
module.exports = nextConfig;
