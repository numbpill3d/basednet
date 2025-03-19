#!/usr/bin/env node
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

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(path.join(__dirname, '..', filePath));
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

// Function to check if all required environment variables are set
async function checkEnvironmentVariables() {
  console.log('\n📋 Checking environment variables...');
  try {
    const { stdout } = await runCommand('npm run check:env');
    return !stdout.includes('Missing') && !stdout.includes('Empty');
  } catch (error) {
    console.error('Failed to check environment variables.');
    return false;
  }
}

// Function to run pre-launch checks
async function runPreLaunchChecks() {
  console.log('\n📋 Running pre-launch checks...');
  try {
    const { stdout } = await runCommand('npm run check:launch');
    return stdout.includes('All checks passed!') || stdout.includes('All checks passed');
  } catch (error) {
    console.error('Pre-launch checks failed:', error);
    return false;
  }
}

// Function to check if the project is ready for deployment
async function checkDeploymentReadiness() {
  console.log('🚀 BasedNet Deployment Readiness Check');
  console.log('=====================================');
  console.log('This script will check if your BasedNet instance is ready for deployment.');
  console.log();
  
  // Check if .env file exists
  console.log('Checking for .env file...');
  const envExists = fileExists('.env');
  if (!envExists) {
    console.error('❌ .env file not found. Please run npm run setup first.');
    rl.close();
    return;
  }
  console.log('✅ .env file found.');
  
  // Check environment variables
  const envVarsOk = await checkEnvironmentVariables();
  if (!envVarsOk) {
    console.error('❌ Some environment variables are missing or empty.');
    console.log('Please run npm run setup to configure all required environment variables.');
    rl.close();
    return;
  }
  console.log('✅ All environment variables are set.');
  
  // Run pre-launch checks
  console.log('\nRunning comprehensive pre-launch checks...');
  const preLaunchOk = await runPreLaunchChecks();
  if (!preLaunchOk) {
    console.error('❌ Pre-launch checks failed.');
    console.log('Please address the issues before deploying.');
    rl.close();
    return;
  }
  console.log('✅ All pre-launch checks passed.');
  
  // Check if Vercel CLI is installed
  console.log('\nChecking for Vercel CLI...');
  const vercelCliInstalled = await checkVercelCli();
  if (!vercelCliInstalled) {
    console.log('⚠️ Vercel CLI is not installed.');
    console.log('You can install it with: npm install -g vercel');
    console.log('Or our deployment script will install it for you when you run: npm run deploy');
  } else {
    console.log('✅ Vercel CLI is installed.');
  }
  
  // Final readiness check
  console.log('\n🎯 Deployment Readiness Summary');
  console.log('-----------------------------');
  console.log(`Environment Variables: ${envVarsOk ? '✅' : '❌'}`);
  console.log(`Pre-Launch Checks: ${preLaunchOk ? '✅' : '❌'}`);
  console.log(`Vercel CLI: ${vercelCliInstalled ? '✅' : '⚠️'}`);
  
  if (envVarsOk && preLaunchOk) {
    console.log('\n🎉 Your BasedNet instance is READY FOR DEPLOYMENT!');
    console.log('\nNext steps:');
    console.log('1. Deploy to Vercel: npm run deploy');
    console.log('2. Set up your custom domain in the Vercel dashboard');
    console.log('3. Verify all services are working correctly after deployment');
    console.log('\nAfter deployment:');
    console.log('- Your site will be available at the Vercel URL (shown at the end of deployment)');
    console.log('- You can also access it from your Vercel dashboard: https://vercel.com/dashboard');
    console.log('- If you set up a custom domain, your site will be available at that domain');
    console.log('\nFor detailed deployment instructions, see DEPLOYMENT.md');
  } else {
    console.log('\n⚠️ Your BasedNet instance is NOT READY for deployment.');
    console.log('Please address the issues mentioned above before deploying.');
    console.log('\nFor help, see DEPLOYMENT.md or run the setup wizard: npm run setup');
  }
  
  rl.close();
}

// Run the deployment readiness check
checkDeploymentReadiness();
