#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
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
        reject(new Error(`Command failed with exit code ${code}\nStdout: ${stdout}\nStderr: ${stderr}`));
      }
    });
  });
}

// Function to find all TypeScript/JavaScript files
function findSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findSourceFiles(filePath, fileList);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to extract import statements from a file
function extractImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const imports = [];
  
  // Match both relative imports and alias imports
  const importRegex = /import\s+.*from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Skip node_modules imports and absolute imports
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      continue;
    }
    
    imports.push({
      importPath,
      sourceFile: filePath
    });
  }
  
  return imports;
}

// Function to resolve the real path on disk
function resolveRealPath(importPath, sourceFile) {
  // Handle @/ alias
  if (importPath.startsWith('@/')) {
    return path.join(process.cwd(), 'src', importPath.substring(2));
  }
  
  // Handle relative imports
  const sourceDir = path.dirname(sourceFile);
  return path.join(sourceDir, importPath);
}

// Function to check if a path exists (case-sensitive)
function pathExistsWithCorrectCase(pathToCheck) {
  // Split the path into parts
  const parts = pathToCheck.split(path.sep);
  let currentPath = '';
  
  // Check each part of the path
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    
    // Skip empty parts (e.g., leading or trailing slashes)
    if (!part) continue;
    
    // Add separator if not the first part
    if (currentPath) {
      currentPath = path.join(currentPath, part);
    } else {
      currentPath = part;
    }
    
    // If this part doesn't exist, return false
    if (!fs.existsSync(currentPath)) {
      return { exists: false };
    }
    
    // Check if the case matches
    const dir = path.dirname(currentPath);
    const base = path.basename(currentPath);
    
    // Skip if we're at the root
    if (dir === currentPath) continue;
    
