'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);

    // Report to Sentry in production
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <div className="error-container">
          <div className="error-card">
            <h2>Something went wrong!</h2>
            <p>We've encountered an unexpected error and our team has been notified.</p>
            <div className="error-actions">
              <button onClick={() => reset()} className="retry-button">
                Try again
              </button>
              <a href="/" className="home-button">
                Return to home
              </a>
            </div>
            {process.env.NODE_ENV !== 'production' && (
              <div className="error-details">
                <p>Error details (only visible in development):</p>
                <pre>{error.message}</pre>
                <pre>{error.stack}</pre>
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            padding: 0 20px;
            background-color: #f5f5f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
          .error-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            max-width: 500px;
            width: 100%;
          }
          h2 {
            color: #333;
            margin-top: 0;
          }
          .error-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1.5rem;
          }
          button, a {
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            text-decoration: none;
            transition: background-color 0.2s;
          }
          .retry-button {
            background-color: #0070f3;
            color: white;
            border: none;
          }
          .retry-button:hover {
            background-color: #0051a2;
          }
          .home-button {
            background-color: #f5f5f5;
            color: #333;
            border: 1px solid #ddd;
          }
          .home-button:hover {
            background-color: #e5e5e5;
          }
          .error-details {
            margin-top: 2rem;
            text-align: left;
            padding: 1rem;
            background-color: #f5f5f5;
            border-radius: 4px;
            overflow: auto;
          }
          pre {
            white-space: pre-wrap;
            word-break: break-all;
            font-size: 0.85rem;
            color: #e00;
          }
        `}</style>
      </body>
    </html>
  );
}
