// Drafts show in local dev and in the alpha build (PUBLIC_SHOW_DRAFTS=true), never on the main site.
export const isAlpha = import.meta.env.PUBLIC_SHOW_DRAFTS === 'true';
export const showDrafts = import.meta.env.DEV || isAlpha;
