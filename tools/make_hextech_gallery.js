const fs = require('fs');

function makeGallery(dir, outPath) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();
  let html = `<!DOCTYPE html><html><head><title>Hextech Frames</title></head><body style="background:#090b10;color:#fff;font-family:sans-serif;padding:20px;">
  <h1 style="color:#00e5ff;">Hextech Anime Frame Selection</h1>
  <div style="display:flex;flex-wrap:wrap;gap:10px;">`;

  files.forEach(f => {
    let sec = 0;
    if (f.startsWith('birth_')) {
      const num = parseInt(f.replace('birth_', '').replace('.jpg', ''), 10);
      sec = (num - 1) * 4;
    } else if (f.startsWith('rune_')) {
      const num = parseInt(f.replace('rune_', '').replace('.jpg', ''), 10);
      sec = (num - 1) * 3;
    }
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    const time = `${m}:${s < 10 ? '0' : ''}${s}`;

    html += `<div style="text-align:center;background:#131824;padding:6px;border-radius:4px;border:1px solid #1e293b;">
      <img src="${f}" style="width:240px;display:block;border-radius:3px;" />
      <div style="margin-top:4px;font-size:12px;color:#38bdf8;">${time} (${f})</div>
    </div>`;
  });

  html += `</div></body></html>`;
  fs.writeFileSync(outPath, html);
  console.log('Hextech gallery written to', outPath);
}

makeGallery('c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/hextech_frames', 'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/hextech_frames/index.html');
