// Headings on the Japan page. An entry appears under a topic when its
// `collection` frontmatter matches the topic's `collection`.
export interface JapanTopic {
  collection: string;
  // Page under /japan/<page>/ for top-level trips.
  page?: string;
  // Short label for the module tile.
  label?: string;
  title: string;
  dates?: string;
  blurb: string;
  // Topics with their own section elsewhere on the site link there instead of embedding the posting.
  section?: { href: string; label: string };
  subtopics?: JapanTopic[];
}

export const japanTopics: JapanTopic[] = [
  {
    collection: 'Japan 2023',
    page: '2023',
    label: '2023',
    title: 'Japan 2023: First Visit',
    dates: 'March 11 to 19, 2023',
    blurb: 'A spring break journey with friends from Tokyo to Osaka, Kyoto, and a homestay in Tsuruga, Fukui.',
  },
  {
    collection: 'Japan 2024',
    page: '2024',
    label: '2024',
    title: 'Japan 2024: Return to Tokyo',
    dates: 'May 11 to 19, 2024',
    blurb: 'A return after sophomore finals with friends, including a day trip to Mt. Fuji and Kawaguchiko.',
  },
  {
    collection: 'Study Abroad 2025',
    page: '2025',
    label: '2025',
    title: 'Study Abroad 2025',
    dates: 'March 20 to August 24, 2025',
    blurb: 'Six months living in Kodaira, Tokyo, as an exchange student at Hitotsubashi University, with road trips, train journeys, and travel across the country.',
    subtopics: [
      { collection: 'Life in Tokyo', title: 'Life in Tokyo', blurb: 'Campus life and the everyday routine around Kodaira, Kokubunji, Kunitachi, and central Tokyo.' },
      { collection: 'Shimanami Kaido and West Japan Road Trip', title: 'Shimanami Kaido and West Japan Road Trip', dates: 'March 20 to 25, 2025', blurb: 'The Shinkansen to Osaka and the Shimanami Kaido across the Seto Inland Sea, followed by a road trip back to Tokyo by way of Himeji, Nara, and Hakone.' },
      { collection: 'Hakone and Mt. Fuji', title: 'Hakone and Mt. Fuji', dates: 'April 7 to 9, 2025', blurb: 'A weekend around Hakone and Mt. Fuji with two nights in Manazuru.' },
      { collection: 'Tateyama Kurobe Alpine Route', title: 'Tateyama Kurobe Alpine Route', dates: 'April 25 to 27, 2025', blurb: 'A rail journey through the Northern Alps by the Azusa, the Alpine Route, and the Hokuriku Shinkansen.' },
      { collection: 'Kyoto, Osaka and Okinawa', title: 'Kyoto, Osaka, and Okinawa', dates: 'June 15 to 24, 2025', blurb: 'Kyoto and Osaka by Shinkansen, followed by a flight to Okinawa and a drive around the island.' },
      { collection: 'Korea and Waterbomb', title: 'Korea and Waterbomb', dates: 'July 2 to 9, 2025', blurb: 'A trip from Tokyo to Seoul, the DMZ, and the Waterbomb festival.', section: { href: '/korea/', label: 'View the Korea section' } },
      { collection: 'Tohoku and Hokkaido', title: 'Tohoku and Hokkaido', dates: 'August 3 to 8, 2025', blurb: 'North by Shinkansen, a round-trip drive from Sapporo to Cape Soya, and the Hokuto limited express to Hakodate.' },
      { collection: 'Kusatsu Onsen', title: 'Kusatsu Onsen', dates: 'August 17 to 18, 2025', blurb: 'An overnight visit to the hot spring town of Kusatsu in Gunma.' },
      { collection: 'Ishigaki and Taketomi', title: 'Ishigaki and Taketomi', dates: 'August 19 to 24, 2025', blurb: 'The final trip of the semester, to the Yaeyama Islands by air and sea.' },
      { collection: 'Kanto Day Trips', title: 'Kanto Day Trips', dates: 'April to August 2025', blurb: 'Fourteen day trips from Kodaira across the Kanto region.' },
    ],
  },
  {
    collection: 'Japan 2026',
    page: '2026',
    label: '2026',
    title: 'Japan 2026',
    dates: 'March 6 to 24, 2026',
    blurb: 'A return to Japan, part of it with family: Kanazawa, the Fuji Five Lakes, Tokyo, and a road trip around Hokkaido.',
  },
];

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// The topic a sub-trip belongs to, for linking an entry back to its parent section.
export const parentOf = (collection?: string) =>
  japanTopics.find((t) => t.subtopics?.some((s) => s.collection === collection));
