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

// Main function to set up GitHub deployment
async function setupGitHubDeploy() {
  console.log('🚀 BasedNet GitHub Deployment Setup (Fixed Version)');
  console.log('==================================================');
  console.log('This script will help you set up GitHub Actions for deploying BasedNet to Vercel.');
  console.log();
  
  try {
    // Step 1: Verify Vercel CLI is installed and you're logged in
    console.log('Step 1: Checking Vercel CLI installation and login status');
    try {
      const { stdout } = await runCommand('vercel whoami');
      console.log(`✅ You are logged in to Vercel as: ${stdout.trim()}`);
    } catch (error) {
      console.log('⚠️ You need to log in to Vercel first.');
      console.log('Running: vercel login');
      await runCommand('vercel login');
    }
    
    // Step 2: Link project to Vercel (with --yes flag to avoid interactive prompts)
    console.log('\nStep 2: Linking project to Vercel');
    try {
      await runCommand('vercel link --yes');
      console.log('✅ Project linked to Vercel successfully.');
    } catch (error) {
      console.error('❌ Failed to link project to Vercel:', error.message);
      console.log('You can try manually with: vercel link --yes');
    }
    
    // Step 3: Generate Vercel token for GitHub Actions
    console.log('\nStep 3: Setting up Vercel token for GitHub Actions');
    console.log('To deploy from GitHub Actions, you need to create a Vercel token:');
    console.log('  1. Go to https://vercel.com/account/tokens');
    console.log('  2. Click "Create" to create a new token');
    console.log('  3. Name it "GitHub Actions" and set the scope to "Full Account"');
    console.log('  4. Copy the generated token');
    
    rl.question('\nDid you create and copy your Vercel token? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        console.log('\nNow add this token to your GitHub repository:');
        console.log('  1. Go to your GitHub repository: https://github.com/numbpill3d/basednet');
        console.log('  2. Navigate to Settings → Secrets and variables → Actions');
        console.log('  3. Click "New repository secret"');
        console.log('  4. Name: VERCEL_TOKEN');
        console.log('  5. Value: Paste your Vercel token');
        console.log('  6. Click "Add secret"');
        
        rl.question('\nDid you add the token to GitHub secrets? (y/n): ', async (addedSecret) => {
          if (addedSecret.toLowerCase() === 'y') {
            console.log('✅ Vercel token added to GitHub secrets.');
            
            // Step 4: Push the workflow file to GitHub
            console.log('\nStep 4: Pushing the GitHub Actions workflow file');
            console.log('The deployment workflow has been created at .github/workflows/vercel-deploy.yml');
            
            rl.question('Do you want to commit and push the workflow file now? (y/n): ', async (pushNow) => {
              if (pushNow.toLowerCase() === 'y') {
                try {
                  await runCommand('git add .github/workflows/vercel-deploy.yml next.config.js vercel.json GITHUB_DEPLOYMENT.md');
                  await runCommand('git commit -m "Add GitHub Actions workflow for Vercel deployment"');
                  await runCommand('git push origin main');
                  console.log('✅ Changes pushed to GitHub successfully.');
                  finishSetup();
                } catch (error) {
                  console.error('❌ Failed to push changes:', error.message);
                  console.log('You can push manually with: git push origin main');
                  finishSetup();
                }
              } else {
                console.log('You can push the changes later with: git add .github/ && git commit -m "Add GitHub Actions workflow" && git push origin main');
                finishSetup();
              }
            });
          } else {
            console.log('Please add the Vercel token to GitHub secrets before proceeding.');
            finishSetup();
          }
        });
      } else {
        console.log('Please create a Vercel token before proceeding with the deployment setup.');
        finishSetup();
      }
    });
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('Please try again or follow the manual instructions in GITHUB_DEPLOYMENT.md');
    rl.close();
  }
  
  function finishSetup() {
    console.log('\n🎉 GitHub Actions workflow for Vercel deployment is set up!');
    console.log('\nNext steps:');
    console.log('1. Ensure you\'ve pushed your workflow file to GitHub');
    console.log('2. Go to the Actions tab in your GitHub repository to monitor deployments');
    console.log('3. Set up your custom domain in the Vercel dashboard if needed');
    console.log('\nFor detailed instructions, see the GITHUB_DEPLOYMENT.md file.');
    rl.close();
  }
}

// Run the setup
setupGitHubDeploy();