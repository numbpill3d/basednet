const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to update .env file
function updateEnvFile(projectId, projectSecret, gateway, pinataApiKey, pinataSecretKey) {
  const envPath = path.join(__dirname, '../.env');
  
  if (!fs.existsSync(envPath)) {
    console.error('.env file not found. Please create one from .env.example first.');
    process.exit(1);
  }
  
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update IPFS settings
  envContent = envContent.replace(/IPFS_PROJECT_ID=".*"/, `IPFS_PROJECT_ID="${projectId}"`);
  envContent = envContent.replace(/IPFS_PROJECT_SECRET=".*"/, `IPFS_PROJECT_SECRET="${projectSecret}"`);
  envContent = envContent.replace(/IPFS_GATEWAY=".*"/, `IPFS_GATEWAY="${gateway}"`);
  
  // Update Pinata settings
  envContent = envContent.replace(/PINATA_API_KEY=".*"/, `PINATA_API_KEY="${pinataApiKey}"`);
  envContent = envContent.replace(/PINATA_SECRET_KEY=".*"/, `PINATA_SECRET_KEY="${pinataSecretKey}"`);
  
  fs.writeFileSync(envPath, envContent);
  console.log('Updated .env file with IPFS credentials.');
}

// Main function
async function setupIpfs() {
  console.log('BasedNet IPFS Setup');
  console.log('===================');
  console.log('This script will help you set up IPFS integration for BasedNet.');
  console.log('You can use either Infura or Pinata for IPFS services.');
  console.log();
  
  // Ask for IPFS provider
  rl.question('Which IPFS provider are you using? (1 for Infura, 2 for Pinata): ', (provider) => {
    if (provider !== '1' && provider !== '2') {
      console.error('Invalid selection. Please choose 1 for Infura or 2 for Pinata.');
      rl.close();
      return;
    }
    
    const isInfura = provider === '1';
    
    console.log(`Setting up ${isInfura ? 'Infura' : 'Pinata'} IPFS integration...`);
    console.log();
    
    // Ask for project ID
    rl.question(`Enter your ${isInfura ? 'Infura' : 'Pinata'} project ID: `, (projectId) => {
      if (!projectId) {
        console.error('Project ID is required.');
        rl.close();
        return;
      }
      
      // Ask for project secret
      rl.question(`Enter your ${isInfura ? 'Infura' : 'Pinata'} project secret: `, (projectSecret) => {
        if (!projectSecret) {
          console.error('Project secret is required.');
          rl.close();
          return;
        }
        
        // Ask for IPFS gateway
        const defaultGateway = isInfura ? 'https://ipfs.infura.io/ipfs/' : 'https://gateway.pinata.cloud/ipfs/';
        rl.question(`Enter your IPFS gateway URL (default: ${defaultGateway}): `, (gateway) => {
          gateway = gateway || defaultGateway;
          
          let pinataApiKey = '';
          let pinataSecretKey = '';
          
          // If using Pinata, we already have the keys
          if (!isInfura) {
            pinataApiKey = projectId;
            pinataSecretKey = projectSecret;
            
            // Update .env file
            updateEnvFile(projectId, projectSecret, gateway, pinataApiKey, pinataSecretKey);
            
            console.log();
            console.log('IPFS setup complete!');
            console.log();
            console.log('Next steps:');
            console.log('1. Start your application with npm run dev');
            console.log('2. Test IPFS uploads in the dashboard');
            
            rl.close();
          } else {
            // If using Infura, ask for Pinata keys (optional)
            console.log();
            console.log('Optional: Set up Pinata for content pinning');
            rl.question('Do you want to set up Pinata for content pinning? (y/n): ', (setupPinata) => {
              if (setupPinata.toLowerCase() === 'y') {
                rl.question('Enter your Pinata API key: ', (apiKey) => {
                  pinataApiKey = apiKey;
                  
                  rl.question('Enter your Pinata secret key: ', (secretKey) => {
                    pinataSecretKey = secretKey;
                    
                    // Update .env file
                    updateEnvFile(projectId, projectSecret, gateway, pinataApiKey, pinataSecretKey);
                    
                    console.log();
                    console.log('IPFS setup complete!');
                    console.log();
                    console.log('Next steps:');
                    console.log('1. Start your application with npm run dev');
                    console.log('2. Test IPFS uploads in the dashboard');
                    
                    rl.close();
                  });
                });
              } else {
                // Update .env file without Pinata
                updateEnvFile(projectId, projectSecret, gateway, '', '');
                
                console.log();
                console.log('IPFS setup complete!');
                console.log();
                console.log('Next steps:');
                console.log('1. Start your application with npm run dev');
                console.log('2. Test IPFS uploads in the dashboard');
                
                rl.close();
              }
            });
          }
        });
      });
    });
  });
}

// Run the setup
setupIpfs();
