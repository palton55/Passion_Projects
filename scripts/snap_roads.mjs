// Snaps every drive leg and road band on the built site to real roads once, at build time, so visitors' browsers
// don't each have to ask a public router. Usage: node scripts/snap_roads.mjs dist [dist/alpha ...]
// Each road is saved as <dist>/roads/<key>.json (see src/lib/road-key.ts). Answers are kept in .cache/roads/ so
// later builds only ask about new legs; a leg the routers can't answer is left for the browser to try.
import { readdir, readFile, writeFile, mkdir, copyFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { roadQuery, roadKey } from '../src/lib/road-key.ts';

const routers = [
  'https://routing.openstreetmap.de/routed-car/route/v1/driving/',
  'https://router.project-osrm.org/route/v1/driving/',
];
const cache = new URL('../.cache/roads/', import.meta.url).pathname;
const dists = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => access(p).then(() => true, () => false);
const unescape = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

async function* html(dir) {
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) yield* html(p);
    else if (d.name.endsWith('.html')) yield p;
  }
}

// Douglas-Peucker in degrees; 0.00005 is about 5 m, finer than the eye can see at the zoom the maps open at.
function simplify(pts, tol = 0.00005) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let far = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const [y, x] = pts[i], dx = b[1] - a[1], dy = b[0] - a[0];
    const d = Math.abs(dy * (x - a[1]) - dx * (y - a[0])) / (Math.hypot(dx, dy) || 1);
    if (d > far) { far = d; idx = i; }
  }
  return far <= tol ? [a, b] : [...simplify(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplify(pts.slice(idx), tol)];
}

async function ask(q) {
  for (const r of routers) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(`${r}${q}?overview=full&geometries=geojson`, { headers: { 'User-Agent': 'sidequest-resume site build' }, signal: AbortSignal.timeout(20000) });
        if (res.status === 429) { await sleep(3000); continue; }
        if (!res.ok) break;
        const line = (await res.json()).routes?.[0]?.geometry?.coordinates;
        if (line?.length) return simplify(line.map(([lng, lat]) => [+lat.toFixed(5), +lng.toFixed(5)]));
        break;
      } catch { await sleep(1000); }
    }
  }
  return null;
}

const queries = new Map();
for (const dist of dists) {
  for await (const file of html(dist)) {
    const page = await readFile(file, 'utf8');
    for (const [, attr, raw] of page.matchAll(/data-(legs|bands)="([^"]*)"/g)) {
      for (const item of JSON.parse(unescape(raw))) {
        if (attr === 'legs' && item.mode !== 'drive') continue;
        const q = roadQuery(item.coords);
        if (q) queries.set(roadKey(q), q);
      }
    }
  }
}

await mkdir(cache, { recursive: true });
// After several misses in a row the routers are probably down; stop asking and let the next build try again.
let asked = 0, missed = 0, streak = 0;
for (const [key, q] of queries) {
  const file = join(cache, `${key}.json`);
  if (await exists(file)) continue;
  if (streak >= 5) { missed++; continue; }
  asked++;
  const line = await ask(q);
  if (line) { await writeFile(file, JSON.stringify(line)); streak = 0; }
  else { missed++; streak++; }
  await sleep(1000); // one request a second, per the public routers' usage policies
}
for (const dist of dists) {
  await mkdir(join(dist, 'roads'), { recursive: true });
  for (const key of queries.keys()) {
    const file = join(cache, `${key}.json`);
    if (await exists(file)) await copyFile(file, join(dist, 'roads', `${key}.json`));
  }
}
console.log(`snap_roads: ${queries.size} roads, ${asked} asked, ${missed} not answered (left to the browser)`);
