// Travel regions shown as tiles on /travel/. Japan and Korea have their own pages;
// the rest use the shared page at /travel/<slug>/, listing entries whose `region` matches.
export interface Region {
  name: string;
  slug: string;
  region: string | string[];  // value(s) of the entries' `region` frontmatter
  href?: string;       // custom page, if any
  blurb: string;
}

export const regions: Region[] = [
  { name: 'Japan', slug: 'japan', region: 'Japan', href: '/japan/', blurb: 'Four trips, including the 2025 study abroad, with route maps and day-by-day timelines.' },
  { name: 'Hawaii', slug: 'hawaii', region: 'Hawaii', blurb: 'My home base during university, with diving trips and adventures around the islands.' },
  { name: 'California', slug: 'california', region: 'California', blurb: 'Where I grew up, in Los Angeles, and the trips taken from there.' },
  { name: 'Arizona', slug: 'arizona', region: 'Arizona', blurb: 'An eleven-day road trip from Los Angeles in 2026, through Phoenix and Tucson to Sedona and the Grand Canyon.' },
  { name: 'Korea', slug: 'korea', region: 'South Korea', href: '/korea/', blurb: 'A week in Seoul during the 2025 study abroad, including the DMZ and Waterbomb.' },
  { name: 'Oceania', slug: 'oceania', region: ['Australia', 'Singapore', 'Malaysia', 'Singapore and Malaysia'], blurb: 'Travels in Australia, Singapore and Malaysia.' },
];
