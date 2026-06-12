const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

try {
  console.log('Step 1/2: Aggregating CSV data...');
  execSync('node scripts/aggregate-csv.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  console.log('Step 2/2: Building standalone bundle...');
  execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  const distPath = path.join(__dirname, '..', 'dist', 'index.html');
  const sizeKB = (fs.statSync(distPath).size / 1024).toFixed(1);

  console.log(`dist/index.html: ${sizeKB} KB`);
  console.log(`Refresh complete at ${new Date().toISOString()}`);
  process.exit(0);
} catch (err) {
  console.error('Refresh failed:', err.message);
  process.exit(1);
}
