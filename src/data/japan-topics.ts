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
  // A short stop in the timeline with no entry of its own (no "coming soon" note).
  brief?: boolean;
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
    blurb: 'My first trip to Japan, over freshman spring break with a friend and one year of Japanese under my belt. Nine days by train from Tokyo to Osaka and Kyoto, then up on the Thunderbird to Tsuruga on the Sea of Japan coast for a homestay, with a day of skiing at Okuibuki in Shiga before heading back to Tokyo.',
  },
  {
    collection: 'Japan 2024',
    page: '2024',
    label: '2024',
    title: 'Japan 2024: Return to Tokyo',
    dates: 'May 11 to 19, 2024',
    blurb: 'Back to Japan after sophomore finals, again with friends. I spent nine days based in Tokyo, from Shinjuku and Shibuya to Tokyo Tower and Zojoji Temple, with a day trip to Fujiyoshida for the view of Mt. Fuji from the Chureito Pagoda and Lake Kawaguchiko.',
  },
  {
    collection: 'Study Abroad 2025',
    page: '2025',
    label: '2025',
    title: 'Study Abroad 2025',
    dates: 'March 20 to August 24, 2025',
    blurb: 'Six months as an exchange student at Hitotsubashi University, living in Kodaira in western Tokyo. Between classes I used the semester as a home base for travel: a road trip across West Japan, the Northern Alps by train, Kansai and Okinawa, a week in Korea, a run up to Cape Soya, the Yaeyama Islands, and fourteen day trips around Kanto.',
    subtopics: [
      { collection: 'Life in Tokyo', title: 'Life in Tokyo', blurb: 'Campus life at Hitotsubashi University and my everyday routine around Kodaira, Kokubunji, and Kunitachi in western Tokyo. On days without a trip, I was usually heading into Tachikawa, Shinjuku, or Shibuya, and this was my home base for the whole semester.' },
      { collection: 'Shimanami Kaido and West Japan Road Trip', title: 'Shimanami Kaido and West Japan Road Trip', dates: 'March 20 to 25, 2025', blurb: 'My first week in Japan: the Shinkansen to Osaka and the Shimanami Kaido across the islands of the Seto Inland Sea. From Okayama, I drove three days back to Tokyo through Kurashiki, Himeji, Arima Onsen, Nara, and Hakone.' },
      { collection: 'Hakone and Mt. Fuji', title: 'Hakone and Mt. Fuji', dates: 'April 7 to 9, 2025', blurb: 'A three-day weekend with two nights in Manazuru on Sagami Bay. I spent the first day at Lake Ashi in Hakone, the second at Fuji-Q Highland at the foot of Mt. Fuji, and the last at the Gotemba Premium Outlets.' },
      { collection: 'Tateyama Kurobe Alpine Route', title: 'Tateyama Kurobe Alpine Route', dates: 'April 25 to 27, 2025', blurb: 'A train trip through the Northern Alps, starting with the Azusa limited express to Shinano-Omachi. From there the Alpine Route took me past Kurobe Dam to the snow walls at Murodo, and I rode the Hokuriku Shinkansen back from Toyama.' },
      { collection: 'Kyoto, Osaka and Okinawa', title: 'Kyoto, Osaka, and Okinawa', dates: 'June 15 to 24, 2025', blurb: 'Kyoto and Osaka by Shinkansen, with Fushimi Inari, Universal Studios Japan, and Expo 2025. Then I flew to Okinawa and drove up the length of the island to Cape Hedo at its northern tip.' },
      { collection: 'Korea and Waterbomb', title: 'Korea and Waterbomb', dates: 'July 2 to 9, 2025', blurb: 'Eight days in Seoul, flying over from Narita in the middle of the semester. I toured the DMZ, wore hanbok to Gyeongbokgung Palace, explored Gangnam and Hongdae, and spent a day at the Waterbomb music festival in Goyang.', section: { href: '/korea/', label: 'View the Korea section' } },
      { collection: 'Tohoku and Hokkaido', title: 'Tohoku and Hokkaido', dates: 'August 3 to 8, 2025', blurb: 'North by Shinkansen through Yamagata, Sendai, and Morioka to Sapporo, ending with two nights in Hakodate. In between, I drove from Sapporo up the Oronron Line to Cape Soya, the northernmost point of Japan, and back in a single day.' },
      { collection: 'Kusatsu Onsen', title: 'Kusatsu Onsen', dates: 'August 17 to 18, 2025', blurb: 'A one-night trip by highway bus to Kusatsu Onsen, one of the best-known hot spring towns in Japan, in the mountains of Gunma. Most of my time there was spent around the steaming Yubatake at the center of town, with a stop near Yanba Dam in Naganohara.' },
      { collection: 'Ishigaki and Taketomi', title: 'Ishigaki and Taketomi', dates: 'August 19 to 24, 2025', blurb: 'My last trip of the semester, out to the Yaeyama Islands for five nights. From Ishigaki, I took boat trips toward Taketomi, Kohama, and Kuroshima, drove the west coast to Cape Ogan, and spent a day in the village of Taketomi.' },
      { collection: 'Kanto Day Trips', title: 'Kanto Day Trips', dates: 'April to August 2025', blurb: 'Fourteen day trips from Kodaira around Kanto and the Izu Peninsula between April and August, by train, bus, and car. They ranged from the Railway Museum and Mt. Takao to Enoshima, Atami, and the Boso Peninsula.' },
    ],
  },
  {
    collection: 'Japan 2026',
    page: '2026',
    label: '2026',
    title: 'Japan 2026',
    dates: 'March 6 to 24, 2026',
    blurb: 'Back in Japan in March 2026, part of the time with my family: Kanazawa, the Fuji Five Lakes, a week in Tokyo, and a winter road trip around Hokkaido to the drift ice, Cape Soya, and Upopoy.',
    subtopics: [
      { collection: 'Arriving in Tokyo', title: 'Tokyo', dates: 'March 6, 2026', blurb: 'Landing at Narita in the afternoon and heading into Shinjuku for the first night. It was a quick stop, since the next morning I was on the Hokuriku Shinkansen out of Tokyo Station to Kanazawa.', brief: true },
      { collection: 'Kanazawa', title: 'Kanazawa', dates: 'March 7 to 8, 2026', blurb: 'The Hokuriku Shinkansen to Kanazawa for the Tsuzumi Gate, the Asanogawa River, and the lantern-lit lanes of the Higashi Chaya district. The next morning I rode back to Tokyo along the Japan Sea coast past Toyama and Itoigawa.' },
      { collection: 'Mt. Fuji', title: 'Mt. Fuji', dates: 'March 9 to 10, 2026', blurb: 'A two-day drive from Yokohama by way of the Gotemba outlets to a night at a ryokan on Lake Yamanakako. The next day took in the Chureito Pagoda, Lake Kawaguchiko, and Fuji-Q Highland before I dropped the car off in Shinjuku.' },
      { collection: 'Tokyo Days', title: 'Tokyo', dates: 'March 11 to 17, 2026', blurb: 'A week around Tokyo from the Machida and Sagamihara side, including a visit back to Hitotsubashi. I spent days in Shibuya, Setagaya, Ikebukuro, and Tachikawa, then flew north from Haneda to start the Hokkaido road trip.' },
      { collection: 'Hokkaido Road Trip', title: 'Hokkaido Road Trip', dates: 'March 18 to 24, 2026', blurb: 'Four days of winter driving from New Chitose to Abashiri, the drift ice at Monbetsu, Cape Soya, Biei, Furano, and Upopoy, planned around the Pokémon manhole covers. After returning the car, I had a day in Sapporo before flying home through Tokyo.' },
    ],
  },
];

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// The topic a sub-trip belongs to, for linking an entry back to its parent section.
export const parentOf = (collection?: string) =>
  japanTopics.find((t) => t.subtopics?.some((s) => s.collection === collection));
