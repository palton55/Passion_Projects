// Re-reads Patrick's saved Google Maps lists (src/data/gmaps-lists.json) into src/data/gmaps/<file>.json before each build,
// so the site follows the lists as he edits them. The deploy workflow also runs daily to pick up edits.
// Google offers no official API for saved lists; this reads the same endpoint the Maps web app uses. If a fetch or parse
// fails, the last good copy in the repo is kept and the build goes on.
import { readFile, writeFile } from 'node:fs/promises';

const lists = JSON.parse(await readFile('src/data/gmaps-lists.json', 'utf8'));
const endpoint = (id) =>
  `https://www.google.com/maps/preview/entitylist/getlist?authuser=0&hl=en&gl=us&pb=!1m4!1s${id}!2e1!3m1!1e1!2e2!3e2!4i500!16b1`;

// First [_, _, lat, lng] array anywhere inside a place record.
function coords(x) {
  if (!Array.isArray(x)) return null;
  if (x.length >= 4 && typeof x[2] === 'number' && typeof x[3] === 'number' && Math.abs(x[2]) <= 90 && Math.abs(x[3]) <= 180) return [x[2], x[3]];
  for (const y of x) { const c = coords(y); if (c) return c; }
  return null;
}
// Google's feature id ("0x…:0x…"); its second half is the place's CID, which makes a stable Maps link.
function cid(x) {
  if (typeof x === 'string') { const m = x.match(/^0x[0-9a-f]+:(0x[0-9a-f]+)$/i); return m ? BigInt(m[1]).toString() : null; }
  if (Array.isArray(x)) for (const y of x) { const c = cid(y); if (c) return c; }
  return null;
}

for (const { file, list } of lists) {
  const path = `src/data/gmaps/${file}.json`;
  try {
    const res = await fetch(endpoint(list), { headers: { 'user-agent': 'Mozilla/5.0', 'accept-language': 'en-US' }, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const data = JSON.parse(text.slice(text.indexOf('\n') + 1))[0];
    const places = (data[8] ?? []).map((p) => {
      const c = coords(p[1]);
      const address = [p[1]?.[4], p[1]?.[2]].find((a) => typeof a === 'string' && a.trim()) ?? '';
      return c && typeof p[2] === 'string' ? { name: p[2], address, lat: +c[0].toFixed(6), lng: +c[1].toFixed(6), note: typeof p[3] === 'string' ? p[3] : '', cid: cid(p[1]) ?? undefined } : null;
    }).filter(Boolean);
    if (!places.length) throw new Error('no places found');
    const out = { list, title: typeof data[4] === 'string' ? data[4] : '', description: typeof data[5] === 'string' ? data[5] : '', synced: new Date().toISOString(), places };
    await writeFile(path, JSON.stringify(out, null, 1) + '\n');
    console.log(`gmaps: ${file}: ${places.length} places`);
  } catch (e) {
    console.warn(`gmaps: ${file}: kept the saved copy (${e.message})`);
  }
}
