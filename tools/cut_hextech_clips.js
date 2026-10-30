const { execSync } = require('child_process');
const ffmpeg = '"C:\\Users\\Maqhawe T Ngwenya\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe"';

const cuts = [
  {
    name: 'hextech-hero.mp4',
    source: 'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/birth_of_hextech.mp4',
    start: '00:01:25.000',
    duration: '00:00:22.000',
    desc: 'Hextech crystal floating, pulsing arcane blue light and levitation rings'
  },
  {
    name: 'hextech-card-1.mp4',
    source: 'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/birth_of_hextech.mp4',
    start: '00:01:50.000',
    duration: '00:00:10.000',
    desc: 'Jayce & Viktor witnessing stabilization'
  },
  {
    name: 'hextech-card-2.mp4',
    source: 'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/wild_rune.mp4',
    start: '00:00:08.000',
    duration: '00:00:09.000',
    desc: 'Wild Rune pulsing with anomalous arcane energy'
  },
  {
    name: 'hextech-card-3.mp4',
    source: 'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/birth_of_hextech.mp4',
    start: '00:00:45.000',
    duration: '00:00:09.000',
    desc: 'Hextech containment runes and harmonic rings'
  },
  {
    name: 'hextech-card-4.mp4',
    source: 'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/wild_rune.mp4',
    start: '00:00:26.000',
    duration: '00:00:09.000',
    desc: 'Hextech matrix energy surge across Piltover'
  }
];

const outDirs = [
  'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/videos',
  'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/zentry-local/videos'
];

cuts.forEach(c => {
  console.log(`Cutting ${c.name} (${c.desc})...`);
  const tmpOut = `c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/${c.name}`;
  execSync(`${ffmpeg} -ss ${c.start} -i "${c.source}" -t ${c.duration} -c:v libx264 -pix_fmt yuv420p -preset fast -crf 21 -c:a aac -b:a 128k -movflags +faststart "${tmpOut}" -y`);
  outDirs.forEach(d => {
    const fs = require('fs');
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.copyFileSync(tmpOut, `${d}/${c.name}`);
  });
  console.log(`  -> Saved ${c.name}`);
});

console.log('All Hextech anime video cuts successfully generated!');
