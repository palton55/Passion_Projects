// Travel regions shown as tiles on /travel/. Japan and Korea have their own pages;
// the rest use the shared page at /travel/<slug>/, listing entries whose `region` matches.
export interface Region {
  name: string;
  slug: string;
  region: string;      // value of the entries' `region` frontmatter
  href?: string;       // custom page, if any
  blurb: string;
}

export const regions: Region[] = [
  { name: 'Japan', slug: 'japan', region: 'Japan', href: '/japan/', blurb: 'Four trips, including the 2025 study abroad, with route maps and day-by-day timelines.' },
  { name: 'Korea', slug: 'korea', region: 'South Korea', href: '/korea/', blurb: 'A week in Seoul during the 2025 study abroad, including the DMZ and Waterbomb.' },
  { name: 'Hawaii', slug: 'hawaii', region: 'Hawaii', blurb: 'My home base during university, with diving trips and adventures around the islands.' },
  { name: 'Australia', slug: 'australia', region: 'Australia', blurb: 'Travels in Australia.' },
  { name: 'Singapore and Malaysia', slug: 'singapore-malaysia', region: 'Singapore and Malaysia', blurb: 'Travels in Singapore and Malaysia.' },
  { name: 'California', slug: 'california', region: 'California', blurb: 'Where I grew up, in Los Angeles, and the trips taken from there.' },
  { name: 'Arizona', slug: 'arizona', region: 'Arizona', blurb: 'Travels and road trips through Arizona.' },
];
