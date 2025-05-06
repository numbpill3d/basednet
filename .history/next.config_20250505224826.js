/** @type {import('next').NextConfig} */
import path from 'path';

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

  // Force alias resolution for Vercel build
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

// Exporting the configuration without Sentry for now
module.exports = nextConfig;
