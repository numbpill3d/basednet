const fs = require('fs');
const path = require('path');

// Define required environment variables
const requiredVars = [
  // Database
  'DATABASE_URL',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_DB',
  
  // IPFS
  'IPFS_PROJECT_ID',
  'IPFS_PROJECT_SECRET',
  'IPFS_GATEWAY',
  
  // Authentication
  'INDIE_AUTH_CLIENT_ID',
  'INDIE_AUTH_CLIENT_SECRET',
  'INDIE_AUTH_REDIRECT_URI',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  
  // Rate Limiting
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
];

// Function to check if environment variables are set
function checkEnvVars() {
  console.log('Checking environment variables...');
  
  const envPath = path.join(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env file not found. Please run npm run setup first.');
    process.exit(1);
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  const envVars = {};
  
  // Parse .env file
  for (const line of envLines) {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key) {
        const value = valueParts.join('=').trim().replace(/^"(.*)"$/, '$1');
        envVars[key.trim()] = value;
      }
    }
  }
  
  // Check required variables
  const missingVars = [];
  const emptyVars = [];
  
  for (const varName of requiredVars) {
    if (!(varName in envVars)) {
      missingVars.push(varName);
    } else if (!envVars[varName]) {
      emptyVars.push(varName);
    }
  }
  
  // Report results
  if (missingVars.length === 0 && emptyVars.length === 0) {
    console.log('✅ All required environment variables are set.');
    return true;
  }
  
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:');
    for (const varName of missingVars) {
      console.error(`   - ${varName}`);
    }
  }
  
  if (emptyVars.length > 0) {
    console.error('⚠️ Empty environment variables:');
    for (const varName of emptyVars) {
      console.error(`   - ${varName}`);
    }
  }
  
  console.log('\nPlease run the appropriate setup scripts to configure these variables:');
  console.log('- npm run setup:db     (for database variables)');
  console.log('- npm run setup:auth   (for authentication variables)');
  console.log('- npm run setup:ipfs   (for IPFS variables)');
  console.log('- npm run setup        (for all variables)');
  
  return false;
}

// Run the check
checkEnvVars();
