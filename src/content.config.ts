import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const adventures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/adventures' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // What kind of sidequest this is, e.g. "Travel", "Scuba Diving", "Brazilian Jiu-Jitsu". Groups the Sidequests page.
    category: z.string().default('Travel'),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    region: z.string().optional(),    // where it happened, e.g. "Japan", "Hawaii", "Korea"
    collection: z.string().optional(), // e.g. "Japan 2025 study abroad"
    companions: z.array(z.string()).default([]),
    cover: z.string().optional(),      // path under /public, e.g. "photos/japan-2023/cover.jpg"
    photos: z.array(z.object({ src: z.string(), caption: z.string().optional() })).default([]),
    video: z.string().optional(),      // YouTube URL, added in phase 2
    draft: z.boolean().default(false),
    // Road map: stops in order. mode = how you got to this stop from the previous one.
    stops: z.array(z.object({
      name: z.string(),
      lat: z.number(),
      lng: z.number(),
      date: z.string().optional(),
      note: z.string().optional(),
      mode: z.enum(['drive', 'train', 'shinkansen', 'express', 'local', 'daytrip', 'bus', 'ferry', 'flight', 'walk', 'other']).default('other'),
    })).default([]),
    // Optional real route lines (e.g. rail lines). When a leg covers a hop, the straight line for it is skipped.
    legs: z.array(z.object({
      name: z.string(),
      day: z.number().optional(),
      mode: z.enum(['drive', 'train', 'shinkansen', 'express', 'local', 'daytrip', 'bus', 'ferry', 'flight', 'walk', 'other']),
      coords: z.array(z.tuple([z.number(), z.number()])), // [lat, lng]
    })).default([]),
    // Roads to call out on the map (e.g. a route driven end to end), drawn as wide translucent bands under the route.
    bands: z.array(z.object({
      name: z.string(),
      color: z.string(),
      coords: z.array(z.tuple([z.number(), z.number()])), // [lat, lng]
    })).default([]),
    // Optional points shown as a switchable map layer (e.g. manhole covers), off by default.
    pois: z.array(z.object({
      layer: z.string(),
      name: z.string(),
      lat: z.number(),
      lng: z.number(),
      day: z.number().optional(),
      date: z.string().optional(),
      note: z.string().optional(),
      highlight: z.boolean().optional(), // shown with a gold marker and a name label
    })).default([]),
    // Optional sections within one entry (e.g. a train journey and a road trip). Each gets its own map and timeline.
    parts: z.array(z.object({
      title: z.string(),
      blurb: z.string().optional(),
      days: z.array(z.number()),          // timeline day numbers in this part
      modes: z.array(z.string()).optional(), // leg modes on this part's map; without it, legs from `days` are drawn
      stops: z.array(z.string()),         // stop names shown on this part's map
      notes: z.array(z.object({ title: z.string(), text: z.array(z.string()) })).default([]), // short sections above the part's map
    })).default([]),
    // Day-by-day timeline. Each day lists events in order; `route` lines say how the day's travel was made.
    timeline: z.array(z.object({
      label: z.string(),
      date: z.coerce.date().optional(),
      title: z.string().optional(),
      events: z.array(z.object({ time: z.string().optional(), text: z.string() })).default([]),
      route: z.array(z.string()).default([]),
    })).default([]),
  }),
});

export const collections = { adventures };
