const { execSync } = require('child_process');
const fs = require('fs');

const ffmpeg = '"C:\\Users\\Maqhawe T Ngwenya\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe"';

const cuts = [
  {
    name: 'hextech-card-1.mp4',
    source: 'tools/raw_hexgate.mp4',
    start: '00:00:46.000',
    duration: '00:00:14.000',
    desc: 'Hexgate airship launch into hyperspace portal'
  },
  {
    name: 'hextech-card-2.mp4',
    source: 'tools/raw_gauntlet.mp4',
    start: '00:00:13.000',
    duration: '00:00:12.000',
    desc: 'Vi Atlas Gauntlets kinetic arcane powerup'
  },
  {
    name: 'hextech-card-3.mp4',
    source: 'tools/raw_hammer_forge.mp4',
    start: '00:01:18.000',
    duration: '00:00:12.000',
    desc: 'Jayce forging Mercury Hammer with Hextech core'
  },
  {
    name: 'hextech-card-4.mp4',
    source: 'tools/wild_rune.mp4',
    start: '00:00:07.000',
    duration: '00:00:14.000',
    desc: 'The Wild Rune Hexcore anomaly'
  }
];

const dests = [
  'videos',
  'zentry-local/videos'
];

cuts.forEach(c => {
  console.log(`Encoding ${c.name} (${c.desc})...`);
  const tmp = `tools/${c.name}`;
  // 1080p/720p H.264 CRF 21, AAC audio, +faststart for instant web streaming
  execSync(`${ffmpeg} -ss ${c.start} -i "${c.source}" -t ${c.duration} -vf "scale=1280:-2" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 21 -an -movflags +faststart "${tmp}" -y`, { stdio: 'inherit' });
  
  dests.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.copyFileSync(tmp, `${d}/${c.name}`);
  });
  console.log(`Saved ${c.name} to destination folders.`);
});

console.log('All new diverse Hextech video cuts encoded and placed!');
