import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring
  
  // Environment-specific configuration
  environment: process.env.NODE_ENV,
  
  // Error filtering
  beforeSend(event) {
    // Don't send errors in development
    if (process.env.NODE_ENV === 'development') {
      return null
    }
    
    // Filter out specific errors
    if (event.exception) {
      const exceptionValue = event.exception.values?.[0]?.value
      if (exceptionValue?.includes('ResizeObserver loop')) {
        return null
      }
    }
    
    return event
  },

  // Additional configuration
  debug: process.env.NODE_ENV === 'development',
  maxBreadcrumbs: 50,
  attachStacktrace: true,
})
