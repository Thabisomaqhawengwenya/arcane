const http = require('http');
const fs = require('fs');
const path = require('path');

// Test that hextech.html and its referenced assets all exist locally
const html = fs.readFileSync('hextech.html', 'utf8');

const regex = /(src|href)="([^"]+)"/g;
let match;
const localAssets = [];

while ((match = regex.exec(html)) !== null) {
  const url = match[2];
  if (url.startsWith('/') && !url.startsWith('//')) {
    localAssets.push(url.substring(1));
  }
}

console.log('Found local asset references:', localAssets);

const missing = [];
localAssets.forEach(asset => {
  const full = path.join(__dirname, '..', asset);
  if (!fs.existsSync(full)) {
    missing.push(asset);
  }
});

if (missing.length > 0) {
  console.error('Missing assets:', missing);
  process.exit(1);
} else {
  console.log('ALL', localAssets.length, 'asset references verified to exist on disk!');
}
