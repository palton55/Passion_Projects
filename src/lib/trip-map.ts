import { getCollection } from 'astro:content';
import { showDrafts } from './drafts';
import { regions } from '../data/regions';

// Every travel entry's stops and routes, tagged with its destination, for the combined trip maps. Flights are left out.
export async function tripMap() {
  const travel = (await getCollection('adventures', ({ data }) => data.category === 'Travel' && (!data.draft || showDrafts)))
    .sort((a, b) => (b.data.start?.valueOf() ?? 0) - (a.data.start?.valueOf() ?? 0));
  const mapped = travel.filter((e) => e.data.stops.length);
  const areaOf = (e: (typeof travel)[number]) => regions.find((r) => [r.region].flat().includes(e.data.region ?? ''))?.name ?? (e.data.region ?? 'Other');
  const legs = mapped.flatMap((e) => e.data.legs.filter((l) => l.mode !== 'flight').map((l) => ({ ...l, name: `${e.data.title}: ${l.name}`, groups: [areaOf(e)] })));
  const stops = mapped.flatMap((e) => e.data.stops.map((s) => ({ ...s, date: e.data.title, groups: [areaOf(e)] })));
  return { travel, legs, stops, areas: [...new Set(mapped.map(areaOf))] };
}
