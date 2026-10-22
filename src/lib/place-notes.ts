// Joins the place notes in src/data/places.ts to the visible entries whose stops include them,
// and resolves their photos (with captions) from src/data/photos.json.
import { placeNotes, type PlaceNote } from '../data/places';
import photoData from '../data/photos.json';
import { tidy } from './places';

type Photo = { src: string; caption?: string };
export type PlacePage = PlaceNote & { trips: { id: string; title: string; year: string }[]; pics: Photo[] };

// Looked up by path rather than entry id, since a photo folder can be shared by several entries.
const bySrc = new Map(Object.values(photoData as Record<string, Photo[]>).flat().map((p) => [p.src, p]));
const photo = (ref: string): Photo => bySrc.get(`photos/${ref}`) ?? { src: `photos/${ref}` };

// Only places on a visible trip are listed, so draft trips stay off the main site.
export function placePages(entries: { id: string; data: any }[]): PlacePage[] {
  return placeNotes.map((n) => ({
    ...n,
    trips: entries.filter((e) => e.data.stops.some((s: { name: string }) => n.match.includes(tidy(s.name))))
      .map((e) => ({ id: e.id, title: e.data.title, year: String(e.data.start?.getUTCFullYear() ?? '') })),
    pics: n.photos.map(photo),
  })).filter((p) => p.trips.length);
}
