# Changelog

All notable changes to BasedNet will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup with Next.js 14.1.0
- React 18.2.0 integration
- TypeScript support
- IPFS HTTP client integration
- NextAuth.js for authentication
- PostgreSQL database integration
- Sentry for error tracking
- Rate limiting functionality
- Security headers with Helmet
- CORS support
- Zod for schema validation
- Testing setup with Jest and React Testing Library
- Code quality tools:
  - ESLint
  - Prettier
  - Husky
  - Lint-staged
- TailwindCSS for styling
- Security audit tooling with Snyk

### Database Implementation

- Created comprehensive SQL schema
- Implemented core data models:
  - User model with full CRUD operations
  - Profile model with theme customization
  - IPFS content tracking model
- Added database connection configuration
- Implemented TypeScript interfaces for all models

### Authentication & Security

- Implemented IndieAuth authentication provider
- Added user session management
- Created authentication utility functions
- Implemented middleware for:
  - Route protection
  - Rate limiting (20 requests/10s)
  - Security headers
  - CSP configuration
- Added Redis-based rate limiting with Upstash

### Development Setup

- Development environment configuration
- Testing environment setup
- Database migration scripts
- Database seeding capability
- Security audit scripts
- Git hooks for code quality

### To Do Before Launch

1. IPFS Integration Testing
2. Frontend UI/UX Implementation
3. Testing Coverage
4. Documentation
5. Deployment Pipeline
