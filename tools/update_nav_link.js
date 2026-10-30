const fs = require('fs');

const targets = [
  'assets/index-Bw72vWX5.js',
  'zentry-local/assets/index-Bw72vWX5.js'
];

targets.forEach(p => {
  if (fs.existsSync(p)) {
    let s = fs.readFileSync(p, 'utf8');
    const oldCode = 'children:fw.map((f,d)=>C.jsx("a",{href:`#${f.toLowerCase()}`,className:"nav-hover-btn",children:f},d))';
    const newCode = 'children:fw.map((f,d)=>C.jsx("a",{href:f==="Hextech"?"/hextech.html":`#${f.toLowerCase()}`,className:"nav-hover-btn"+(f==="Hextech"?" text-cyan-400 font-bold":""),children:f},d))';
    if (s.includes(oldCode)) {
      s = s.replace(oldCode, newCode);
      fs.writeFileSync(p, s, 'utf8');
      console.log('Successfully updated nav links in', p);
    } else {
      console.log('Pattern not found in', p);
    }
  }
});
