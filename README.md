# BasedNet

BasedNet is a next-generation indie web platform that allows users to create, customize, and host personal websites with P2P hosting, webrings, and AI-powered discovery.

## Deployment Status

This project is deployed on Vercel. Check out the live version at [basednet.vercel.app](https://basednet.vercel.app).

## Features

- **Personal Websites**: Create and customize your own personal website with HTML, CSS, and JavaScript
- **IPFS Integration**: Host your content on the decentralized IPFS network
- **Webrings**: Join and create webrings to connect with like-minded creators
- **Windows 98 Aesthetic**: Enjoy a nostalgic user interface inspired by Windows 98
- **User Profiles**: Customize your profile with bio, avatar, and social links
- **Content Management**: Upload, manage, and pin your IPFS content

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- IPFS node access (via Infura or Pinata)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/basednet.git
   cd basednet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the setup wizard:
   ```bash
   npm run setup
   ```
   
   This will guide you through:
   - Database configuration
   - Authentication setup
   - IPFS integration
   
   You can also run individual setup scripts:
   - `npm run setup:db` - Configure the database
   - `npm run setup:auth` - Set up IndieAuth authentication
   - `npm run setup:ipfs` - Configure IPFS integration

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Project Structure

- `src/app`: Next.js App Router pages and API routes
- `src/components`: React components
- `src/contexts`: React context providers
- `src/db`: Database models and configuration
- `src/lib`: Utility functions and API clients
- `public`: Static assets

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run test`: Run tests
- `npm run db:migrate`: Run database migrations
- `npm run db:seed`: Seed the database with initial data
- `npm run security:audit`: Run security audit

## Authentication

BasedNet uses IndieAuth for authentication, allowing users to sign in with their own domain. To set up authentication:

1. Register an IndieAuth client
2. Add the client ID and secret to your `.env` file
3. Configure the callback URL in your IndieAuth settings

## IPFS Integration

BasedNet uses IPFS for decentralized content storage. To set up IPFS:

1. Create an account on Infura or Pinata
2. Get your IPFS project credentials
3. Add them to your `.env` file

## Deployment

The easiest way to deploy BasedNet is to use our automated setup and deployment scripts:

```bash
# Run the setup wizard with deployment preparation
npm run setup
```

Alternatively, you can follow these steps:

1. Check if your application is ready for deployment:

```bash
npm run check:deployment
```

This comprehensive check will verify:
- All environment variables are properly set
- Database connection is working
- IPFS configuration is valid
- Authentication is configured
- Application builds successfully
- No security vulnerabilities exist
- Vercel CLI is installed

2. Once all checks pass, deploy to Vercel using our deployment script:

```bash
npm run deploy
```

This script will guide you through the process of deploying to Vercel, including setting up environment variables and configuring your project.

3. After deployment, access your application:

```
# Your application will be available at:
- The Vercel URL shown in the deployment output (typically https://your-project-name.vercel.app)
- Your Vercel dashboard: https://vercel.com/dashboard
- Your custom domain (if configured)
```

For detailed deployment instructions, troubleshooting tips, and other deployment options, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Neocities and the indie web movement
- Windows 98 UI inspired by 98.css
