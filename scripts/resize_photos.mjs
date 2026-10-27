// Makes smaller copies of every photo in public/photos for thumbnails and phones, and records each photo's
// size in src/data/photo-meta.json so pages can reserve space for it. Runs before every build; copies that are
// already made from the same original are skipped (.cache/sized.json notes each original's byte size).
import sharp from 'sharp';
import { readdir, mkdir, stat, readFile, writeFile, access } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const photos = join(root, 'public/photos');
const out = join(root, 'public/sized');
export const WIDTHS = [480, 960];

async function* walk(dir) {
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png|webp)$/i.test(d.name)) yield p;
  }
}
const exists = (p) => access(p).then(() => true, () => false);
const ledgerFile = join(root, '.cache/sized.json');
const ledger = JSON.parse(await readFile(ledgerFile, 'utf8').catch(() => '{}'));

const meta = {};
let made = 0;
for await (const file of walk(photos)) {
  const rel = relative(join(root, 'public'), file); // photos/<entry>/<file>
  const { width, height } = await sharp(file).rotate().metadata().then((m) => (m.orientation >= 5 ? { width: m.height, height: m.width } : m));
  meta[rel] = [width, height];
  const bytes = (await stat(file)).size;
  const same = ledger[rel] === bytes;
  ledger[rel] = bytes;
  for (const w of WIDTHS) {
    if (w >= width) continue;
    const dest = join(out, String(w), rel);
    if (same && (await exists(dest))) continue;
    await mkdir(dirname(dest), { recursive: true });
    await sharp(file).rotate().resize({ width: w }).jpeg({ quality: 78, mozjpeg: true }).toFile(dest);
    made++;
  }
}
await writeFile(join(root, 'src/data/photo-meta.json'), JSON.stringify(meta, Object.keys(meta).sort(), 0) + '\n');
await mkdir(dirname(ledgerFile), { recursive: true });
await writeFile(ledgerFile, JSON.stringify(ledger));
console.log(`resize_photos: ${Object.keys(meta).length} photos, ${made} new copies`);
