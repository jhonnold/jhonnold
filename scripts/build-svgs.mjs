// Builds assets/banner.svg and assets/tmux.svg. Text is converted to paths because
// GitHub renders SVGs as <img>, which can't load web fonts.
// Scene shapes and colors come from the hero in jhonnold.github.io/index.html.
import { readFileSync, writeFileSync } from 'node:fs';
import opentype from 'opentype.js';

const font = (pkg, file) => {
    const buf = readFileSync(new URL(`../node_modules/@fontsource/${pkg}/files/${file}`, import.meta.url));
    return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};

const display = font('bricolage-grotesque', 'bricolage-grotesque-latin-800-normal.woff');
const displayRegular = font('bricolage-grotesque', 'bricolage-grotesque-latin-400-normal.woff');
const mono = font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff');
const monoBold = font('jetbrains-mono', 'jetbrains-mono-latin-700-normal.woff');

// Dusk Terminal tokens (src/css/main.css)
const c = {
    navy: '#011c27',
    ink: '#07141b',
    amber: '#ffac00',
    text: '#fafafa',
    text2: '#c9d6db',
    text3: '#d6e1e5',
    muted: '#8aa3ad',
    cactus: '#8fb86b',
    moon: '#f4e7c5',
};

// Lays out glyphs one by one; opentype.js's shaper chokes on Bricolage's GSUB tables.
function text(f, str, x, y, size, fill, tracking = 0) {
    const scale = size / f.unitsPerEm;
    const glyphs = [...str].map((ch) => f.charToGlyph(ch));
    let cx = x;
    let d = '';
    glyphs.forEach((g, i) => {
        d += g.getPath(cx, y, size).toPathData({ decimalPlaces: 1, flipY: false });
        cx += g.advanceWidth * scale + tracking;
        if (i < glyphs.length - 1) cx += f.getKerningValue(g, glyphs[i + 1]) * scale;
    });
    return { svg: `<path fill="${fill}" d="${d}"/>`, end: cx };
}

// ---------- banner ----------
const W = 1280;
const H = 460;
const X = 72; // copy inset

// Hero scene coords (1440×900) -> banner; the landscape sits on the right like the hero's.
const scene = 'translate(416 -74) scale(0.6)';

// Hero stars, squeezed into the top of the sky.
const stars = [
    [120, 140, 1.6], [410, 190, 1.4], [540, 262, 1.1], [610, 110, 1.1], [720, 58, 1.8], [860, 172, 1.2],
    [940, 250, 1], [1180, 236, 1.1], [1210, 112, 1.7], [1340, 60, 1.2], [1392, 244, 1.3], [60, 304, 1.2],
    [820, 292, 1], [1270, 310, 1], [488, 42, 1.3], [190, 236, 1], [660, 206, 0.9], [1110, 300, 0.9],
];
const twinkle = new Set([4, 8, 14, 9]);
const starSvg = stars
    .map(([x, y, r], i) => {
        const cls = twinkle.has(i) ? ` class="tw" style="animation-delay:${(i % 4) * 0.9}s"` : '';
        return `<circle${cls} cx="${Math.round(x * 0.889)}" cy="${Math.round(y * 0.4 + 14)}" r="${r}"/>`;
    })
    .join('');

const prompt = text(mono, 'whoami', X + 24, 70, 20, c.muted);
const name = text(display, 'Jay Honnold', X - 4, 166, 96, c.text, -2.6);
const lede1 = text(displayRegular, 'Senior software engineer building platforms for AI agents.', X, 214, 24, c.text3);
const lede2 = text(displayRegular, 'At home I run a homelab and local LLMs.', X, 246, 24, c.text3);
const status = text(mono, 'Senior Software Engineer @ Cognite', X + 22, 296, 17, c.text2);
const where = text(mono, '// Phoenix, AZ · 33.45°N 112.07°W', status.end + 26, 296, 17, c.muted);

// Saguaro with the hero's sunset rim light: offset orange stroke under an ink stroke.
const saguaro = (dx, arms) => {
    const g = (stroke, t = '') =>
        `<g${t} fill="none" stroke="${stroke}" stroke-linecap="round" stroke-linejoin="round">${arms
            .map(([w, d]) => `<path stroke-width="${w}" d="${d}"/>`)
            .join('')}</g>`;
    return g('#e07a3a', ` transform="translate(${dx} 0)"`) + g(c.ink);
};

const banner = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t">
<title id="t">$ whoami: Jay Honnold, senior software engineer building platforms for AI agents. Phoenix, AZ.</title>
<style>
.cur{animation:blink 1.1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.tw{animation:tw 3.6s ease-in-out infinite}
@keyframes tw{50%{opacity:.2}}
@media (prefers-reduced-motion:reduce){.cur,.tw{animation:none}}
</style>
<clipPath id="r"><rect width="${W}" height="${H}" rx="16"/></clipPath>
<g clip-path="url(#r)">
<rect width="${W}" height="${H}" fill="${c.navy}"/>
<rect y="170" width="${W}" height="65" fill="#0f2340"/>
<rect y="235" width="${W}" height="40" fill="#262448"/>
<rect y="275" width="${W}" height="30" fill="#46284a"/>
<rect y="305" width="${W}" height="22" fill="#71304a"/>
<rect y="327" width="${W}" height="16" fill="#a6423f"/>
<rect y="343" width="${W}" height="13" fill="#d4633a"/>
<rect y="356" width="${W}" height="${H - 356}" fill="#f08f2e"/>
<g fill="${c.text}">${starSvg}</g>
<!-- a knight's move -->
<path d="M960 30 V78 H984" stroke="${c.muted}" stroke-width="1" opacity="0.45" fill="none"/>
<g fill="${c.text}"><circle cx="960" cy="30" r="2"/><circle cx="960" cy="54" r="1.3"/><circle cx="960" cy="78" r="1.6"/><circle cx="984" cy="78" r="2.2"/></g>
<circle cx="1216" cy="62" r="18" fill="${c.moon}"/>
<circle cx="1224" cy="56" r="16" fill="${c.navy}"/>
<g transform="${scene}">
<circle cx="980" cy="700" r="96" fill="${c.amber}"/>
<g stroke="#e4722f" fill="none"><line x1="870" y1="664" x2="1090" y2="664" stroke-width="3"/><line x1="870" y1="680" x2="1090" y2="680" stroke-width="5"/><line x1="870" y1="698" x2="1090" y2="698" stroke-width="7"/></g>
<path fill="#5a2a44" d="M-700 960 V700 L80 700 L96 682 L214 682 L232 702 L360 704 L378 664 L398 652 L560 652 L578 672 L604 706 L760 710 L900 710 L920 692 L942 676 L1112 676 L1132 702 L1300 704 L1320 688 L1440 688 V960 Z"/>
<path fill="#9a3a2b" d="M-700 960 V786 L300 778 L520 788 L700 792 L880 788 L1100 782 L1150 762 L1170 700 L1180 546 L1200 524 L1330 518 L1350 534 L1360 604 L1372 702 L1402 752 L1440 762 V960 Z"/>
<path fill="#c4603a" d="M1200 524 L1330 518 L1346 532 L1194 540 Z"/>
<path fill="#7a2c25" d="M1350 534 L1360 604 L1372 702 L1402 752 L1440 762 V800 L1380 800 L1356 700 L1344 540 Z"/>
<g stroke="#7a2c25" stroke-width="3" fill="none"><line x1="1184" y1="596" x2="1350" y2="592"/><line x1="1178" y1="640" x2="1356" y2="636"/><line x1="1174" y1="690" x2="1362" y2="686"/></g>
<path fill="#3a1c2c" d="M-700 960 V806 Q-350 800 0 812 Q360 792 720 806 T1440 800 V960 Z"/>
<g fill="none" stroke="#3a1c2c" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"><path d="M430 806 V730"/><path d="M640 804 V748"/><path d="M905 806 V716"/><path d="M1030 804 V760"/><path d="M560 806 V774"/></g>
<g fill="none" stroke="#3a1c2c" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M430 770 H418 Q412 770 412 764 V748"/><path d="M430 758 H442 Q448 758 448 752 V738"/><path d="M640 780 H652 Q658 780 658 774 V760"/><path d="M905 762 H891 Q885 762 885 756 V736"/><path d="M905 748 H919 Q925 748 925 742 V724"/></g>
<path fill="${c.ink}" d="M-700 960 V850 Q-350 842 0 852 Q300 832 600 856 T1200 850 T1440 846 V960 Z"/>
${saguaro(-5, [
    [34, 'M1262 866 V470'],
    [26, 'M1262 708 H1226 Q1206 708 1206 688 V596'],
    [26, 'M1262 640 H1302 Q1320 640 1320 620 V540'],
    [22, 'M1262 780 H1296 Q1310 780 1310 766 V726'],
])}
<g stroke="${c.ink}" fill="none" stroke-width="4" stroke-linecap="round"><path d="M332 858 Q318 780 300 720"/><path d="M336 858 Q336 770 344 700"/><path d="M340 858 Q360 790 382 736"/><path d="M334 858 Q300 800 276 770"/><path d="M338 858 Q352 812 364 790"/></g>
<g fill="${c.ink}"><ellipse cx="1082" cy="838" rx="18" ry="24"/><ellipse cx="1104" cy="814" rx="13" ry="18" transform="rotate(24 1104 814)"/><ellipse cx="1062" cy="818" rx="12" ry="16" transform="rotate(-20 1062 818)"/><path d="M500 858 Q516 836 540 840 Q562 844 570 858 Z"/></g>
</g>
${text(mono, '$', X, 70, 20, c.amber).svg}
${prompt.svg}
<rect class="cur" x="${Math.round(prompt.end + 8)}" y="53" width="10" height="21" fill="${c.amber}"/>
${name.svg}
${lede1.svg}
${lede2.svg}
<circle cx="${X + 5}" cy="290" r="5" fill="${c.cactus}"/>
${status.svg}
${where.svg}
</g>
</svg>
`;

// ---------- tmux status bar ----------
const TW = 960;
const TH = 32;
const base = 21;
const left = text(monoBold, '[jhonnold]', 14, base, 13, c.navy);
let x = left.end + 18;
const tabs = ['0:readme', '1:about', '2:experience', '3:works', '4:contact'].map((label, i) => {
    const t = text(i ? mono : monoBold, label, x + 10, base, 13, i ? c.navy : c.amber);
    const bg = i ? '' : `<rect x="${x.toFixed(1)}" y="4" width="${(t.end - x + 10).toFixed(1)}" height="24" fill="${c.navy}"/>`;
    x = t.end + 10;
    return bg + t.svg;
});
const right = 'honnold.me';
const rightWidth = text(mono, right, 0, 0, 13, '').end;
const tmux = `<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="${TH}" viewBox="0 0 ${TW} ${TH}" role="img" aria-labelledby="t">
<title id="t">tmux status bar: [jhonnold] 0:readme 1:about 2:experience 3:works 4:contact · honnold.me</title>
<rect width="${TW}" height="${TH}" rx="4" fill="${c.amber}"/>
${left.svg}
${tabs.join('\n')}
${text(mono, right, TW - 14 - rightWidth, base, 13, c.navy).svg}
</svg>
`;

writeFileSync(new URL('../assets/banner.svg', import.meta.url), banner);
writeFileSync(new URL('../assets/tmux.svg', import.meta.url), tmux);
console.log(`banner.svg ${(banner.length / 1024).toFixed(1)} KB, tmux.svg ${(tmux.length / 1024).toFixed(1)} KB`);
