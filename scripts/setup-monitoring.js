const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

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

// Function to update .env file
function updateEnvFile(sentryDsn) {
  const envPath = path.join(__dirname, '../.env');
  
  if (!fs.existsSync(envPath)) {
    console.error('.env file not found. Please run npm run setup first.');
    process.exit(1);
  }
  
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update Sentry DSN
  envContent = envContent.replace(/SENTRY_DSN=".*"/, `SENTRY_DSN="${sentryDsn}"`);
  
  fs.writeFileSync(envPath, envContent);
  console.log('Updated .env file with Sentry DSN.');
}

// Function to update next.config.js to include Sentry configuration
function updateNextConfig(sentryDsn) {
  const nextConfigPath = path.join(__dirname, '../next.config.js');
  
  // Check if next.config.js exists
  if (!fs.existsSync(nextConfigPath)) {
    // Create a basic next.config.js file
    const nextConfig = `
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const sentryWebpackPluginOptions = {
  // Additional options for Sentry Webpack plugin
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
`;
    
    fs.writeFileSync(nextConfigPath, nextConfig);
    console.log('Created next.config.js with Sentry configuration.');
  } else {
    // Read existing next.config.js
    let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
    
    // Check if Sentry is already configured
    if (!nextConfig.includes('@sentry/nextjs')) {
      // Add Sentry configuration
      nextConfig = `
const { withSentryConfig } = require('@sentry/nextjs');

${nextConfig}

const sentryWebpackPluginOptions = {
  // Additional options for Sentry Webpack plugin
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(module.exports, sentryWebpackPluginOptions);
`;
      
      fs.writeFileSync(nextConfigPath, nextConfig);
      console.log('Updated next.config.js with Sentry configuration.');
    } else {
      console.log('Sentry is already configured in next.config.js.');
    }
  }
}

// Function to create Sentry config files
function createSentryConfigFiles(sentryDsn) {
  // Create sentry.client.config.js
  const sentryClientConfig = `
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: "${sentryDsn}",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // \`release\` value here - use the environment variable \`SENTRY_RELEASE\`, so
  // that it will also get attached to your source maps
});
`;
  
  // Create sentry.server.config.js
  const sentryServerConfig = `
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: "${sentryDsn}",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // \`release\` value here - use the environment variable \`SENTRY_RELEASE\`, so
  // that it will also get attached to your source maps
});
`;
  
  // Write the files
  fs.writeFileSync(path.join(__dirname, '../sentry.client.config.js'), sentryClientConfig);
  fs.writeFileSync(path.join(__dirname, '../sentry.server.config.js'), sentryServerConfig);
  
  console.log('Created Sentry configuration files.');
}

// Main function
async function setupMonitoring() {
  console.log('BasedNet Monitoring Setup');
  console.log('========================');
  console.log('This script will help you set up monitoring for BasedNet.');
  console.log();
  
  // Check if @sentry/nextjs is installed
  console.log('Checking if Sentry is installed...');
  try {
    await runCommand('npm list @sentry/nextjs');
    console.log('Sentry is already installed.');
  } catch (error) {
    console.log('Installing @sentry/nextjs...');
    try {
      await runCommand('npm install --save @sentry/nextjs');
    } catch (error) {
      console.error('Error installing @sentry/nextjs:', error);
      rl.close();
      return;
    }
  }
  
  // Ask for Sentry DSN
  rl.question('Enter your Sentry DSN (leave blank to skip Sentry setup): ', (sentryDsn) => {
    if (sentryDsn) {
      // Update .env file
      updateEnvFile(sentryDsn);
      
      // Update next.config.js
      updateNextConfig(sentryDsn);
      
      // Create Sentry config files
      createSentryConfigFiles(sentryDsn);
      
      console.log('\nSentry monitoring setup complete!');
    } else {
      console.log('Skipping Sentry setup.');
    }
    
    // Ask about uptime monitoring
    console.log('\nUptime Monitoring');
    console.log('----------------');
    console.log('For uptime monitoring, we recommend using one of the following services:');
    console.log('1. UptimeRobot (https://uptimerobot.com) - Free plan available');
    console.log('2. Pingdom (https://pingdom.com) - Paid service with more features');
    console.log('3. StatusCake (https://statuscake.com) - Free and paid plans');
    
    rl.question('Do you want to open one of these services in your browser? (1/2/3/n): ', (uptimeChoice) => {
      let uptimeUrl = '';
      
      switch (uptimeChoice) {
        case '1':
          uptimeUrl = 'https://uptimerobot.com/signUp';
          break;
        case '2':
          uptimeUrl = 'https://www.pingdom.com/sign-up/';
          break;
        case '3':
          uptimeUrl = 'https://www.statuscake.com/sign-up/';
          break;
      }
      
      if (uptimeUrl) {
        console.log(`Opening ${uptimeUrl} in your browser...`);
        const openCommand = process.platform === 'win32' ? 'start' : (process.platform === 'darwin' ? 'open' : 'xdg-open');
        exec(`${openCommand} ${uptimeUrl}`);
      }
      
      // Ask about analytics
      console.log('\nAnalytics');
      console.log('---------');
      console.log('For analytics, we recommend using one of the following services:');
      console.log('1. Plausible (https://plausible.io) - Privacy-focused analytics');
      console.log('2. Google Analytics (https://analytics.google.com) - Comprehensive analytics');
      console.log('3. Fathom (https://usefathom.com) - Simple, privacy-focused analytics');
      
      rl.question('Do you want to open one of these services in your browser? (1/2/3/n): ', (analyticsChoice) => {
        let analyticsUrl = '';
        
        switch (analyticsChoice) {
          case '1':
            analyticsUrl = 'https://plausible.io/register';
            break;
          case '2':
            analyticsUrl = 'https://analytics.google.com/analytics/web/';
            break;
          case '3':
            analyticsUrl = 'https://app.usefathom.com/register';
            break;
        }
        
        if (analyticsUrl) {
          console.log(`Opening ${analyticsUrl} in your browser...`);
          const openCommand = process.platform === 'win32' ? 'start' : (process.platform === 'darwin' ? 'open' : 'xdg-open');
          exec(`${openCommand} ${analyticsUrl}`);
        }
        
        console.log('\nMonitoring setup complete!');
        console.log('\nNext steps:');
        console.log('1. Configure your monitoring services');
        console.log('2. Add your production URL to the monitoring services');
        console.log('3. Set up alerts for downtime and errors');
        
        rl.close();
      });
    });
  });
}

// Run the setup
setupMonitoring();
