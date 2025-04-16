#!/usr/bin/env node
const { exec } = require('child_process');
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

async function finalizeSetup() {
  console.log('🚀 Finalizing BasedNet GitHub Deployment Setup');
  console.log('============================================');
  
  try {
    // Add all modified files
    console.log('\nStep 1: Adding all deployment-related files to git');
    await runCommand('git add .github/workflows/ next.config.js vercel.json GITHUB_DEPLOYMENT.md package.json scripts/setup-github-deploy-fixed.js');
    console.log('✅ Files added to git');
    
    // Commit changes
    console.log('\nStep 2: Committing changes');
    await runCommand('git commit -m "Setup GitHub Actions workflow for Vercel deployment"');
    console.log('✅ Changes committed');
    
    // Push to GitHub
    console.log('\nStep 3: Pushing changes to GitHub');
    console.log('This will trigger the deployment workflow if you\'ve added the VERCEL_TOKEN secret to your GitHub repository');
    
    rl.question('Push changes to GitHub now? (y/n): ', async (answer) => {
      if (answer.toLowerCase() === 'y') {
        try {
          await runCommand('git push origin main');
          console.log('✅ Changes pushed to GitHub');
          console.log('\n🎉 Deployment setup complete!');
          console.log('\nNext steps:');
          console.log('1. Go to your GitHub repository: https://github.com/numbpill3d/basednet');
          console.log('2. Click on the "Actions" tab to monitor the deployment');
          console.log('3. Once deployment is complete, your site will be available at your Vercel URL');
        } catch (error) {
          console.error('❌ Failed to push changes:', error.message);
          console.log('You can push manually with: git push origin main');
        }
        rl.close();
      } else {
        console.log('You can push the changes later with: git push origin main');
        console.log('\nWhen you\'re ready to deploy, run: npm run deploy:github');
        rl.close();
      }
    });
  } catch (error) {
    console.error('❌ Setup finalization failed:', error.message);
    console.log('You can try the steps manually:');
    console.log('1. git add .github/workflows/ next.config.js vercel.json GITHUB_DEPLOYMENT.md');
    console.log('2. git commit -m "Setup GitHub Actions workflow for Vercel deployment"');
    console.log('3. git push origin main');
    rl.close();
  }
}

finalizeSetup();