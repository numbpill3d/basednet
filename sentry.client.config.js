
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: "https://e8030cc6502f8f8391a6eefb8350b1f0@o4509050597605376.ingest.us.sentry.io/4509050617856000",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
