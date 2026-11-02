// Last check before a deploy: scans the built site for anything that shouldn't be public, and fails the build if it
// finds any. It looks for credentials and keys in text files, source maps, local file paths, and photos that still carry
// EXIF or XMP metadata (GPS location, camera serials, timestamps). Usage: node scripts/check_dist.mjs dist [more dirs]
import sharp from 'sharp';
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const SECRETS = [
  ['AWS access key', /\b(AKIA|ASIA)[0-9A-Z]{16}\b/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ['GitHub token', /\b(gh[pousr]_[0-9A-Za-z]{36}|github_pat_[0-9A-Za-z_]{40,})\b/],
  ['Slack token', /\bxox[abprs]-[0-9A-Za-z-]{10,}/],
  ['Stripe key', /\b[rs]k_(live|test)_[0-9A-Za-z]{16,}/],
  ['OpenAI/Anthropic-style key', /\bsk-(ant-)?[A-Za-z0-9_-]{24,}/],
  ['Private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['JWT', /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/],
  ['Database connection string', /\b(mongodb(\+srv)?|postgres(ql)?|mysql|redis|amqp):\/\/[^\s"'<]*@/],
  ['Credential in URL', /[?&](api_?key|apikey|access_token|auth_token|client_secret|secret|password)=[^&\s"'<]{8,}/i],
  ['Assigned secret', /\b(api_?key|secret_?key|client_secret|access_token|auth_token|password)\s*[:=]\s*["'][^"'\s]{12,}["']/i],
  ['Local file path', /\/Users\/[a-z][\w.-]*\/|\/mnt\/project-files\/|\/home\/(runner|claude)\//],
];
const TEXT = new Set(['.html', '.js', '.mjs', '.css', '.json', '.geojson', '.txt', '.xml', '.svg', '.webmanifest']);
const IMAGE = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic']);

async function* walk(dir) {
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const problems = [];
let files = 0, images = 0;
for (const root of process.argv.slice(2).length ? process.argv.slice(2) : ['dist']) {
  for await (const file of walk(root)) {
    files++;
    const ext = extname(file).toLowerCase();
    if (ext === '.map') { problems.push(`${file}: source map`); continue; }
    if (/(^|\/)\.env/.test(file)) { problems.push(`${file}: environment file`); continue; }
    if (TEXT.has(ext)) {
      const text = await readFile(file, 'utf8');
      if (/sourceMappingURL=/.test(text)) problems.push(`${file}: points to a source map`);
      for (const [name, re] of SECRETS) {
        const m = text.match(re);
        if (m) problems.push(`${file}: ${name} (${m[0].slice(0, 12)}…)`);
      }
    } else if (IMAGE.has(ext)) {
      images++;
      const m = await sharp(file).metadata().catch(() => null);
      if (m?.exif || m?.xmp || m?.iptc) problems.push(`${file}: photo metadata (${['exif', 'xmp', 'iptc'].filter((k) => m[k]).join(', ')})`);
    }
  }
}

if (problems.length) {
  console.error(`check_dist: ${problems.length} problem(s) in ${files} files:\n  ` + problems.slice(0, 50).join('\n  '));
  process.exit(1);
}
console.log(`check_dist: ${files} files clean (${images} photos without metadata, no keys or source maps)`);
