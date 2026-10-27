// Oahu is home base rather than a dated trip, so its page is a collection of favorites by kind.
// A section with `file` is read from a synced Google Maps list (src/data/gmaps/<file>.json, see scripts/sync_gmaps.mjs)
// and gets its own page at /hawaii/oahu/<slug>/. Sections without one show as coming soon.
import food from './gmaps/oahu-food.json';

export interface GmapsPlace { name: string; address: string; lat: number; lng: number; note: string; cid?: string }
export interface GmapsList { list: string; title: string; description: string; synced: string; places: GmapsPlace[] }

export interface OahuSection {
  slug: string;
  name: string;
  blurb: string;
  list?: GmapsList;
  url?: string;   // the shared Google Maps list
}

export const oahuSections: OahuSection[] = [
  { slug: 'food', name: 'Food', blurb: 'My go-to spots for food around the island, from plate lunch and poke to ramen, bakeries, and shave ice.', list: food as GmapsList, url: 'https://maps.app.goo.gl/EUcGBTQ1gqbKp3Nf8' },
  { slug: 'beaches', name: 'Beaches', blurb: 'The beaches I keep going back to.' },
  { slug: 'hikes', name: 'Hikes', blurb: 'Trails and lookouts worth the climb.' },
  { slug: 'places', name: 'Places', blurb: 'Cool spots around the island.' },
  { slug: 'day-trips', name: 'Day Trips', blurb: 'Drives and full days out around the island.' },
];

// Parts of the island, for grouping places. Each place goes to the nearest center.
const areas: [string, number, number][] = [
  ['Waikiki', 21.278, -157.826],
  ['Moiliili and McCully', 21.292, -157.826],
  ['Kapahulu and Kaimuki', 21.283, -157.806],
  ['Manoa', 21.309, -157.81],
  ['Ala Moana and Kakaako', 21.296, -157.85],
  ['Downtown and Chinatown', 21.311, -157.861],
  ['Kalihi, Liliha, and the Airport', 21.33, -157.875],
  ['Kahala', 21.277, -157.782],
  ['Hawaii Kai', 21.281, -157.708],
  ['Aiea and Pearl City', 21.385, -157.945],
  ['Ewa and Waipahu', 21.33, -158.04],
  ['Central Oahu', 21.49, -158.03],
  ['Kailua and Kaneohe', 21.405, -157.775],
  ['North Shore', 21.6, -158.08],
  ['Laie and Kahuku', 21.675, -157.95],
];
export const areaNames = areas.map((a) => a[0]);
export function areaOf(lat: number, lng: number): string {
  const d = ([, a, b]: [string, number, number]) => (a - lat) ** 2 + ((b - lng) * Math.cos(lat * Math.PI / 180)) ** 2;
  return areas.reduce((best, a) => (d(a) < d(best) ? a : best))[0];
}
// Names Google returns in another language for a place.
const names: Record<string, string> = { 'サイド ストリート イン カパフル': 'Side Street Inn Kapahulu' };
export const placeName = (p: GmapsPlace) => names[p.name] ?? p.name;
export function mapsLink(p: GmapsPlace): string {
  return p.cid ? `https://maps.google.com/?cid=${p.cid}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${placeName(p)}, Oahu, HI`)}`;
}
