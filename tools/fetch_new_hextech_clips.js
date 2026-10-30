const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpeg = '"C:\\Users\\Maqhawe T Ngwenya\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe"';

const sources = [
  { id: 'T6BWpVE_V_s', out: 'tools/raw_hexgate.mp4' },
  { id: 'U9-gSfq4MDg', out: 'tools/raw_hammer_forge.mp4' },
  { id: 'yBPGqcVmci8', out: 'tools/raw_gauntlet.mp4' }
];

sources.forEach(s => {
  console.log(`Downloading ${s.out}...`);
  try {
    execSync(`yt-dlp -f "bv*[height<=1080]+ba/b[height<=1080]" --merge-output-format mp4 "https://www.youtube.com/watch?v=${s.id}" -o "${s.out}" --force-overwrites`, { stdio: 'inherit' });
    console.log(`Downloaded ${s.out}`);
  } catch (e) {
    console.error(`Failed to download ${s.id}:`, e.message);
  }
});
