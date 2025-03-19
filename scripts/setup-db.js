const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to update .env file
function updateEnvFile(dbUser, dbPassword, dbHost, dbPort, dbName) {
  const envPath = path.join(__dirname, '../.env');
  
  if (!fs.existsSync(envPath)) {
    console.error('.env file not found. Please create one from .env.example first.');
    process.exit(1);
  }
  
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update database settings
  const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
  envContent = envContent.replace(/DATABASE_URL=".*"/, `DATABASE_URL="${connectionString}"`);
  envContent = envContent.replace(/POSTGRES_USER=".*"/, `POSTGRES_USER="${dbUser}"`);
  envContent = envContent.replace(/POSTGRES_PASSWORD=".*"/, `POSTGRES_PASSWORD="${dbPassword}"`);
  envContent = envContent.replace(/POSTGRES_HOST=".*"/, `POSTGRES_HOST="${dbHost}"`);
  envContent = envContent.replace(/POSTGRES_PORT=".*"/, `POSTGRES_PORT="${dbPort}"`);
  envContent = envContent.replace(/POSTGRES_DB=".*"/, `POSTGRES_DB="${dbName}"`);
  
  fs.writeFileSync(envPath, envContent);
  console.log('Updated .env file with database credentials.');
}

// Function to run a command
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Main function
async function setupDatabase() {
  console.log('BasedNet Database Setup');
  console.log('=======================');
  console.log('This script will help you set up the database for BasedNet.');
  console.log();
  
  // Ask for database credentials
  rl.question('Enter PostgreSQL username (default: postgres): ', (dbUser) => {
    dbUser = dbUser || 'postgres';
    
    rl.question('Enter PostgreSQL password: ', (dbPassword) => {
      if (!dbPassword) {
        console.error('Password is required.');
        rl.close();
        return;
      }
      
      rl.question('Enter PostgreSQL host (default: localhost): ', (dbHost) => {
        dbHost = dbHost || 'localhost';
        
        rl.question('Enter PostgreSQL port (default: 5432): ', (dbPort) => {
          dbPort = dbPort || '5432';
          
          rl.question('Enter PostgreSQL database name (default: basednet): ', (dbName) => {
            dbName = dbName || 'basednet';
            
            // Update .env file
            updateEnvFile(dbUser, dbPassword, dbHost, dbPort, dbName);
            
            // Ask if user wants to run migrations
            rl.question('Do you want to run database migrations now? (y/n): ', async (runMigrations) => {
              if (runMigrations.toLowerCase() === 'y') {
                try {
                  console.log('Running database migrations...');
                  await runCommand('npm run db:migrate');
                  
                  // Ask if user wants to seed the database
                  rl.question('Do you want to seed the database with initial data? (y/n): ', async (seedDb) => {
                    if (seedDb.toLowerCase() === 'y') {
                      try {
                        console.log('Seeding database...');
                        await runCommand('npm run db:seed');
                        
                        console.log();
                        console.log('Database setup complete!');
                        console.log();
                        console.log('Next steps:');
                        console.log('1. Set up authentication with npm run setup:auth');
                        console.log('2. Set up IPFS with npm run setup:ipfs');
                        console.log('3. Start your application with npm run dev');
                        
                        rl.close();
                      } catch (error) {
                        console.error('Error seeding database:', error);
                        rl.close();
                      }
                    } else {
                      console.log();
                      console.log('Database setup complete!');
                      console.log();
                      console.log('Next steps:');
                      console.log('1. Set up authentication with npm run setup:auth');
                      console.log('2. Set up IPFS with npm run setup:ipfs');
                      console.log('3. Start your application with npm run dev');
                      
                      rl.close();
                    }
                  });
                } catch (error) {
                  console.error('Error running migrations:', error);
                  rl.close();
                }
              } else {
                console.log();
                console.log('Database configuration complete!');
                console.log();
                console.log('Next steps:');
                console.log('1. Run database migrations with npm run db:migrate');
                console.log('2. Seed the database with npm run db:seed');
                console.log('3. Set up authentication with npm run setup:auth');
                console.log('4. Set up IPFS with npm run setup:ipfs');
                
                rl.close();
              }
            });
          });
        });
      });
    });
  });
}

// Run the setup
setupDatabase();
