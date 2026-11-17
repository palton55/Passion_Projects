// Joins the place notes in src/data/places.ts to the visible entries whose stops include them,
// and resolves their photos (with captions) from src/data/photos.json.
import { placeNotes, type PlaceNote } from '../data/places';
import photoData from '../data/photos.json';
import { tidy } from './places';

type Photo = { src: string; caption?: string };
export type PlacePage = PlaceNote & { trips: { id: string; title: string; year: string }[]; pics: Photo[] };

// Looked up by path rather than entry id, since a photo folder can be shared by several entries.
const all = Object.values(photoData as Record<string, Photo[]>).flat();
const bySrc = new Map(all.map((p) => [p.src, p]));
const photo = (ref: string): Photo => bySrc.get(`photos/${ref}`) ?? { src: `photos/${ref}` };
// Photos of people (Patrick in a yukata, selfies, group shots) stay in their trip galleries only.
const personal = /yukata|^At |^Me /i;

// The hand-picked photos first, then every other gallery photo whose caption names the place.
function picsFor(n: PlaceNote): Photo[] {
  const picked = n.photos.map(photo);
  const words = (n.keywords ?? [n.name]).map((k) => k.toLowerCase());
  const more = all.filter((p) => p.caption && !personal.test(p.caption) && words.some((w) => p.caption!.toLowerCase().includes(w)));
  return [...new Map([...picked, ...more].map((p) => [p.src, p])).values()];
}

// Only places on a visible trip are listed, so draft trips stay off the main site.
export function placePages(entries: { id: string; data: any }[]): PlacePage[] {
  return placeNotes.map((n) => ({
    ...n,
    trips: entries.filter((e) => e.data.stops.some((s: { name: string }) => n.match.includes(tidy(s.name))))
      .map((e) => ({ id: e.id, title: e.data.title, year: String(e.data.start?.getUTCFullYear() ?? '') })),
    pics: picsFor(n),
  })).filter((p) => p.trips.length);
}

// "Places on this trip" for one entry, at most `max` of them, leaving out places the trip only starts
// or ends at (such as Tokyo on a trip out of Tokyo): those whose every stop sits at the start of the
// first leg or the end of the last one, unless the trip stayed there for several days. Places only seen
// from a train window don't count.
export function placesOnTrip(entry: { id: string; data: any }, max = 6): PlacePage[] {
  const { stops, legs } = entry.data as { stops: { name: string; lat: number; lng: number; date?: string }[]; legs: { coords: number[][] }[] };
  const ends = legs.length ? [legs[0].coords[0], legs.at(-1)!.coords.at(-1)!] : [];
  const atEnd = (s: { lat: number; lng: number }) => ends.some(([a, b]) => Math.abs(a - s.lat) < 0.05 && Math.abs(b - s.lng) < 0.05);
  const found = placePages([entry]);
  const days = (d = '') => (d.split(' · ')[0].match(/\d+(?:-\d+)?/g) ?? []).reduce((n, r) => { const [a, b = a] = r.split('-').map(Number); return n + b - a + 1; }, 0);
  const visited = (s: (typeof stops)[number]) => !/from the train/.test(s.date ?? '') && (!atEnd(s) || days(s.date) >= 3);
  const kept = found.filter((p) => stops.some((s) => p.match.includes(tidy(s.name)) && visited(s)));
  return (kept.length ? kept : found).slice(0, max);
}
