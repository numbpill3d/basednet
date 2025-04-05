const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to run a command
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      resolve({ stdout, stderr });
    });
  });
}

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(path.join(__dirname, '..', filePath));
}

// Function to check environment variables
async function checkEnvironment() {
  console.log('\n📋 Checking environment variables...');
  try {
    const { stdout } = await runCommand('npm run check:env');
    console.log(stdout);
    return !stdout.includes('Missing') && !stdout.includes('Empty');
  } catch (error) {
    console.error('Failed to check environment variables.');
    return false;
  }
}

// Function to check database connection
async function checkDatabase() {
  console.log('\n📋 Checking database connection...');
  
  // Check if .env file exists and has database configuration
  const envPath = path.join(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found. Please run npm run setup first.');
    return false;
  }
  
  try {
    // Create a simple test script to check database connection
    const testScript = `
    const { Pool } = require('pg');
    require('dotenv').config();
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
    
    async function testConnection() {
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        console.log('✅ Database connection successful');
        return true;
      } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
      } finally {
        await pool.end();
      }
    }
    
    testConnection();
    `;
    
    const testScriptPath = 'temp-db-test.js'; // Relative path
    fs.writeFileSync(path.join(__dirname, testScriptPath), testScript); // Write in script directory
    
    try {
      const { stdout } = await runCommand('node ' + testScriptPath); // Execute with relative path
      console.log(stdout);
      const success = stdout.includes('Database connection successful');
      
      // Clean up
      fs.unlinkSync(testScriptPath);
      
      return success;
    } catch (error) {
      // Clean up
      if (fs.existsSync(testScriptPath)) {
        fs.unlinkSync(testScriptPath);
      }
      console.error('❌ Failed to test database connection:', error.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to check database:', error.message);
    return false;
  }
}

// Function to check IPFS configuration
async function checkIpfs() {
  console.log('\n📋 Checking IPFS configuration...');
  
  // Check if .env file exists and has IPFS configuration
  const envPath = path.join(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found. Please run npm run setup first.');
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasIpfsProjectId = envContent.includes('IPFS_PROJECT_ID=') && !envContent.includes('IPFS_PROJECT_ID=""');
  const hasIpfsProjectSecret = envContent.includes('IPFS_PROJECT_SECRET=') && !envContent.includes('IPFS_PROJECT_SECRET=""');
  
  if (hasIpfsProjectId && hasIpfsProjectSecret) {
    console.log('✅ IPFS configuration found');
    return true;
  } else {
    console.error('❌ IPFS configuration incomplete. Please run npm run setup:ipfs');
    return false;
  }
}

// Function to check authentication configuration
async function checkAuth() {
  console.log('\n📋 Checking authentication configuration...');
  
  // Check if .env file exists and has authentication configuration
  const envPath = path.join(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found. Please run npm run setup first.');
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasIndieAuthClientId = envContent.includes('INDIE_AUTH_CLIENT_ID=') && !envContent.includes('INDIE_AUTH_CLIENT_ID=""');
  const hasIndieAuthClientSecret = envContent.includes('INDIE_AUTH_CLIENT_SECRET=') && !envContent.includes('INDIE_AUTH_CLIENT_SECRET=""');
  const hasNextAuthSecret = envContent.includes('NEXTAUTH_SECRET=') && !envContent.includes('NEXTAUTH_SECRET=""');
  
  if (hasIndieAuthClientId && hasIndieAuthClientSecret && hasNextAuthSecret) {
    console.log('✅ Authentication configuration found');
    return true;
  } else {
    console.error('❌ Authentication configuration incomplete. Please run npm run setup:auth');
    return false;
  }
}

// Function to check if the application builds successfully
async function checkBuild() {
  console.log('\n📋 Checking if the application builds successfully...');
  
  try {
    console.log('Building the application (this may take a moment)...');
    await runCommand('npm run build');
    console.log('✅ Application builds successfully');
    return true;
  } catch (error) {
    console.error('❌ Application build failed:', error.message);
    return false;
  }
}

// Function to check security
async function checkSecurity() {
  console.log('\n📋 Checking security...');
  
  try {
    console.log('Running security audit...');
    const { stdout } = await runCommand('npm audit --json');
    
    try {
      const auditResult = JSON.parse(stdout);
      const vulnerabilities = auditResult.vulnerabilities || {};
      const totalVulnerabilities = Object.values(vulnerabilities).reduce((sum, severity) => sum + severity, 0);
      
      if (totalVulnerabilities === 0) {
        console.log('✅ No security vulnerabilities found');
        return true;
      } else {
        console.error(`❌ Found ${totalVulnerabilities} security vulnerabilities. Please run npm audit fix`);
        return false;
      }
    } catch (parseError) {
      console.error('❌ Failed to parse audit results:', parseError.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Security audit failed:', error.message);
    return false;
  }
}

// Main function
async function runPreLaunchCheck() {
  console.log('🚀 BasedNet Pre-Launch Checklist');
  console.log('==============================');
  
  let allChecksPass = true;
  
  // Check environment variables
  const envCheck = await checkEnvironment();
  allChecksPass = allChecksPass && envCheck;
  
  // Check database connection
  const dbCheck = await checkDatabase();
  allChecksPass = allChecksPass && dbCheck;
  
  // Check IPFS configuration
  const ipfsCheck = await checkIpfs();
  allChecksPass = allChecksPass && ipfsCheck;
  
  // Check authentication configuration
  const authCheck = await checkAuth();
  allChecksPass = allChecksPass && authCheck;
  
  // Check if the application builds successfully
  const buildCheck = await checkBuild();
  allChecksPass = allChecksPass && buildCheck;
  
  // Check security
  const securityCheck = await checkSecurity();
  allChecksPass = allChecksPass && securityCheck;
  
  // Summary
  console.log('\n📋 Pre-Launch Checklist Summary');
  console.log('-----------------------------');
  console.log(`Environment Variables: ${envCheck ? '✅' : '❌'}`);
  console.log(`Database Connection: ${dbCheck ? '✅' : '❌'}`);
  console.log(`IPFS Configuration: ${ipfsCheck ? '✅' : '❌'}`);
  console.log(`Authentication Configuration: ${authCheck ? '✅' : '❌'}`);
  console.log(`Application Build: ${buildCheck ? '✅' : '❌'}`);
  console.log(`Security Check: ${securityCheck ? '✅' : '❌'}`);
  
  if (allChecksPass) {
    console.log('\n🎉 All checks passed! BasedNet is ready for launch.');
    console.log('\nNext steps:');
    console.log('1. Deploy to production: npm run deploy');
    console.log('2. Set up your custom domain');
    console.log('3. Configure monitoring and analytics');
  } else {
    console.log('\n⚠️ Some checks failed. Please address the issues before launching.');
  }
  
  rl.close();
}

// Run the pre-launch check
runPreLaunchCheck();
