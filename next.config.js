const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://basednet.lol',
  },
};

// Configure Sentry options
const sentryOptions = {
  hideSourceMaps: true, // Hide source maps in production
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

// Exporting the combined configuration
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions, sentryOptions);
