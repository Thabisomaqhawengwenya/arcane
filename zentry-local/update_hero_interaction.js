const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'assets', 'index-Bw72vWX5.js');
let js = fs.readFileSync(jsPath, 'utf8');

// Replace hero state declarations
const oldHeroState = 'iw=()=>{const[t,e]=X.useState(1),[n,r]=X.useState(!1),[i,o]=X.useState(!0),[l,s]=X.useState(0),u=4,a=X.useRef(null)';
const newHeroState = 'iw=()=>{const[t,e]=X.useState(1),[n,r]=X.useState(!1),[i,o]=X.useState(!0),[l,s]=X.useState(0),[heroVisible,setHeroVisible]=X.useState(!1),[autoMoved,setAutoMoved]=X.useState(!1),u=4,a=X.useRef(null)';

if (js.includes(oldHeroState)) {
  js = js.replace(oldHeroState, newHeroState);
  console.log('1. Updated Hero states (heroVisible, autoMoved)');
} else {
  console.error('Could not find oldHeroState');
}

// Replace the video onTimeUpdate
const oldVideoTag = 'onTimeUpdate:e=>{if(e.target.currentTime>=80){e.target.pause();}}';
const newVideoTag = 'onTimeUpdate:ev=>{const ct=ev.target.currentTime;if(ct>=4&&!heroVisible){setHeroVisible(!0);}if(ct>=80&&!autoMoved){setAutoMoved(!0);ev.target.pause();const aboutEl=document.getElementById("about");if(aboutEl){aboutEl.scrollIntoView({behavior:"smooth"});}p();}}';

if (js.includes(oldVideoTag)) {
  js = js.replace(oldVideoTag, newVideoTag);
  console.log('2. Updated Hero onTimeUpdate logic');
} else {
  console.error('Could not find oldVideoTag');
}

// Fade in the text, button, and JINX / VIOLET typography
const oldCornerJinx = 'C.jsxs("h1",{className:"special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"';
const newCornerJinx = 'C.jsxs("h1",{style:{opacity:heroVisible?1:0,transition:"opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)"},className:"special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"';

if (js.includes(oldCornerJinx)) {
  js = js.replace(oldCornerJinx, newCornerJinx);
  console.log('3. Added fade transition to JINX headline');
} else {
  console.error('Could not find oldCornerJinx');
}

const oldOverlay = 'C.jsx("div",{className:"absolute left-0 top-0 z-40 size-full"';
const newOverlay = 'C.jsx("div",{style:{opacity:heroVisible?1:0,transition:"opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)",pointerEvents:heroVisible?"auto":"none"},className:"absolute left-0 top-0 z-40 size-full"';

if (js.includes(oldOverlay)) {
  js = js.replace(oldOverlay, newOverlay);
  console.log('4. Added fade transition to text and button overlay');
} else {
  console.error('Could not find oldOverlay');
}

const oldCornerViolet = 'C.jsxs("h1",{className:"special-font hero-heading absolute bottom-5 right-5 text-black"';
const newCornerViolet = 'C.jsxs("h1",{style:{opacity:heroVisible?1:0,transition:"opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)"},className:"special-font hero-heading absolute bottom-5 right-5 text-black"';

if (js.includes(oldCornerViolet)) {
  js = js.replace(oldCornerViolet, newCornerViolet);
  console.log('5. Added fade transition to VIOLET background headline');
} else {
  console.error('Could not find oldCornerViolet');
}

fs.writeFileSync(jsPath, js);
console.log('Successfully saved Hero fade-in and auto-advance updates to index-Bw72vWX5.js!');
