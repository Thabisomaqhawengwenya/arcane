const { execSync } = require('child_process');
const fs = require('fs');
const ffmpeg = '"C:\\Users\\Maqhawe T Ngwenya\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe"';

const dir = 'tools/new_frames';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// hexgate: 91s. Extract 10 frames
for (let i = 10; i <= 80; i += 8) {
  const ts = `00:0${Math.floor(i/60)}:${(i%60 < 10 ? '0' : '') + (i%60)}`;
  execSync(`${ffmpeg} -ss ${ts} -i ./tools/raw_hexgate.mp4 -frames:v 1 -update 1 ${dir}/gate_${i}.jpg -y`);
}

// hammer forge: 137s. Extract 12 frames
for (let i = 15; i <= 120; i += 10) {
  const m = Math.floor(i/60);
  const s = i % 60;
  const ts = `00:0${m}:${s < 10 ? '0' : ''}${s}`;
  execSync(`${ffmpeg} -ss ${ts} -i ./tools/raw_hammer_forge.mp4 -frames:v 1 -update 1 ${dir}/forge_${i}.jpg -y`);
}

// gauntlet: 121s. Extract 12 frames
for (let i = 10; i <= 100; i += 10) {
  const m = Math.floor(i/60);
  const s = i % 60;
  const ts = `00:0${m}:${s < 10 ? '0' : ''}${s}`;
  execSync(`${ffmpeg} -ss ${ts} -i ./tools/raw_gauntlet.mp4 -frames:v 1 -update 1 ${dir}/gauntlet_${i}.jpg -y`);
}

console.log('Sample frames extracted!');
