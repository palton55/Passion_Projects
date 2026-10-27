// Shared by RouteMap (in the browser) and scripts/snap_roads.mjs (at build time): the OSRM query for a drive leg's
// waypoints, and a short file name for it. The build saves each snapped road as roads/<key>.json.
export function roadQuery(coords: [number, number][]): string | null {
  const pts = coords.filter((c, i) => i === 0 || Math.abs(c[0] - coords[i - 1][0]) + Math.abs(c[1] - coords[i - 1][1]) > 0.002);
  if (pts.length < 2) return null;
  return pts.map(([lat, lng]) => `${lng.toFixed(5)},${lat.toFixed(5)}`).join(';');
}

// FNV-1a, 32-bit, plus the query length: plenty to tell a few hundred legs apart.
export function roadKey(q: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < q.length; i++) h = Math.imul(h ^ q.charCodeAt(i), 0x01000193) >>> 0;
  return `${h.toString(36)}-${q.length.toString(36)}`;
}
