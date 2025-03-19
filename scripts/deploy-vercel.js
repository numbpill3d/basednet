const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to run a command
function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command}`);
    const childProcess = exec(command);
    
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

// Function to check if Vercel CLI is installed
async function checkVercelCli() {
  try {
    await runCommand('vercel --version');
    return true;
  } catch (error) {
    return false;
  }
}

// Main function
async function deployToVercel() {
  console.log('BasedNet Vercel Deployment');
  console.log('=========================');
  console.log('This script will help you deploy BasedNet to Vercel.');
  console.log();
  
  // Check if Vercel CLI is installed
  const vercelCliInstalled = await checkVercelCli();
  if (!vercelCliInstalled) {
    console.log('Vercel CLI is not installed. Installing...');
    try {
      await runCommand('npm install -g vercel');
    } catch (error) {
      console.error('Error installing Vercel CLI:', error);
      console.log('Please install Vercel CLI manually: npm install -g vercel');
      rl.close();
      return;
    }
  }
  
  // Check if user is logged in to Vercel
  console.log('Checking Vercel login status...');
  rl.question('Do you need to log in to Vercel? (y/n): ', async (needLogin) => {
    if (needLogin.toLowerCase() === 'y') {
      try {
        await runCommand('vercel login');
      } catch (error) {
        console.error('Error logging in to Vercel:', error);
        rl.close();
        return;
      }
    }
    
    // Ask about environment variables
    console.log();
    console.log('Environment Variables');
    console.log('--------------------');
    console.log('BasedNet requires several environment variables to be set in Vercel.');
    console.log('You can set them up now or later in the Vercel dashboard.');
    
    rl.question('Do you want to set up environment variables now? (y/n): ', async (setupEnv) => {
      if (setupEnv.toLowerCase() === 'y') {
        console.log('Please make sure your .env file is properly configured.');
        console.log('The script will read values from your .env file.');
        
        const envPath = path.join(__dirname, '../.env');
        if (!fs.existsSync(envPath)) {
          console.error('.env file not found. Please run npm run setup first.');
          rl.close();
          return;
        }
        
        const envContent = fs.readFileSync(envPath, 'utf8');
        const envLines = envContent.split('\n');
        
        for (const line of envLines) {
          if (line.trim() && !line.startsWith('#')) {
            const [key, value] = line.split('=');
            if (key && value) {
              const trimmedKey = key.trim();
              const trimmedValue = value.trim().replace(/^"(.*)"$/, '$1');
              
              if (trimmedValue) {
                try {
                  await runCommand(`vercel env add ${trimmedKey} production`);
                } catch (error) {
                  console.error(`Error setting environment variable ${trimmedKey}:`, error);
                }
              }
            }
          }
        }
      } else {
        console.log('Skipping environment variables setup. You can set them up later in the Vercel dashboard.');
      }
      
      // Deploy to Vercel
      console.log();
      console.log('Deploying to Vercel');
      console.log('------------------');
      
      rl.question('Do you want to deploy to Vercel now? (y/n): ', async (deploy) => {
        if (deploy.toLowerCase() === 'y') {
          try {
            await runCommand('vercel --prod');
            
            console.log();
            console.log('🎉 Deployment complete!');
            console.log();
            console.log('Your application is now live! You can access it at:');
            console.log('- The Vercel URL shown above in the deployment output');
            console.log('- Your Vercel dashboard: https://vercel.com/dashboard');
            console.log('  (Click on your project, then the "Visit" button)');
            console.log();
            console.log('Next steps:');
            console.log('1. Set up your custom domain in the Vercel dashboard');
            console.log('2. Configure any remaining environment variables');
            console.log('3. Verify all services are working correctly');
            console.log();
            console.log('For more information on accessing and verifying your deployment,');
            console.log('see the "Accessing Your Deployed Application" section in DEPLOYMENT.md');
          } catch (error) {
            console.error('Error deploying to Vercel:', error);
          }
        } else {
          console.log('Skipping deployment. You can deploy later with: vercel --prod');
        }
        
        rl.close();
      });
    });
  });
}

// Run the deployment
deployToVercel();
