const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'assets', 'index-Bw72vWX5.js');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Navigation items
js = js.replace('fw=["Nexus","Vault","Prologue","About","Contact"]', 'fw=["Sisters","Hextech","Shimmer","Zaun","Tea Party"]');
js = js.replace('title:"Products"', 'title:"Piltover"');

// 2. Hero Section
js = js.replace('["redefi",C.jsx("b",{children:"n"}),"e"]', '["ARC",C.jsx("b",{children:"A"}),"NE"]');
js = js.replace('"Enter the Metagame Layer "', '"Two Sisters Divided by Chaos "');
js = js.replace('" Unleash the Play Economy"', '" United in Blood and Shimmer"');
js = js.replace('title:"Watch trailer"', 'title:"Watch Teaser"');
// First GAMING is text-blue-75, second is text-black
js = js.replace('["G",C.jsx("b",{children:"A"}),"MING"]', '["J",C.jsx("b",{children:"I"}),"NX"]');
js = js.replace('["G",C.jsx("b",{children:"A"}),"MING"]', '["V",C.jsx("b",{children:"I"}),"OLET"]');

// 3. About Section
js = js.replace('"Welcome to Zentry"', '"Welcome to the Undercity"');
js = js.replace('Disc<b>o</b>ver the world\'s <br /> largest shared <b>a</b>dventure', 'Two s<b>i</b>sters <br /> bound by blood, torn by ch<b>a</b>os');
js = js.replace('The Game of Games begins—your life, now an epic MMORPG', 'From Vander\'s Last Drop in the fissure to the heights of the Council of Piltover.');
js = js.replace('Zentry unites every player from countless games and platforms, both digital and physical, into a unified Play Economy', 'Where Violet wields the crushing kinetic force of Hextech, and Jinx unleashes the purple lightning of Shimmer.');

// 4. Features Section
js = js.replace('"Into the Metagame Layer"', '"The Factions of the Twin Cities"');
js = js.replace('Immerse yourself in a rich and ever-expanding universe where a vibrant array of products converge into an interconnected overlay experience on your world.', 'Witness the explosive clash between Piltover\'s mechanical progress and the toxic underworld rebellion of Zaun.');

// Bento Cards
js = js.replace('["radia",C.jsx("b",{children:"n"}),"t"]', '["FISH",C.jsx("b",{children:"B"}),"ONES"]');
js = js.replace('A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.', 'Jinx\'s chaotic rocket artillery—painted in neon graffiti, ready to strike the Piltover council tower.');

js = js.replace('["zig",C.jsx("b",{children:"m"}),"a"]', '["ATL",C.jsx("b",{children:"A"}),"S"]');
js = js.replace('An anime and gaming-inspired NFT collection - the IP primed for expansion.', 'Vi\'s heavy hydraulic mining gauntlets—shattering enforcer armor with raw street-fighting fury.');

js = js.replace('["n",C.jsx("b",{children:"e"}),"xus"]', '["Z-DR",C.jsx("b",{children:"I"}),"VE"]');
js = js.replace('A gamified social hub, adding a new dimension of play to social interaction for Web3 communities.', 'Ekko\'s temporal stopwatch—rewinding precious seconds to protect the Firelights from the corrupt chem-barons.');

js = js.replace('["az",C.jsx("b",{children:"u"}),"l"]', '["SN",C.jsx("b",{children:"I"}),"PER"]');
js = js.replace('A cross-world AI Agent - elevating your gameplay to be more fun and productive.', 'Caitlyn\'s custom hextech rifle—keeping watch over the bridge while navigating the sisters\' crossfire.');

js = js.replace('["M",C.jsx("b",{children:"o"}),"re co",C.jsx("b",{children:"m"}),"ing s",C.jsx("b",{children:"o"}),"on."]', '["Are we ",C.jsx("b",{children:"s"}),"till s",C.jsx("b",{children:"i"}),"sters?"]');
js = js.replaceAll('children:"coming soon"', 'children:"examine"');

// 5. Story Section
js = js.replace('"the multiversal ip world"', '"the tragic sisterhood"');
js = js.replace('the st<b>o</b>ry of <br /> a hidden real<b>m</b>', 'the st<b>o</b>ry of <br /> powder & vi<b>o</b>let');
js = js.replace('Where realms converge, lies Zentry and the boundless pillar. Discover its secrets and shape your fate amidst infinite opportunities.', 'Deep in the fissures of Zaun, where the air tastes of sulfur and shimmer. Will Vi bring Powder home, or will the Loose Cannon tear down the bridge forever?');
js = js.replace('title:"discover prologue"', 'title:"the tea party"');

// 6. Contact Section
js = js.replace('"Join Zentry"', '"Choose Your Allegiance"');
js = js.replace('let\'s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether.', 'the b<b>a</b>ttle for <br /> the future of <br /> z<b>a</b>un & p<b>i</b>ltover.');
js = js.replace('title:"contact us"', 'title:"enter the fissure"');

// 7. Footer
js = js.replace('©Nova 2024. All rights reserved', '©Riot Games & Fortiche. Arcane Tribute for Mr Q.');

fs.writeFileSync(jsPath, js);
console.log('Transformed index-Bw72vWX5.js cleanly to Arcane: Jinx & Vi!');

// 8. Transform CSS palette
const cssPath = path.join(__dirname, 'assets', 'index-9nhqMKDh.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace electric yellow CTA (#edff66) with Electric Hextech Cyan (#00f0ff)
css = css.replaceAll('237 255 102', '0 240 255');
// Replace violet-300 (#5724ff) with Toxic Shimmer Purple (#a855f7)
css = css.replaceAll('87 36 255', '168 85 247');
// Replace footer bg #5542ff with deep Zaun underworld indigo #0e0d26
css = css.replaceAll('#5542ff', '#0e0d26');
// Update spotlight gradient to cyan/magenta
css = css.replaceAll('rgba(101, 111, 226, 0.533)', 'rgba(0, 240, 255, 0.6)');

fs.writeFileSync(cssPath, css);
console.log('Transformed index-9nhqMKDh.css color tokens to Hextech Cyan & Shimmer Purple!');
