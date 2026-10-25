// Cities and towns visited in Japan, built from every Japan entry's route stops and
// grouped by prefecture (point-in-polygon on the simplified prefecture boundaries).
// US trips are grouped the same way by county, from src/data/us-counties.json (Arizona and its neighbors).
import fs from 'node:fs';
import path from 'node:path';

type Ring = [number, number][];
const geo = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/japan-prefectures.geojson'), 'utf8'));
const prefectures: { name: string; polys: Ring[][] }[] = geo.features.map((f: any) => ({
  name: f.properties.nam,
  polys: f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates,
}));

const inRing = (x: number, y: number, ring: Ring) => {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

// Capes and coastal stops can sit just outside the simplified outline, so fall back to the nearest vertex.
export function prefectureOf(lat: number, lng: number): string {
  const hit = prefectures.find((p) => p.polys.some((poly) => inRing(lng, lat, poly[0]) && !poly.slice(1).some((h) => inRing(lng, lat, h))));
  if (hit) return hit.name;
  let best = '', dist = Infinity;
  for (const p of prefectures) for (const poly of p.polys) for (const [x, y] of poly[0]) {
    const d = (x - lng) ** 2 + (y - lat) ** 2;
    if (d < dist) { dist = d; best = p.name; }
  }
  return best;
}

const usGeo = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/us-counties.json'), 'utf8'));
const counties: { name: string; state: string; polys: Ring[][] }[] = usGeo.features.map((f: any) => ({
  name: `${f.properties.county} County`, state: f.properties.state,
  polys: f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates,
}));

// County and state of a US stop, or undefined outside the counties on file.
export function countyOf(lat: number, lng: number): { area: string; state: string } | undefined {
  const hit = counties.find((c) => c.polys.some((poly) => inRing(lng, lat, poly[0]) && !poly.slice(1).some((h) => inRing(lng, lat, h))));
  return hit && { area: hit.name, state: hit.state };
}

export const areas: [string, string[]][] = [
  ['Hokkaido', ['Hokkaido']],
  ['Tohoku', ['Aomori', 'Iwate', 'Akita', 'Miyagi', 'Yamagata', 'Fukushima']],
  ['Kanto', ['Tokyo', 'Kanagawa', 'Saitama', 'Chiba', 'Ibaraki', 'Tochigi', 'Gunma']],
  ['Chubu', ['Niigata', 'Toyama', 'Ishikawa', 'Fukui', 'Yamanashi', 'Nagano', 'Gifu', 'Shizuoka', 'Aichi']],
  ['Kansai', ['Mie', 'Shiga', 'Kyoto', 'Osaka', 'Hyogo', 'Nara', 'Wakayama']],
  ['Chugoku and Shikoku', ['Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi', 'Tokushima', 'Kagawa', 'Ehime', 'Kochi']],
  ['Kyushu and Okinawa', ['Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa']],
];

// Stops that are not places to list: airports and generic labels.
const skip = /airport|^boat trips$/i;
// Tidy stop labels into place names ("Sapporo Station" and "Sapporo" are one place).
export const tidy = (n: string) => n.replace(/ \([^)]*\)$/, '').replace(/, then .*$/, '').replace(/: .*$/, '')
  .replace(/ (Station|again)$/i, '').replace(/^Upopoy, /, '').trim();

export type Place = { name: string; lat: number; lng: number; prefecture: string; state?: string; trips: { id: string; title: string; year: string }[] };

// `locate` gives each stop's prefecture (the default) or, for US trips, its county and state.
type Locate = (lat: number, lng: number) => { area: string; state?: string } | undefined;
const byPrefecture: Locate = (lat, lng) => ({ area: prefectureOf(lat, lng) });

export function placesFrom(entries: { id: string; data: any }[], locate: Locate = byPrefecture): Place[] {
  const byName = new Map<string, Place>();
  for (const e of entries) for (const s of e.data.stops) {
    if (skip.test(s.name)) continue;
    const name = tidy(s.name);
    const trip = { id: e.id, title: e.data.title, year: String(e.data.start?.getUTCFullYear() ?? '') };
    const at = byName.has(name) ? undefined : locate(s.lat, s.lng);
    const p = byName.get(name) ?? { name, lat: s.lat, lng: s.lng, prefecture: at?.area ?? '', state: at?.state, trips: [] };
    if (!p.trips.some((t) => t.id === e.id)) p.trips.push(trip);
    byName.set(name, p);
  }
  return [...byName.values()];
}

// Prefectures touched by each entry: its stops, plus the vertices of legs travelled at ground level
// (drives, buses, ferries, local trains, day trips). Shinkansen, limited express and flights only pass through.
const passThrough = new Set(['shinkansen', 'express', 'flight']);
export function prefecturesOf(data: any): Set<string> {
  const out = new Set<string>();
  for (const s of data.stops) out.add(prefectureOf(s.lat, s.lng));
  for (const l of data.legs) if (!passThrough.has(l.mode)) for (const [lat, lng] of l.coords) out.add(prefectureOf(lat, lng));
  return out;
}

// GeoJSON outlines for the named prefectures, with extra properties per prefecture.
export function prefectureShapes(props: Map<string, Record<string, unknown>>) {
  return {
    type: 'FeatureCollection',
    features: geo.features.filter((f: any) => props.has(f.properties.nam))
      .map((f: any) => ({ type: 'Feature', geometry: f.geometry, properties: { name: f.properties.nam, ...props.get(f.properties.nam) } })),
  };
}
