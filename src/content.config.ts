import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const adventures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/adventures' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    region: z.string(),               // e.g. "Japan", "Hawaii", "Korea"
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
      mode: z.enum(['drive', 'train', 'shinkansen', 'express', 'local', 'flight', 'walk', 'other']).default('other'),
    })).default([]),
    // Optional real route lines (e.g. rail lines). When a leg covers a hop, the straight line for it is skipped.
    legs: z.array(z.object({
      name: z.string(),
      mode: z.enum(['drive', 'train', 'shinkansen', 'express', 'local', 'flight', 'walk', 'other']),
      coords: z.array(z.tuple([z.number(), z.number()])), // [lat, lng]
    })).default([]),
  }),
});

export const collections = { adventures };
