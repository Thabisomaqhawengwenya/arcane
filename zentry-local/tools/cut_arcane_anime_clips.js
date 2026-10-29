const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpeg = '"C:\\Users\\Maqhawe T Ngwenya\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe"';
const toolsDir = 'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/zentry-local/tools';
const videosDir = 'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/zentry-local/videos';

const s1 = `${toolsDir}/arcane_s1_trailer.mp4`;
const enemy = `${toolsDir}/arcane_enemy.mp4`;
const s2 = `${toolsDir}/arcane_s2_trailer.mp4`;

const clips = [
  {
    name: 'hero-2.mp4',
    source: s1,
    start: '00:01:27.500',
    duration: '00:00:09.000',
    desc: 'Jinx lighting flare & laughing with pink neon graffiti'
  },
  {
    name: 'hero-3.mp4',
    source: s2,
    start: '00:00:18.000',
    duration: '00:00:09.000',
    desc: 'Vi brawler arena fighting in the underground'
  },
  {
    name: 'hero-4.mp4',
    source: s1,
    start: '00:02:11.000',
    duration: '00:00:09.500',
    desc: 'Jinx pink Shimmer eyes & explosive anime sequence'
  },
  {
    name: 'feature-1.mp4',
    source: s2,
    start: '00:01:34.000',
    duration: '00:00:08.500',
    desc: 'Jinx chaotic combat & weapon burst'
  },
  {
    name: 'feature-2.mp4',
    source: s1,
    start: '00:01:47.000',
    duration: '00:00:08.000',
    desc: 'Vi activating Atlas Gauntlets and charging'
  },
  {
    name: 'feature-3.mp4',
    source: s1,
    start: '00:01:56.000',
    duration: '00:00:08.000',
    desc: 'Ekko Firelights hoverboard and Zaun aerial battle'
  },
  {
    name: 'feature-4.mp4',
    source: s2,
    start: '00:00:37.000',
    duration: '00:00:07.500',
    desc: 'Caitlyn sniper squad and Piltover council defense'
  },
  {
    name: 'feature-5.mp4',
    source: s1,
    start: '00:00:18.000',
    duration: '00:00:09.000',
    desc: 'Zaun neon cityscape and Shimmer atmospheric glow'
  }
];

console.log('Cutting 8 Arcane anime clips...');
clips.forEach(clip => {
  const target = `${videosDir}/${clip.name}`;
  console.log(`Cutting ${clip.name}: ${clip.desc} (${clip.start} for ${clip.duration})...`);
  // Re-encode to clean H.264 + AAC with muted or normalized audio, fast web playback
  const cmd = `${ffmpeg} -ss ${clip.start} -i "${clip.source}" -t ${clip.duration} -c:v libx264 -pix_fmt yuv420p -preset fast -crf 22 -c:a aac -b:a 128k -movflags +faststart "${target}" -y`;
  execSync(cmd, { stdio: 'pipe' });
  const stat = fs.statSync(target);
  console.log(`  -> Finished ${clip.name} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
});

console.log('All 8 Arcane anime clips successfully produced!');
