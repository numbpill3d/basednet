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

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
