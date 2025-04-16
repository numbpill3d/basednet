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

// Function to check if git is installed
async function checkGit() {
  try {
    await runCommand('git --version');
    return true;
  } catch (error) {
    return false;
  }
}

// Function to check if the directory is a git repository
async function isGitRepo() {
  try {
    await runCommand('git rev-parse --is-inside-work-tree');
    return true;
  } catch (error) {
    return false;
  }
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

// Function to guide the user through setup
async function setupGitHubDeploy() {
  console.log('🚀 BasedNet GitHub Deployment Setup');
  console.log('==================================');
  console.log('This script will help you set up GitHub Actions for deploying BasedNet to Vercel.');
  console.log();
  
  // Check if git is installed
  console.log('Checking if Git is installed...');
  const gitInstalled = await checkGit();
  if (!gitInstalled) {
    console.error('❌ Git is not installed. Please install Git and try again.');
    console.log('You can download Git from: https://git-scm.com/downloads');
    rl.close();
    return;
  }
  console.log('✅ Git is installed.');
  
  // Check if the directory is a git repository
  console.log('\nChecking if the current directory is a Git repository...');
  const isRepo = await isGitRepo();
  if (!isRepo) {
    console.log('⚠️ The current directory is not a Git repository.');
    rl.question('Do you want to initialize a Git repository? (y/n): ', async (initGit) => {
      if (initGit.toLowerCase() === 'y') {
        try {
          await runCommand('git init');
          console.log('✅ Git repository initialized.');
          continueSetup();
        } catch (error) {
          console.error('❌ Failed to initialize Git repository:', error);
          rl.close();
        }
      } else {
        console.log('Please initialize a Git repository manually and run this script again.');
        rl.close();
      }
    });
  } else {
    console.log('✅ Current directory is a Git repository.');
    continueSetup();
  }
  
  async function continueSetup() {
    console.log('\nChecking for GitHub remote...');
    try {
      const { stdout } = await runCommand('git remote -v');
      const hasGitHubRemote = stdout.includes('github.com');
      
      if (!hasGitHubRemote) {
        console.log('⚠️ No GitHub remote found.');
        rl.question('Do you have a GitHub repository for this project? (y/n): ', (hasRepo) => {
          if (hasRepo.toLowerCase() === 'y') {
            rl.question('Please enter your GitHub repository URL: ', async (repoUrl) => {
              try {
                await runCommand(`git remote add origin ${repoUrl}`);
                console.log('✅ GitHub remote added.');
                checkVercel();
              } catch (error) {
                console.error('❌ Failed to add GitHub remote:', error);
                rl.close();
              }
            });
          } else {
            console.log('\nYou need to create a GitHub repository for this project.');
            console.log('1. Go to https://github.com/new');
            console.log('2. Create a new repository');
            console.log('3. Follow the instructions to push an existing repository from the command line');
            console.log('\nAfter setting up your GitHub repository, run this script again.');
            rl.close();
          }
        });
      } else {
        console.log('✅ GitHub remote found.');
        checkVercel();
      }
    } catch (error) {
      console.error('❌ Failed to check Git remotes:', error);
      rl.close();
    }
  }
  
  async function checkVercel() {
    console.log('\nChecking if Vercel CLI is installed...');
    const vercelCliInstalled = await checkVercelCli();
    
    if (!vercelCliInstalled) {
      console.log('⚠️ Vercel CLI is not installed.');
      rl.question('Do you want to install Vercel CLI globally? (y/n): ', async (installVercel) => {
        if (installVercel.toLowerCase() === 'y') {
          try {
            await runCommand('npm install -g vercel');
            console.log('✅ Vercel CLI installed.');
            checkVercelSetup();
          } catch (error) {
            console.error('❌ Failed to install Vercel CLI:', error);
            rl.close();
          }
        } else {
          console.log('Please install Vercel CLI manually: npm install -g vercel');
          rl.close();
        }
      });
    } else {
      console.log('✅ Vercel CLI is installed.');
      checkVercelSetup();
    }
  }
  
  async function checkVercelSetup() {
    console.log('\nChecking if you are logged in to Vercel...');
    rl.question('Are you logged in to Vercel? (y/n): ', async (loggedIn) => {
      if (loggedIn.toLowerCase() === 'n') {
        console.log('Please log in to Vercel:');
        try {
          await runCommand('vercel login');
          console.log('✅ Logged in to Vercel.');
          setupVercelProject();
        } catch (error) {
          console.error('❌ Failed to log in to Vercel:', error);
          rl.close();
        }
      } else {
        console.log('✅ Already logged in to Vercel.');
        setupVercelProject();
      }
    });
  }
  
  async function setupVercelProject() {
    console.log('\nSetting up Vercel project...');
    rl.question('Do you want to link this directory to a Vercel project? (y/n): ', async (linkProject) => {
      if (linkProject.toLowerCase() === 'y') {
        try {
          await runCommand('vercel link');
          console.log('✅ Project linked to Vercel.');
          generateToken();
        } catch (error) {
          console.error('❌ Failed to link project to Vercel:', error);
          rl.close();
        }
      } else {
        console.log('Skipping Vercel project link. You will need to link your project manually.');
        generateToken();
      }
    });
  }
  
  function generateToken() {
    console.log('\nGenerating Vercel token for GitHub Actions...');
    console.log('Please follow these steps to create a Vercel token:');
    console.log('1. Go to https://vercel.com/account/tokens');
    console.log('2. Click "Create" to create a new token');
    console.log('3. Name it "GitHub Actions" and set the scope to "Full Account"');
    console.log('4. Copy the generated token');
    
    rl.question('Have you created and copied your Vercel token? (y/n): ', (createdToken) => {
      if (createdToken.toLowerCase() === 'y') {
        console.log('\nNow you need to add this token to your GitHub repository secrets:');
        console.log('1. Go to your GitHub repository');
        console.log('2. Navigate to Settings → Secrets and variables → Actions');
        console.log('3. Click "New repository secret"');
        console.log('4. Name: VERCEL_TOKEN');
        console.log('5. Value: Paste your Vercel token');
        console.log('6. Click "Add secret"');
        
        rl.question('Have you added the token to GitHub secrets? (y/n): ', (addedSecret) => {
          if (addedSecret.toLowerCase() === 'y') {
            console.log('✅ Vercel token added to GitHub secrets.');
            commitAndPush();
          } else {
            console.log('Please add the Vercel token to GitHub secrets before deploying.');
            commitAndPush();
          }
        });
      } else {
        console.log('Please create a Vercel token before continuing.');
        rl.close();
      }
    });
  }
  
  function commitAndPush() {
    console.log('\nCommitting and pushing configuration files...');
    rl.question('Do you want to commit and push the GitHub Actions workflow and configuration files? (y/n): ', async (commitFiles) => {
      if (commitFiles.toLowerCase() === 'y') {
        try {
          await runCommand('git add .github/ next.config.js vercel.json GITHUB_DEPLOYMENT.md');
          await runCommand('git commit -m "Add GitHub Actions workflow for Vercel deployment"');
          
          rl.question('Do you want to push the changes to GitHub now? (y/n): ', async (pushChanges) => {
            if (pushChanges.toLowerCase() === 'y') {
              try {
                await runCommand('git push origin main');
                console.log('✅ Changes pushed to GitHub.');
                completed();
              } catch (error) {
                console.error('❌ Failed to push changes to GitHub:', error);
                console.log('You can push the changes manually later with: git push origin main');
                completed();
              }
            } else {
              console.log('You can push the changes manually later with: git push origin main');
              completed();
            }
          });
        } catch (error) {
          console.error('❌ Failed to commit files:', error);
          rl.close();
        }
      } else {
        console.log('Skipping commit and push. You can commit and push the files manually later.');
        completed();
      }
    });
  }
  
  function completed() {
    console.log('\n🎉 GitHub Actions workflow for Vercel deployment is set up!');
    console.log('\nNext steps:');
    console.log('1. If you haven\'t already, push your changes to GitHub: git push origin main');
    console.log('2. Check the Actions tab in your GitHub repository to monitor deployments');
    console.log('3. Set up your custom domain in the Vercel dashboard if needed');
    console.log('\nFor more information, see the GITHUB_DEPLOYMENT.md file.');
    
    rl.close();
  }
}

// Run the setup
setupGitHubDeploy();