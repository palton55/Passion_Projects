import { defineConfig } from 'astro/config';

// When the repo is <username>.github.io, leave BASE unset.
// For any other repo name, set BASE to "/<repo-name>" (the deploy workflow does this automatically).
export default defineConfig({
  site: process.env.SITE ?? 'https://example.github.io',
  base: process.env.BASE ?? '/',
});
