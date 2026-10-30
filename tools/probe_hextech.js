const { execSync } = require('child_process');
const fs = require('fs');

const ffmpeg = '"C:\\Users\\Maqhawe T Ngwenya\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe"';
const dir = 'c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/hextech_frames';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

execSync(`${ffmpeg} -i "c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/birth_of_hextech.mp4" -vf fps=1/4 "${dir}/birth_%03d.jpg" -y`);
execSync(`${ffmpeg} -i "c:/Users/Maqhawe T Ngwenya/Desktop/slime 2.0/tools/wild_rune.mp4" -vf fps=1/3 "${dir}/rune_%03d.jpg" -y`);

console.log('Frames generated:', fs.readdirSync(dir).length);
