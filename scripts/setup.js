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
    let stdout = '';
    let stderr = '';
    
    const childProcess = exec(command);
    
    childProcess.stdout.on('data', (data) => {
      stdout += data;
      process.stdout.write(data);
    });
    
    childProcess.stderr.on('data', (data) => {
      stderr += data;
      process.stderr.write(data);
    });
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

// Function to check if .env file exists
function checkEnvFile() {
  const envPath = path.join(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    const envExamplePath = path.join(__dirname, '../.env.example');
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('Created .env file from .env.example');
    } else {
      console.error('.env.example file not found. Please create a .env file manually.');
      process.exit(1);
    }
  }
}

// Function to run pre-launch checks
async function runPreLaunchChecks() {
  try {
    console.log('Running pre-launch checks...');
    const { stdout, stderr } = await runCommand('npm run check:launch');
    return stdout.includes('All checks passed!') || stdout.includes('All checks passed');
  } catch (error) {
    console.error('Pre-launch checks failed:', error);
    return false;
  }
}

// Main function
async function setup() {
  console.log('BasedNet Setup Wizard');
  console.log('=====================');
  console.log('This wizard will guide you through the setup process for BasedNet.');
  console.log();
  
  // Check if .env file exists
  checkEnvFile();
  
  // Step 1: Database setup
  console.log('Step 1: Database Setup');
  console.log('---------------------');
  rl.question('Do you want to set up the database now? (y/n): ', async (setupDb) => {
    if (setupDb.toLowerCase() === 'y') {
      try {
        await runCommand('npm run setup:db');
      } catch (error) {
        console.error('Error setting up database:', error);
      }
    } else {
      console.log('Skipping database setup. You can run it later with npm run setup:db');
    }
    
    // Step 2: Authentication setup
    console.log();
    console.log('Step 2: Authentication Setup');
    console.log('--------------------------');
    rl.question('Do you want to set up authentication now? (y/n): ', async (setupAuth) => {
      if (setupAuth.toLowerCase() === 'y') {
        try {
          await runCommand('npm run setup:auth');
        } catch (error) {
          console.error('Error setting up authentication:', error);
        }
      } else {
        console.log('Skipping authentication setup. You can run it later with npm run setup:auth');
      }
      
      // Step 3: IPFS setup
      console.log();
      console.log('Step 3: IPFS Setup');
      console.log('----------------');
      rl.question('Do you want to set up IPFS now? (y/n): ', async (setupIpfs) => {
        if (setupIpfs.toLowerCase() === 'y') {
          try {
            await runCommand('npm run setup:ipfs');
          } catch (error) {
            console.error('Error setting up IPFS:', error);
          }
        } else {
          console.log('Skipping IPFS setup. You can run it later with npm run setup:ipfs');
        }
        
        // Step 4: Monitoring setup
        console.log();
        console.log('Step 4: Monitoring Setup');
        console.log('----------------------');
        rl.question('Do you want to set up monitoring now? (y/n): ', async (setupMonitoring) => {
          if (setupMonitoring.toLowerCase() === 'y') {
            try {
              await runCommand('npm run setup:monitoring');
            } catch (error) {
              console.error('Error setting up monitoring:', error);
            }
          } else {
            console.log('Skipping monitoring setup. You can run it later with npm run setup:monitoring');
          }
          
          // Step 5: Deployment preparation
          console.log();
          console.log('Step 5: Deployment Preparation');
          console.log('----------------------------');
          rl.question('Do you want to prepare for deployment now? (y/n): ', async (prepDeploy) => {
            if (prepDeploy.toLowerCase() === 'y') {
              console.log('\nRunning pre-launch checks to ensure deployment readiness...');
              const checksPass = await runPreLaunchChecks();
              
              if (checksPass) {
                console.log('\n✅ All pre-launch checks passed! Your application is ready for deployment.');
                
                rl.question('Do you want to deploy to Vercel now? (y/n): ', async (deployNow) => {
                  if (deployNow.toLowerCase() === 'y') {
                    try {
                      await runCommand('npm run deploy');
                    } catch (error) {
                      console.error('Error deploying to Vercel:', error);
                    }
                  } else {
                    console.log('\nYou can deploy later by running: npm run deploy');
                  }
                  
                  console.log('\nSetup Complete!');
                  console.log('==============');
                  console.log('BasedNet has been configured successfully and is ready for deployment.');
                  console.log();
                  console.log('Next steps:');
                  console.log('1. If you haven\'t deployed yet: npm run deploy');
                  console.log('2. Set up your custom domain in the Vercel dashboard');
                  console.log('3. Verify all services are working correctly');
                  console.log();
                  console.log('After deployment, you can access your application at:');
                  console.log('- The Vercel URL shown in the deployment output');
                  console.log('- Your Vercel dashboard: https://vercel.com/dashboard');
                  console.log('- Your custom domain (if configured)');
                  
                  rl.close();
                });
              } else {
                console.log('\n⚠️ Some pre-launch checks failed. Please address the issues before deploying.');
                console.log('You can run the checks again with: npm run check:launch');
                
                console.log('\nSetup Complete!');
                console.log('==============');
                console.log('BasedNet has been configured but needs some fixes before deployment.');
                console.log();
                console.log('Next steps:');
                console.log('1. Address the issues identified in the pre-launch checks');
                console.log('2. Run pre-launch checks again: npm run check:launch');
                console.log('3. When all checks pass, deploy with: npm run deploy');
                
                rl.close();
              }
            } else {
              console.log('\nSkipping deployment preparation. You can prepare for deployment later with: npm run check:launch');
              
              console.log('\nSetup Complete!');
              console.log('==============');
              console.log('BasedNet has been configured successfully.');
              console.log();
              console.log('Next steps:');
              console.log('1. Start the development server: npm run dev');
              console.log('2. Open http://localhost:3000 in your browser');
              console.log('3. When ready for production, run: npm run check:launch');
              console.log('4. Deploy to Vercel: npm run deploy');
              
              rl.close();
            }
          });
        });
      });
    });
  });
}

// Run the setup
setup();
