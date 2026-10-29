const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'assets', 'index-Bw72vWX5.js');
let js = fs.readFileSync(jsPath, 'utf8');

const targetPattern = /C\.jsx\("video",\{src:f\(t===u-1\?1:t\),autoPlay:!0,loop:!0,muted:!0,className:"absolute left-0 top-0 size-full object-cover object-center",onLoadedData:c\}\)/;

if (targetPattern.test(js)) {
  js = js.replace(targetPattern, 'C.jsx("video",{src:f(t===u-1?1:t),autoPlay:!0,loop:!1,muted:!0,className:"absolute left-0 top-0 size-full object-cover object-center",onLoadedData:c,onTimeUpdate:e=>{if(e.target.currentTime>=80){e.target.pause();}}})');
  fs.writeFileSync(jsPath, js);
  console.log('Successfully updated Hero background video to stop at 1m 20s!');
} else {
  console.log('Target pattern not found directly, searching similar:');
  const match = js.match(/C\.jsx\("video",\{src:f\(t===u-1\?1:t\)[^}]+\}\)/);
  if (match) {
    console.log('Found:', match[0]);
  }
}
