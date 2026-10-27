// Responsive photo attributes. scripts/resize_photos.mjs makes 480px and 960px copies of every photo under
// public/sized/<width>/ and records each photo's size, so the browser can pick the smallest copy that fits
// and reserve the photo's space before it loads.
import meta from '../data/photo-meta.json';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const sizes = meta as Record<string, [number, number]>;
const WIDTHS = [480, 960];

/** `src` is a path under public, e.g. "photos/japan-2023/01.jpg". `sizes` says how wide the photo shows. */
export function photo(src: string, size = '100vw') {
  const dims = sizes[src];
  if (!dims) return { src: `${base}/${src}` };
  const [width, height] = dims;
  const set = WIDTHS.filter((w) => w < width).map((w) => `${base}/sized/${w}/${src} ${w}w`);
  return { src: `${base}/${src}`, srcset: [...set, `${base}/${src} ${width}w`].join(', '), sizes: size, width, height };
}

/** The smallest copy at least `min` pixels wide, for places a srcset can't go (CSS backgrounds, link previews). */
export function photoUrl(src: string, min = 960) {
  const width = sizes[src]?.[0] ?? 0;
  const w = WIDTHS.find((x) => x >= min && x < width);
  return w ? `${base}/sized/${w}/${src}` : `${base}/${src}`;
}
