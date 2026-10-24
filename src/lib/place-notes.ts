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
// Photos of people (Patrick in a yukata, group shots) stay in their trip galleries only.
const personal = /yukata|^At /i;

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
