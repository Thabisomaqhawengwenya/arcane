const fs = require('fs');
const files = fs.readdirSync('tools/new_frames').filter(f => f.endsWith('.jpg')).sort();
let html = `<!DOCTYPE html><html><body style="background:#090b10;color:#fff;font-family:sans-serif;padding:20px;"><div style="display:flex;flex-wrap:wrap;gap:10px;">`;
files.forEach(f => {
  html += `<div style="text-align:center;background:#1a202c;padding:6px;border-radius:4px;"><img src="${f}" style="width:280px;display:block;" /><div style="font-size:12px;margin-top:4px;color:#38bdf8;">${f}</div></div>`;
});
html += `</div></body></html>`;
fs.writeFileSync('tools/new_frames/index.html', html);
console.log('New gallery created with', files.length, 'frames');
