const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const sentryWebpackPluginOptions = {
  // Additional options for Sentry Webpack plugin
  silent: true, // Suppresses all logs
};

// Configure Sentry options
const sentryOptions = {
  hideSourceMaps: true, // Hide source maps in production
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions, sentryOptions);
