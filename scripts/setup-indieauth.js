const readline = require('readline');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to generate a secure random string
function generateSecureString(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Function to update .env file
function updateEnvFile(clientId, clientSecret, redirectUri) {
  const envPath = path.join(__dirname, '../.env');
  
  if (!fs.existsSync(envPath)) {
    console.error('.env file not found. Please create one from .env.example first.');
    process.exit(1);
  }
  
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update IndieAuth settings
  envContent = envContent.replace(/INDIE_AUTH_CLIENT_ID=".*"/, `INDIE_AUTH_CLIENT_ID="${clientId}"`);
  envContent = envContent.replace(/INDIE_AUTH_CLIENT_SECRET=".*"/, `INDIE_AUTH_CLIENT_SECRET="${clientSecret}"`);
  envContent = envContent.replace(/INDIE_AUTH_REDIRECT_URI=".*"/, `INDIE_AUTH_REDIRECT_URI="${redirectUri}"`);
  
  // Generate NextAuth secret if empty
  if (envContent.includes('NEXTAUTH_SECRET=""')) {
    const secret = generateSecureString();
    envContent = envContent.replace(/NEXTAUTH_SECRET=".*"/, `NEXTAUTH_SECRET="${secret}"`);
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log('Updated .env file with IndieAuth credentials.');
}

// Main function
async function setupIndieAuth() {
  console.log('BasedNet IndieAuth Setup');
  console.log('========================');
  console.log('This script will help you set up IndieAuth for BasedNet.');
  console.log('You\'ll need to register an application at https://indieauth.com/');
  console.log();
  
  // Ask for client ID
  rl.question('Enter your IndieAuth client ID (e.g., https://yourdomain.com): ', (clientId) => {
    if (!clientId) {
      console.error('Client ID is required.');
      rl.close();
      return;
    }
    
    // Ask for client secret or generate one
    rl.question('Enter your IndieAuth client secret (leave blank to generate one): ', (clientSecret) => {
      if (!clientSecret) {
        clientSecret = generateSecureString();
        console.log(`Generated client secret: ${clientSecret}`);
      }
      
      // Ask for redirect URI
      rl.question('Enter your redirect URI (default: http://localhost:3000/api/auth/callback): ', (redirectUri) => {
        redirectUri = redirectUri || 'http://localhost:3000/api/auth/callback';
        
        // Update .env file
        updateEnvFile(clientId, clientSecret, redirectUri);
        
        console.log();
        console.log('IndieAuth setup complete!');
        console.log();
        console.log('Next steps:');
        console.log('1. Register your application at https://indieauth.com/');
        console.log(`2. Use ${redirectUri} as your redirect URI`);
        console.log('3. Start your application with npm run dev');
        
        rl.close();
      });
    });
  });
}

// Run the setup
setupIndieAuth();
