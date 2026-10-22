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
    blurb: 'The first visit to Japan, made over freshman spring break with friends and a year of Japanese study. Nine days by rail from Tokyo to Osaka and Kyoto, then north on the Thunderbird to Tsuruga on the Sea of Japan coast for a homestay, with a day of skiing at Okuibuki in Shiga before the return to Tokyo.',
  },
  {
    collection: 'Japan 2024',
    page: '2024',
    label: '2024',
    title: 'Japan 2024: Return to Tokyo',
    dates: 'May 11 to 19, 2024',
    blurb: 'A return to Japan after sophomore finals, again with friends. Nine days based in Tokyo, from Shinjuku and Shibuya to Tokyo Tower and Zojoji Temple, with a day trip to Fujiyoshida for the view of Mt. Fuji from the Chureito Pagoda and Lake Kawaguchiko.',
  },
  {
    collection: 'Study Abroad 2025',
    page: '2025',
    label: '2025',
    title: 'Study Abroad 2025',
    dates: 'March 20 to August 24, 2025',
    blurb: 'Six months as an exchange student at Hitotsubashi University, living in Kodaira in western Tokyo. Between classes the semester became a base for travel: a road trip across West Japan, the Northern Alps by rail, Kansai and Okinawa, a week in Korea, a run north to Cape Soya, the Yaeyama Islands, and fourteen day trips across Kanto.',
    subtopics: [
      { collection: 'Life in Tokyo', title: 'Life in Tokyo', blurb: 'Campus life at Hitotsubashi and the everyday routine around Kodaira, Kokubunji, and Kunitachi, with regular trips into central Tokyo.' },
      { collection: 'Shimanami Kaido and West Japan Road Trip', title: 'Shimanami Kaido and West Japan Road Trip', dates: 'March 20 to 25, 2025', blurb: 'The Shinkansen to Osaka and the Shimanami Kaido across the islands of the Seto Inland Sea, then a three-day drive back to Tokyo through Kurashiki, Himeji, Arima Onsen, Nara, and Hakone.' },
      { collection: 'Hakone and Mt. Fuji', title: 'Hakone and Mt. Fuji', dates: 'April 7 to 9, 2025', blurb: 'A weekend around Hakone and Mt. Fuji with two nights in Manazuru: Lake Ashi, Fuji-Q Highland, and the Gotemba outlets.' },
      { collection: 'Tateyama Kurobe Alpine Route', title: 'Tateyama Kurobe Alpine Route', dates: 'April 25 to 27, 2025', blurb: 'A rail journey through the Northern Alps: the Azusa to Shinano-Omachi, the Alpine Route past Kurobe Dam and the snow walls at Murodo, and the Hokuriku Shinkansen back from Toyama.' },
      { collection: 'Kyoto, Osaka and Okinawa', title: 'Kyoto, Osaka, and Okinawa', dates: 'June 15 to 24, 2025', blurb: 'Kyoto and Osaka by Shinkansen, including Universal Studios Japan and Expo 2025, followed by a flight to Okinawa and a drive the length of the island to Cape Hedo.' },
      { collection: 'Korea and Waterbomb', title: 'Korea and Waterbomb', dates: 'July 2 to 9, 2025', blurb: 'A week in Seoul from Tokyo, with its palaces and neighbourhoods, a tour of the DMZ, and the Waterbomb festival.', section: { href: '/korea/', label: 'View the Korea section' } },
      { collection: 'Tohoku and Hokkaido', title: 'Tohoku and Hokkaido', dates: 'August 3 to 8, 2025', blurb: 'North by Shinkansen through Yamagata and Sendai, a single-day drive from Sapporo to Cape Soya and back, and the Hokuto limited express to Hakodate.' },
      { collection: 'Kusatsu Onsen', title: 'Kusatsu Onsen', dates: 'August 17 to 18, 2025', blurb: 'An overnight visit by bus to the hot spring town of Kusatsu in Gunma and its steaming Yubatake.' },
      { collection: 'Ishigaki and Taketomi', title: 'Ishigaki and Taketomi', dates: 'August 19 to 24, 2025', blurb: 'The final trip of the semester, to the Yaeyama Islands by air and sea: Ishigaki, boat trips over the reefs, and the village of Taketomi.' },
      { collection: 'Kanto Day Trips', title: 'Kanto Day Trips', dates: 'April to August 2025', blurb: 'Fourteen day trips from Kodaira across Kanto and the Izu Peninsula, from the Railway Museum and Mt. Takao to Enoshima, Atami, and the Boso Peninsula.' },
    ],
  },
  {
    collection: 'Japan 2026',
    page: '2026',
    label: '2026',
    title: 'Japan 2026',
    dates: 'March 6 to 24, 2026',
    blurb: 'A return to Japan in March 2026, part of it with family: Kanazawa, the Fuji Five Lakes, a week in Tokyo, and a winter road trip around Hokkaido to the drift ice, Cape Soya, and Upopoy.',
  },
];

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// The topic a sub-trip belongs to, for linking an entry back to its parent section.
export const parentOf = (collection?: string) =>
  japanTopics.find((t) => t.subtopics?.some((s) => s.collection === collection));
