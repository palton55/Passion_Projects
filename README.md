# Sidequests

A curated record of my adventures and sidequests, built with [Astro](https://astro.build) and hosted on GitHub Pages.

## Adding an adventure

1. Put photos in `public/photos/<adventure-id>/`.
2. Copy `src/content/adventures/japan-2023.md` to `src/content/adventures/<adventure-id>.md` and fill in the frontmatter:
   - `stops`: the road map, in order. `mode` is how you got to that stop (`drive`, `train`, `flight`, `walk`). Drives draw as solid lines, trains as dashed.
   - `photos`: `{ src: photos/<adventure-id>/file.jpg, caption: ... }`
   - `video`: a YouTube link, when there is one.
   - `draft: false` when it's ready to go live.
3. Write the story below the `---`.
4. Push to `main`. The site rebuilds automatically.

Prefectures visited live in `src/data/visited.ts`.

## Running locally

```
npm install
npm run dev
```
Drafts show up locally but not on the live site.
