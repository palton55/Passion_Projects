// Encyclopedia-style entries for the main places visited that have photos.
// `match` lists the place names from the route stops (as tidied in lib/places.ts) that belong to this place,
// so the Cities and Towns list and each trip can link here. `photos` are "<entry id>/<file>" from src/data/photos.json.
export interface PlaceNote {
  slug: string;
  name: string;
  country: 'Japan' | 'South Korea' | 'United States';
  area: string; // prefecture, province/city in Korea, or "<county>, <state>" in the US
  match: string[];
  // Caption words that pull more gallery photos onto the page; defaults to the place name.
  keywords?: string[];
  text: string[];
  // My own account of the place, in first person, shown under its own heading after the overview.
  story?: { title: string; text: string[] };
  photos: string[];
}

export const placeNotes: PlaceNote[] = [
  // Hokkaido
  {
    slug: 'sapporo', name: 'Sapporo', country: 'Japan', area: 'Hokkaido', match: ['Sapporo'],
    keywords: ['Sapporo', 'Susukino', 'Odori'],
    text: [
      'Sapporo is the capital of Hokkaido and the fifth-largest city in Japan, with a population of nearly two million. It was laid out on a grid from 1869 as the administrative center for the settlement of Hokkaido, and its streets are still numbered by block from the city center.',
      'The city hosted the 1972 Winter Olympics, the first held in Asia. Odori Park, the long green strip at its center, holds the Sapporo Snow Festival each February, with the Sapporo TV Tower at its eastern end; Susukino to the south is the largest entertainment district north of Tokyo. Sapporo Beer, founded in 1876, is the oldest beer brand in Japan.',
    ],
    photos: ['japan-2026/17.jpg', 'japan-2026/18.jpg'],
  },
  {
    slug: 'hakodate', name: 'Hakodate', country: 'Japan', area: 'Hokkaido', match: ['Hakodate', 'Shin-Hakodate-Hokuto'],
    keywords: ['Hakodate', 'Goryokaku'],
    text: [
      'Hakodate is a port city at the southern tip of Hokkaido, facing the Tsugaru Strait. It was among the first Japanese ports opened to foreign trade in 1859, and its Motomachi slopes still carry churches and consulates from that period.',
      'Goryokaku, a star-shaped Western-style fort completed in 1866, was the stronghold of the short-lived Republic of Ezo and the site of the final battle of the Boshin War in 1869. The view of the city from Mt. Hakodate at night is counted among the finest in Japan. The Hokkaido Shinkansen has reached nearby Shin-Hakodate-Hokuto since 2016.',
    ],
    photos: ['2025-tohoku-hokkaido/11.jpg', '2025-tohoku-hokkaido/12.jpg', '2025-tohoku-hokkaido/15.jpg'],
  },
  {
    slug: 'onuma-park', name: 'Onuma Park', country: 'Japan', area: 'Hokkaido', match: ['Hakodate / Onuma'],
    keywords: ['Onuma', 'Nanae'],
    text: [
      'Onuma Quasi-National Park lies in Nanae, about 20 kilometers north of Hakodate. Its three lakes, Onuma, Konuma, and Junsainuma, are scattered with small wooded islands joined by footbridges.',
      'The lakes were formed by eruptions of Hokkaido Komagatake, the active volcano that rises over the water to the north. The park is reached in about twenty minutes on the Hakodate Main Line.',
    ],
    photos: ['2025-tohoku-hokkaido/13.jpg', '2025-tohoku-hokkaido/14.jpg'],
  },
  {
    slug: 'cape-soya', name: 'Cape Soya', country: 'Japan', area: 'Hokkaido', match: ['Cape Soya', 'Wakkanai / Cape Soya'],
    keywords: ['Cape Soya', 'Soya coast'],
    text: [
      'Cape Soya, at 45°31′ north, is the northernmost point of Japan that can be freely visited. A triangular monument marks the spot on the shore of the Soya Strait, known internationally as the La Pérouse Strait.',
      'On clear days the island of Sakhalin, in Russia, is visible about 43 kilometers across the water. The cape was reached twice on these trips: by car from Sapporo in the summer of 2025, and again on the winter road trip of 2026.',
    ],
    photos: ['2025-tohoku-hokkaido/08.jpg', '2025-tohoku-hokkaido/09.jpg', 'japan-2026/10.jpg', 'japan-2026/11.jpg'],
  },
  {
    slug: 'wakkanai', name: 'Wakkanai', country: 'Japan', area: 'Hokkaido', match: ['Wakkanai'],
    keywords: ['Wakkanai'],
    text: [
      'Wakkanai is the northernmost city in Japan and the terminus of the JR Soya Main Line, whose station is the northernmost in the country. Ferries run from its port to the islands of Rishiri and Rebun.',
      'The city faces the Soya Strait and has long served as the gateway to Sakhalin; signs in the town are written in Russian as well as Japanese.',
    ],
    photos: ['2025-tohoku-hokkaido/07.jpg'],
  },
  {
    slug: 'oronron-line', name: 'Oronron Line', country: 'Japan', area: 'Hokkaido', match: ['Obira', 'Enbetsu'],
    keywords: ['Oronron', 'Horonobe'],
    text: [
      'The Oronron Line is the name given to the coastal road along the Sea of Japan in northwestern Hokkaido, running from the Rumoi area north to Wakkanai. It takes its name from the call of the common murre, a seabird that nests on Teuri Island offshore.',
      'The road passes through small fishing towns such as Obira and Enbetsu, and in its northern stretch runs past a long row of wind turbines with Rishiri Island rising from the sea to the west.',
    ],
    photos: ['2025-tohoku-hokkaido/05.jpg', '2025-tohoku-hokkaido/06.jpg'],
  },
  {
    slug: 'monbetsu', name: 'Monbetsu and the Okhotsk Coast', country: 'Japan', area: 'Hokkaido', match: ['Monbetsu', 'Abashiri'],
    keywords: ['Monbetsu', 'Saroma', 'Okhotsk coast'],
    text: [
      'The Okhotsk coast of Hokkaido is the southernmost place in the Northern Hemisphere where sea ice reaches the shore. Drift ice formed off the Amur River arrives from late January and lingers into March, and Lake Saroma, the largest lake in Hokkaido, freezes over behind its sandbar.',
      'Monbetsu is a port town on this coast, known for the icebreaker cruises that run into the ice each winter. The Okhotsk Tokkari Center cares for rescued seals ("tokkari" is the Ainu word for seal), and a giant crab claw monument stands on the waterfront.',
    ],
    story: {
      title: 'National Route 238, end to end',
      text: [
        "Day 14 was the day I drove all of National Route 238, the road that follows the Sea of Okhotsk for about 320 km from Abashiri to Wakkanai. I'd already been up to Wakkanai the summer before, so this time I wanted the whole northeast coast of Hokkaido in one go, in March, with the drift ice in.",
        "It starts right in Abashiri. I left the hotel a little after 8 a.m., and within half an hour the road was running between the sea and the lakes: Lake Abashiri, then Lake Notoro near Tokoro, then the long south shore of Lake Saroma, Hokkaido's largest lake, still frozen over and almost impossible to tell apart from the sea beyond it. After Yubetsu the road straightens out along the coast into Monbetsu.",
        "Monbetsu was the main stop. The drift ice was packed in against the harbor, and I spent most of the morning at Gomachan Land, the seal sanctuary on the waterfront, watching the keepers feed the rescued spotted seals. Just down the road is the giant crab claw sculpture that has become the town's landmark. I made one short loop inland from here to Engaru and Onneyu Onsen for their manhole covers, then picked Route 238 back up on the north side of town.",
        "North of Monbetsu the road empties out. Okoppe, Omu, Esashi, Hamatonbetsu and Sarufutsu are small fishing towns spaced far apart, and in between it is mostly long, straight road with snowbanks on one side and the ice-covered Sea of Okhotsk on the other. For long stretches the ice reached all the way out to the horizon. There's very little traffic, mostly trucks.",
        "The road reaches Cape Soya, the northernmost point of Japan, in the late afternoon. On a clear day you can see Sakhalin from the monument. Route 238 then bends west along the Soya coast, and that last stretch into Wakkanai was the best part of the drive, with the sun going down over the sea. The route ends in Wakkanai near the station, and from there I headed south for the night in Teshio.",
        "Route 238 is highlighted in teal on the Hokkaido Road Trip map.",
      ],
    },
    photos: ['japan-2026/06.jpg', 'japan-2026/07.jpg', 'japan-2026/08.jpg', 'japan-2026/09.jpg'],
  },
  {
    slug: 'biei', name: 'Biei', country: 'Japan', area: 'Hokkaido', match: ['Biei / Furano'],
    keywords: ['Biei'],
    text: [
      'Biei is a farming town in central Hokkaido known for its rolling patchwork of fields, which has made it one of the most photographed rural landscapes in Japan. Several of its lone trees have become landmarks in their own right.',
      'The Christmas Tree, a single spruce standing in an open field, is among the best known. The town lies between Asahikawa and Furano, at the foot of the Tokachi volcanic range.',
    ],
    photos: ['japan-2026/14.jpg'],
  },
  {
    slug: 'upopoy', name: 'Upopoy', country: 'Japan', area: 'Hokkaido', match: ['Shiraoi'],
    keywords: ['Upopoy'],
    text: [
      'Upopoy, the National Ainu Museum and Park, opened in 2020 on the shore of Lake Poroto in Shiraoi. It is the first national museum in Japan dedicated to the Ainu, the Indigenous people of Hokkaido, and its name means "singing in a large group" in the Ainu language.',
      'The site combines a museum of Ainu history and material culture with a reconstructed village where traditional dance, music, and crafts are performed and taught.',
    ],
    photos: ['japan-2026/15.jpg', 'japan-2026/16.jpg'],
  },
  // Tohoku
  {
    slug: 'sendai', name: 'Sendai', country: 'Japan', area: 'Miyagi', match: ['Sendai'],
    keywords: ['Sendai'],
    text: [
      'Sendai is the largest city in the Tohoku region and the capital of Miyagi Prefecture, with a population of about 1.1 million. It was founded in 1600 by the warlord Date Masamune and is known as the City of Trees for its tree-lined avenues.',
      'The city is famous for its Tanabata festival each August and for gyutan, grilled beef tongue.',
    ],
    photos: ['2025-tohoku-hokkaido/04.jpg'],
  },
  {
    slug: 'yamagata', name: 'Yamagata', country: 'Japan', area: 'Yamagata', match: ['Yamagata'],
    keywords: ['Yamagata'],
    text: [
      'Yamagata is the capital of Yamagata Prefecture, set in a basin ringed by mountains. It is served by the Yamagata Shinkansen, the first "mini-shinkansen" in Japan, which runs onto a converted conventional line from Fukushima.',
      'The prefecture grows the large majority of the cherries produced in Japan, and the nearby Zao mountains and the cliffside temple of Yamadera draw visitors throughout the year.',
    ],
    photos: ['2025-tohoku-hokkaido/02.jpg', '2025-tohoku-hokkaido/03.jpg'],
  },
  // Kanto
  {
    slug: 'tokyo', name: 'Tokyo', country: 'Japan', area: 'Tokyo',
    match: ['Tokyo', 'Shinjuku', 'Shibuya / Harajuku', 'Toyosu and Odaiba', 'Asakusa and Tokyo Skytree', 'Ebisu', 'Ikebukuro', 'Setagaya'],
    keywords: ['Tokyo', 'Shinjuku', 'Shibuya', 'Harajuku', 'Asakusa', 'Skytree', 'Meiji Jingu', 'Zojoji', 'Akihabara', 'Ikebukuro', 'Sunshine', 'Imperial Palace', 'Toyosu', 'Odaiba', 'Kabukicho', 'Ebisu', 'Yamanote', 'Oimachi'],
    text: [
      'Tokyo is the capital of Japan and the center of the most populous metropolitan area in the world, home to about 37 million people. Formerly known as Edo, it became the seat of the Tokugawa shogunate in 1603 and took its present name in 1868, when the emperor moved there from Kyoto.',
      'The city is made up of 23 special wards, each with its own character, from the skyscrapers of Shinjuku and the youth culture of Shibuya and Harajuku to the temples of Asakusa and the waterfront of Odaiba. Its landmarks include Tokyo Skytree, at 634 meters the tallest tower in the world, Tokyo Tower beside Zojoji Temple, and the forested grounds of Meiji Jingu. Beyond the wards, the Tama area to the west includes Kodaira, home during the 2025 study abroad.',
    ],
    photos: ['japan-2023/01.jpg', 'japan-2023/03.jpg', 'japan-2023/04.jpg', 'japan-2023/02.jpg', 'japan-2024/02.jpg', 'japan-2024/03.jpg', 'japan-2024/06.jpg', 'japan-2024/07.jpg', '2025-west-japan-road-trip/01.jpg', '2025-kanto-day-trips/06.jpg'],
  },
  {
    slug: 'mt-takao', name: 'Mt. Takao', country: 'Japan', area: 'Tokyo', match: ['Mt. Takao'],
    keywords: ['Takao'],
    text: [
      'Mt. Takao is a 599-meter mountain in Hachioji, on the western edge of Tokyo, and one of the most climbed mountains in the world. It is reached in under an hour by train from Shinjuku.',
      'Trails and a cable car lead to Yakuoin, a Buddhist temple founded in the eighth century, and on to the summit, which looks west to Mt. Fuji on clear days.',
    ],
    photos: ['2025-kanto-day-trips/05.jpg'],
  },
  {
    slug: 'yokohama', name: 'Yokohama', country: 'Japan', area: 'Kanagawa', match: ['Yokohama'],
    keywords: ['Yokohama'],
    text: [
      'Yokohama is the capital of Kanagawa Prefecture and, with about 3.7 million people, the second most populous city in Japan. A small fishing village until 1859, it grew rapidly after its port was opened to foreign trade.',
      'Its waterfront district of Minato Mirai, with its Ferris wheel and towers, sits beside the brick warehouses of the old port, and its Chinatown is the largest in Japan.',
    ],
    photos: ['2025-kanto-day-trips/03.jpg', '2025-kanto-day-trips/04.jpg'],
  },
  {
    slug: 'enoshima', name: 'Enoshima', country: 'Japan', area: 'Kanagawa', match: ['Enoshima'],
    keywords: ['Enoshima'],
    text: [
      'Enoshima is a small island in Sagami Bay off the coast of Fujisawa, joined to the mainland by a bridge. Its shrine is dedicated to Benzaiten, a goddess of music and fortune, and its lighthouse observation tower looks across the bay to Mt. Fuji.',
      'The island hosted the sailing events of both the 1964 and 2020 Tokyo Olympics.',
    ],
    photos: ['2025-kanto-day-trips/11.jpg'],
  },
  {
    slug: 'railway-museum', name: 'The Railway Museum, Omiya', country: 'Japan', area: 'Saitama', match: ['The Railway Museum, Omiya', 'Omiya'],
    keywords: ['Railway Museum', 'Omiya'],
    text: [
      'The Railway Museum, opened by JR East in 2007, is one of the largest railway museums in Japan, with full-size locomotives and Shinkansen cars spanning the history of Japanese rail.',
      'It stands in Omiya, in Saitama City, a major junction where the Shinkansen lines to Tohoku, Niigata, and Hokuriku all pass before reaching Tokyo.',
    ],
    photos: ['2025-kanto-day-trips/01.jpg', '2025-tohoku-hokkaido/01.jpg'],
  },
  {
    slug: 'chichibu', name: 'Chichibu', country: 'Japan', area: 'Saitama', match: ['Chichibu'],
    keywords: ['Chichibu'],
    text: [
      'Chichibu is a city in the mountains of western Saitama, reached by limited express from Ikebukuro. It is known for its shrines, its pilgrimage route of 34 temples, and the Chichibu Night Festival each December, one of the great float festivals of Japan.',
    ],
    photos: ['2025-kanto-day-trips/02.jpg'],
  },
  {
    slug: 'boso-peninsula', name: 'Boso Peninsula', country: 'Japan', area: 'Chiba', match: ['Boso Peninsula', 'Kisarazu'],
    keywords: ['Boso', 'Kisarazu'],
    text: [
      'The Boso Peninsula forms the eastern side of Tokyo Bay and covers most of Chiba Prefecture. It is linked to Kawasaki by the Tokyo Bay Aqua-Line, a bridge and undersea tunnel with the Umihotaru rest area on an artificial island at its midpoint.',
      'The peninsula is largely rural, with fishing ports, coastal roads, and hills that make it a common drive from Tokyo.',
    ],
    photos: ['2025-kanto-day-trips/08.jpg', '2025-kanto-day-trips/09.jpg', '2025-kanto-day-trips/10.jpg'],
  },
  {
    slug: 'hakone', name: 'Hakone', country: 'Japan', area: 'Kanagawa', match: ['Lake Ashi, Hakone', 'Hakone / Gotemba'],
    keywords: ['Hakone'],
    text: [
      'Hakone is a mountain resort town within Fuji-Hakone-Izu National Park, known for its hot springs and its views of Mt. Fuji. It was a checkpoint on the Tokaido, the main road between Edo and Kyoto.',
      'Lake Ashi, a crater lake at the heart of the area, is crossed by sightseeing boats styled as sailing ships, and the volcanic valley of Owakudani still steams above it.',
    ],
    photos: ['2025-hakone-fuji/01.jpg', '2025-hakone-fuji/02.jpg'],
  },
  {
    slug: 'atami', name: 'Atami', country: 'Japan', area: 'Shizuoka', match: ['Atami and Hatsushima'],
    keywords: ['Atami'],
    text: [
      'Atami is a hot spring resort city in Shizuoka, at the base of the Izu Peninsula on Sagami Bay. A popular getaway from Tokyo since the Edo period, it is less than an hour away by Shinkansen.',
      'Hatsushima, a small island about ten kilometers offshore, is reached by ferry from the Atami harbor.',
    ],
    photos: ['2025-kanto-day-trips/12.jpg', '2025-kanto-day-trips/13.jpg'],
  },
  {
    slug: 'kusatsu-onsen', name: 'Kusatsu Onsen', country: 'Japan', area: 'Gunma', match: ['Kusatsu Onsen'],
    keywords: ['Kusatsu', 'Yubatake'],
    text: [
      'Kusatsu Onsen is a hot spring town at about 1,200 meters in the mountains of Gunma, long ranked among the finest onsen in Japan. Its springs have the largest natural flow of any in the country, and their strongly acidic water has been prized for its healing properties for centuries.',
      'At the center of town is the Yubatake, or "hot water field", where the steaming spring water runs through wooden channels to cool before it is piped to the baths.',
    ],
    photos: ['2025-kusatsu-onsen/03.jpg', '2025-kusatsu-onsen/04.jpg', '2025-kusatsu-onsen/05.jpg'],
  },
  // Chubu
  {
    slug: 'mt-fuji', name: 'Mt. Fuji and the Fuji Five Lakes', country: 'Japan', area: 'Yamanashi',
    match: ['Fujiyoshida / Kawaguchiko', 'Lake Kawaguchiko', 'Chureito Pagoda', 'Fuji-Q Highland', 'Lake Yamanakako', 'Mt. Fuji / Lake Yamanakako'],
    keywords: ['Fuji', 'Kawaguchiko', 'Chureito', 'Yamanakako', 'Gotemba', 'Arakura', 'Oishi Park', 'Fujiyoshida'],
    text: [
      'Mt. Fuji, at 3,776 meters, is the highest mountain in Japan, an active stratovolcano that last erupted in 1707. It was inscribed as a UNESCO World Heritage Site in 2013 as a sacred place and a source of artistic inspiration.',
      'The Fuji Five Lakes lie along its northern foot in Yamanashi. Lake Kawaguchiko is the most visited, while the Chureito Pagoda above Fujiyoshida frames the mountain in one of the best-known views in Japan. Fuji-Q Highland, an amusement park known for its roller coasters, sits at the base of the mountain nearby.',
    ],
    photos: ['japan-2024/04.jpg', 'japan-2024/05.jpg', 'japan-2026/04.jpg', 'japan-2026/05.jpg', '2025-hakone-fuji/03.jpg'],
  },
  {
    slug: 'alpine-route', name: 'Tateyama Kurobe Alpine Route', country: 'Japan', area: 'Toyama and Nagano', match: ['Murodo / Kurobe Dam'],
    keywords: ['Murodo', 'Kurobe', 'Tateyama Ropeway', 'Ogizawa', 'Bijodaira', 'Kurobedaira', 'Northern Alps'],
    text: [
      'The Tateyama Kurobe Alpine Route crosses the Northern Alps between Tateyama in Toyama and Ogizawa in Nagano by a sequence of buses, cable cars, and a ropeway. It opened in full in 1971.',
      'Along the way it passes Kurobe Dam, at 186 meters the tallest dam in Japan, and reaches its highest point at Murodo, 2,450 meters above sea level. In spring the road there is cut through the snowpack, leaving the walls of the Yuki-no-Otani corridor standing up to twenty meters high.',
    ],
    photos: ['2025-alpine-route/02.jpg', '2025-alpine-route/03.jpg', '2025-alpine-route/04.jpg', '2025-alpine-route/05.jpg', '2025-alpine-route/06.jpg'],
  },
  {
    slug: 'toyama', name: 'Toyama', country: 'Japan', area: 'Toyama', match: ['Toyama'],
    keywords: ['Toyama'],
    text: [
      'Toyama is the capital of Toyama Prefecture, on Toyama Bay with the Tateyama range rising behind it. It has been on the Hokuriku Shinkansen since 2015 and is the western gateway to the Tateyama Kurobe Alpine Route.',
      'The bay is known for its seafood, particularly firefly squid and white shrimp.',
    ],
    photos: ['2025-alpine-route/11.jpg', '2025-alpine-route/12.jpg', '2025-alpine-route/13.jpg'],
  },
  {
    slug: 'amaharashi-coast', name: 'Amaharashi Coast', country: 'Japan', area: 'Toyama', match: ['Takaoka'],
    keywords: ['Amaharashi', 'Takaoka'],
    text: [
      'The Amaharashi Coast in Takaoka is one of the few places in the world where mountains of 3,000 meters can be seen rising directly across the sea. On clear days the Tateyama range stands over Toyama Bay, a view celebrated since the eighth-century poet Otomo no Yakamochi served as governor of the province.',
      'Takaoka itself is known for its copper casting and its Great Buddha.',
    ],
    photos: ['2025-alpine-route/07.jpg', '2025-alpine-route/08.jpg', '2025-alpine-route/09.jpg', '2025-alpine-route/10.jpg'],
  },
  {
    slug: 'kanazawa', name: 'Kanazawa', country: 'Japan', area: 'Ishikawa', match: ['Kanazawa'],
    keywords: ['Kanazawa'],
    text: [
      'Kanazawa is the capital of Ishikawa Prefecture and was the castle town of the Maeda clan, the wealthiest feudal lords of the Edo period after the Tokugawa. Spared from bombing in the Second World War, it retains its samurai and teahouse districts.',
      'Kenrokuen is counted among the three great gardens of Japan, and the Higashi Chaya district preserves its geisha teahouses along the Asano River. The city produces nearly all of the gold leaf made in Japan. Its station is fronted by the Tsuzumi Gate, a wooden gate modeled on a hand drum.',
    ],
    photos: ['japan-2026/01.jpg', 'japan-2026/02.jpg', 'japan-2026/03.jpg'],
  },
  {
    slug: 'tsuruga', name: 'Tsuruga', country: 'Japan', area: 'Fukui', match: ['Tsuruga'],
    keywords: ['Tsuruga'],
    text: [
      'Tsuruga is a port city on Tsuruga Bay, on the Sea of Japan coast of Fukui. For centuries it was a gateway to the Asian mainland, and in the twentieth century it received Polish orphans from Siberia and Jewish refugees traveling on visas issued by Chiune Sugihara.',
      'Kehi Jingu, the principal shrine of the old Echizen province, stands in the center of the city behind one of the largest wooden torii in Japan. The Hokuriku Shinkansen reached Tsuruga in 2024.',
    ],
    photos: ['japan-2023/09.jpg'],
  },
  {
    slug: 'shimanami-kaido', name: 'Shimanami Kaido', country: 'Japan', area: 'Hiroshima and Ehime', match: ['Shimanami Kaido', 'Imabari'],
    keywords: ['Shimanami', 'Setoda', 'Tatara', 'Seto Inland Sea'],
    text: [
      'The Shimanami Kaido is a road of about 60 kilometers that links Onomichi in Hiroshima with Imabari in Ehime by hopping across six islands of the Seto Inland Sea on a chain of bridges. Completed in 1999, it is the only one of the three bridge routes between Honshu and Shikoku with a dedicated path for cyclists and walkers, and it is known around the world as a cycling route.',
      'Along the way it crosses the Tatara Bridge, one of the longest cable-stayed bridges in the world when it opened, and passes Setoda on Ikuchijima, home to the colorful Kosanji Temple.',
    ],
    photos: ['2025-west-japan-road-trip/08.jpg', '2025-west-japan-road-trip/06.jpg', '2025-west-japan-road-trip/07.jpg', '2025-west-japan-road-trip/09.jpg'],
  },
  {
    slug: 'kurashiki', name: 'Kurashiki', country: 'Japan', area: 'Okayama', match: ['Okayama / Kurashiki', 'Okayama'],
    keywords: ['Kurashiki', 'Okayama', 'Kibitsu'],
    text: [
      'Kurashiki is a city in Okayama Prefecture whose Bikan Historical Quarter preserves the white-walled storehouses and willow-lined canal of an Edo-period merchant town, when rice and goods were shipped through it. The district is home to the Ohara Museum of Art, the first museum of Western art in Japan.',
      'Nearby Okayama is the prefectural capital, and Kibitsu Shrine on its outskirts is known for its long covered corridor and for its link to the legend of Momotaro, the Peach Boy.',
    ],
    photos: ['2025-west-japan-road-trip/13.jpg', '2025-west-japan-road-trip/14.jpg', '2025-west-japan-road-trip/12.jpg'],
  },
  {
    slug: 'himeji', name: 'Himeji Castle', country: 'Japan', area: 'Hyogo', match: ['Himeji'],
    keywords: ['Himeji'],
    text: [
      'Himeji Castle is the largest and best-preserved original castle in Japan, a complex of more than 80 buildings that has survived wars, earthquakes, and the bombing of the city in 1945. Its main keep dates from 1609.',
      'It is nicknamed the White Heron Castle for its white plastered walls, and in 1993 it became one of the first places in Japan inscribed as a UNESCO World Heritage Site.',
    ],
    photos: ['2025-west-japan-road-trip/15.jpg'],
  },
  {
    slug: 'arima-onsen', name: 'Arima Onsen', country: 'Japan', area: 'Hyogo', match: ['Arima Onsen'],
    keywords: ['Arima'],
    text: [
      'Arima Onsen is a hot spring town in the hills behind Kobe and one of the oldest onsen in Japan, mentioned in records from the eighth century. Toyotomi Hideyoshi was a regular visitor in the sixteenth century.',
      'The town is known for its two types of water: the iron-rich, rust-brown kinsen (gold spring) and the clear ginsen (silver spring).',
    ],
    photos: ['2025-west-japan-road-trip/16.jpg', '2025-west-japan-road-trip/17.jpg'],
  },
  // Kansai
  {
    slug: 'okuibuki', name: 'Okuibuki Ski Resort', country: 'Japan', area: 'Shiga', match: ['Okuibuki Ski Resort'],
    keywords: ['Okuibuki'],
    text: [
      'Okuibuki is one of the largest ski areas in the Kansai region, in the Ibuki Mountains of northern Shiga. The range is known for heavy snowfall: Mt. Ibuki, its highest peak, holds the record for the deepest snow ever measured, 11.82 meters in 1927.',
    ],
    photos: ['japan-2023/10.jpg'],
  },
  {
    slug: 'kyoto', name: 'Kyoto', country: 'Japan', area: 'Kyoto', match: ['Kyoto'],
    keywords: ['Kyoto', 'Fushimi Inari', 'Arashiyama', 'Kinkaku', 'Kiyomizu', 'Mt. Inari'],
    text: [
      'Kyoto was the imperial capital of Japan for more than a thousand years, from 794 until 1868. It holds around 1,600 temples and 400 shrines, and seventeen of its sites are inscribed together as a UNESCO World Heritage Site.',
      'Fushimi Inari Taisha, the head shrine of the god Inari, is known for the thousands of vermilion torii that line the paths up its mountain. Arashiyama, on the western edge of the city, is known for its bamboo grove and the Togetsukyo Bridge.',
    ],
    photos: ['2025-kyoto-osaka-okinawa/01.jpg', 'japan-2023/08.jpg'],
  },
  {
    slug: 'osaka', name: 'Osaka', country: 'Japan', area: 'Osaka', match: ['Osaka', 'Shin-Osaka'],
    keywords: ['Osaka', 'Shinsekai', 'Umeda', 'Universal Studios', 'Super Nintendo', 'Hogsmeade', 'Expo 2025', 'Kaiyukan'],
    text: [
      'Osaka is the third most populous city in Japan and the commercial center of the Kansai region. Historically a merchant city known as "the nation\'s kitchen", it remains known for its street food and nightlife.',
      'Osaka Castle was built by Toyotomi Hideyoshi from 1583; its present main tower dates from 1931. The Shinsekai district grew around the Tsutenkaku tower, and the bay area holds the Kaiyukan, one of the largest aquariums in the world, and Universal Studios Japan. In 2025 the artificial island of Yumeshima hosted Expo 2025, ringed by the Grand Ring, the largest wooden architectural structure in the world.',
    ],
    photos: ['japan-2023/05.jpg', 'japan-2023/06.jpg', 'japan-2023/07.jpg', '2025-kyoto-osaka-okinawa/02.jpg', '2025-kyoto-osaka-okinawa/03.jpg', '2025-kyoto-osaka-okinawa/04.jpg', '2025-kyoto-osaka-okinawa/05.jpg', '2025-kyoto-osaka-okinawa/06.jpg', '2025-kyoto-osaka-okinawa/07.jpg'],
  },
  {
    slug: 'nara', name: 'Nara', country: 'Japan', area: 'Nara', match: ['Nara'],
    keywords: ['Nara'],
    text: [
      'Nara was the capital of Japan from 710 to 784 and is home to some of the oldest temples in the country, inscribed as a UNESCO World Heritage Site in 1998. Todaiji houses one of the largest bronze statues of the Buddha in the world.',
      'More than a thousand sika deer roam freely through Nara Park, regarded in local tradition as messengers of the gods of Kasuga Taisha.',
    ],
    photos: ['2025-west-japan-road-trip/02.jpg'],
  },
  // Okinawa
  {
    slug: 'cape-maeda', name: 'Cape Maeda', country: 'Japan', area: 'Okinawa', match: ['Cape Maeda'],
    keywords: ['Cape Maeda'],
    text: [
      'Cape Maeda is a rocky headland in Onna on the west coast of Okinawa Island, known as one of the best snorkeling and diving spots on the island. Its Blue Cave glows with reflected light from the clear water below.',
    ],
    photos: ['2025-kyoto-osaka-okinawa/08.jpg'],
  },
  {
    slug: 'chatan', name: 'Chatan and American Village', country: 'Japan', area: 'Okinawa', match: ['Chatan / Kitanakagusuku'],
    keywords: ['Chatan', 'Rycom'],
    text: [
      'Chatan is a coastal town in central Okinawa, much of it built on land returned from the United States military. Its Mihama American Village is a seaside shopping and entertainment district built in an American style, beside Sunset Beach.',
      'Inland in neighboring Kitanakagusuku, Aeon Mall Okinawa Rycom, the largest shopping mall in the prefecture, opened in 2015 on a former military golf course.',
    ],
    photos: ['2025-kyoto-osaka-okinawa/12.jpg', '2025-kyoto-osaka-okinawa/11.jpg'],
  },
  {
    slug: 'sesoko', name: 'Sesoko Island', country: 'Japan', area: 'Okinawa', match: ['Sesoko Beach'],
    keywords: ['Sesoko', 'Motobu'],
    text: [
      'Sesoko is a small island off the Motobu Peninsula in northern Okinawa, joined to the mainland by the Sesoko Bridge. Sesoko Beach, on its western shore, is known for its clear water and for sunsets over the East China Sea.',
    ],
    photos: ['2025-kyoto-osaka-okinawa/14.jpg', '2025-kyoto-osaka-okinawa/15.jpg', '2025-kyoto-osaka-okinawa/10.jpg'],
  },
  {
    slug: 'cape-hedo', name: 'Cape Hedo', country: 'Japan', area: 'Okinawa', match: ['Cape Hedo'],
    keywords: ['Cape Hedo'],
    text: [
      'Cape Hedo is the northernmost point of Okinawa Island, in the forested Yanbaru region of Kunigami. A monument there commemorates the return of Okinawa to Japan in 1972, and on clear days Yoron Island in Kagoshima can be seen to the north.',
      'The surrounding Yanbaru forest became part of a UNESCO World Natural Heritage Site in 2021.',
    ],
    photos: ['2025-kyoto-osaka-okinawa/13.jpg'],
  },
  {
    slug: 'ishigaki', name: 'Ishigaki Island', country: 'Japan', area: 'Okinawa', match: ['Ishigaki town', 'Cape Ogan'],
    keywords: ['Ishigaki', 'Cape Ogan', 'Kohama'],
    text: [
      'Ishigaki is the main island of the Yaeyama Islands, about 400 kilometers southwest of Okinawa Island and closer to Taiwan than to Naha. Its coral reefs, home to manta rays, form part of Iriomote-Ishigaki National Park.',
      'The island is the transport hub of the Yaeyama group, with ferries from its port to Taketomi, Kohama, Kuroshima, and Iriomote. Cape Ogan, at the end of its western coast, is known for its sunsets.',
    ],
    photos: ['2025-ishigaki/01.jpg', '2025-ishigaki/02.jpg', '2025-ishigaki/03.jpg', '2025-ishigaki/04.jpg', '2025-ishigaki/05.jpg'],
  },
  {
    slug: 'taketomi', name: 'Taketomi Island', country: 'Japan', area: 'Okinawa', match: ['Taketomi Island'],
    keywords: ['Taketomi'],
    text: [
      'Taketomi is a small, flat island a short ferry ride from Ishigaki. Its village preserves the traditional Ryukyuan townscape of red-tiled roofs, coral stone walls, and white sand streets, and is protected as a preservation district for historic buildings.',
      'Water buffalo carts carry visitors through the lanes, and Kondoi Beach on the western shore is among the most celebrated in the Yaeyama Islands.',
    ],
    photos: ['2025-ishigaki/06.jpg', '2025-ishigaki/07.jpg', '2025-ishigaki/08.jpg', '2025-ishigaki/09.jpg'],
  },
  // Arizona, south to north
  {
    slug: 'tucson', name: 'Tucson', country: 'United States', area: 'Pima County, Arizona', match: ['Tucson'],
    keywords: ['Tucson', 'Sentinel Peak'],
    text: [
      'Tucson is the second-largest city in Arizona, set in the Sonoran Desert about 60 miles north of the Mexican border and ringed by five mountain ranges. Its history as a Spanish settlement goes back to 1775, when the Presidio San Agust\u00edn del Tucs\u00f3n was built on the Santa Cruz River, and the city is home to the University of Arizona, founded in 1885.',
      'Sentinel Peak, just west of downtown, is better known as "A" Mountain for the large letter that University of Arizona students first laid out on its slope in 1915. Saguaro National Park protects forests of giant saguaro cactus on both the east and west sides of the city, and in 2015 Tucson became the first city in the United States named a UNESCO City of Gastronomy, largely for its Sonoran Mexican food.',
    ],
    photos: ['arizona-2026/09.jpg', 'arizona-2026/06.jpg', 'arizona-2026/08.jpg', 'arizona-2026/07.jpg', 'arizona-2026/23.jpg'],
  },
  {
    slug: 'mount-lemmon', name: 'Mount Lemmon', country: 'United States', area: 'Pima County, Arizona', match: ['Mount Lemmon'],
    keywords: ['Mount Lemmon', 'Windy Point', 'Santa Catalina'],
    text: [
      'Mount Lemmon is the highest peak of the Santa Catalina Mountains north of Tucson, at 9,159 feet. It is named for the botanist Sara Plummer Lemmon, who climbed it in 1881. It is one of the "sky islands" of southern Arizona, mountain ranges high enough to rise from the desert into pine and fir forest.',
      'The Catalina Highway climbs about 6,000 feet from the edge of Tucson to the top, passing through as many plant zones as a drive from Mexico to Canada. Windy Point Vista, partway up, is a well-known spot for sunsets over the city. Near the summit, the small village of Summerhaven and the Mt. Lemmon Ski Valley, the southernmost ski area in the United States, serve as a summer escape from the desert heat.',
    ],
    photos: ['arizona-2026/11.jpg', 'arizona-2026/12.jpg', 'arizona-2026/13.jpg', 'arizona-2026/14.jpg', 'arizona-2026/10.jpg'],
  },
  {
    slug: 'arizona-sonora-desert-museum', name: 'Arizona-Sonora Desert Museum', country: 'United States', area: 'Pima County, Arizona',
    match: ['Arizona-Sonora Desert Museum'], keywords: ['Desert Museum', 'Gates Pass'],
    text: [
      'The Arizona-Sonora Desert Museum, west of Tucson in the Tucson Mountains, is a zoo, botanical garden, natural history museum, and aquarium in one. It opened in 1952. Most of it is outdoors, along paths through the desert, and it shows the animals and plants of the Sonoran Desert in settings built to look like their habitats.',
      'Its exhibits include black bears and Mexican gray wolves, mountain lions, bighorn sheep, and ocelots, along with an artificial limestone cave and a collection of desert minerals. The usual way in from Tucson is Gates Pass Road, a narrow pass over the Tucson Mountains next to the western district of Saguaro National Park.',
    ],
    photos: ['arizona-2026/27.jpg', 'arizona-2026/30.jpg', 'arizona-2026/31.jpg', 'arizona-2026/26.jpg', 'arizona-2026/25.jpg', 'arizona-2026/32.jpg'],
  },
  {
    slug: 'bisbee', name: 'Bisbee', country: 'United States', area: 'Cochise County, Arizona', match: ['Bisbee'],
    keywords: ['Bisbee'],
    text: [
      'Bisbee is an old copper mining town in the Mule Mountains of southeastern Arizona, a few miles from the Mexican border and the seat of Cochise County. It was founded in 1880, and the Copper Queen Mine and its neighbors made it one of the richest mineral sites in the world, producing copper, gold, and silver until large-scale mining ended in 1975.',
      'The town\'s Victorian and art deco buildings climb the steep canyon sides, linked by long public stairways, and today Bisbee is known as an artists\' town. The Queen Mine Tour takes visitors underground into the old Copper Queen workings, and the Bisbee Mining and Historical Museum, in the 1897 headquarters of the Copper Queen company, is affiliated with the Smithsonian Institution.',
    ],
    photos: ['arizona-2026/21.jpg', 'arizona-2026/20.jpg', 'arizona-2026/16.jpg', 'arizona-2026/18.jpg', 'arizona-2026/15.jpg', 'arizona-2026/17.jpg', 'arizona-2026/19.jpg'],
  },
  {
    slug: 'sedona', name: 'Sedona', country: 'United States', area: 'Coconino County, Arizona', match: ['Sedona'],
    keywords: ['Sedona', 'Oak Creek'],
    text: [
      'Sedona is a small city in north central Arizona, surrounded by red sandstone buttes and spires in the Coconino National Forest. It was named in 1902 for Sedona Schnebly, the wife of its first postmaster. The red color comes from iron oxide in layers of sandstone laid down about 270 million years ago.',
      'The approach from the south on AZ-179 passes Bell Rock and Courthouse Butte at the Village of Oak Creek. North of town, AZ-89A follows Oak Creek Canyon, a narrow gorge about 12 miles long, before climbing switchbacks to the Oak Creek Vista overlook on the edge of the Colorado Plateau and continuing on to Flagstaff.',
    ],
    photos: ['arizona-2026/36.jpg', 'arizona-2026/35.jpg', 'arizona-2026/37.jpg', 'arizona-2026/38.jpg', 'arizona-2026/39.jpg', 'arizona-2026/40.jpg', 'arizona-2026/34.jpg'],
  },
  {
    slug: 'flagstaff', name: 'Flagstaff', country: 'United States', area: 'Coconino County, Arizona', match: ['Flagstaff'],
    keywords: ['Flagstaff', 'Lowell'],
    text: [
      'Flagstaff is a mountain city of about 75,000 people at nearly 7,000 feet on the Colorado Plateau, below the San Francisco Peaks, where Humphreys Peak is the highest point in Arizona. It grew up along the railroad in the 1880s and later along Route 66, both of which still run through downtown. It is the seat of Coconino County and home to Northern Arizona University.',
      'Lowell Observatory was founded on Mars Hill above downtown in 1894 by Percival Lowell, and it was there in 1930 that Clyde Tombaugh discovered Pluto. Partly because of the observatory, Flagstaff became the world\'s first International Dark Sky City in 2001, with lighting rules that keep the night sky dark.',
    ],
    photos: ['arizona-2026/45.jpg', 'arizona-2026/44.jpg', 'arizona-2026/41.jpg', 'arizona-2026/42.jpg'],
  },
  {
    slug: 'williams', name: 'Williams', country: 'United States', area: 'Coconino County, Arizona', match: ['Williams'],
    keywords: ['Williams'],
    text: [
      'Williams is a small town on Route 66 west of Flagstaff, at about 6,800 feet in the ponderosa pine forest below Bill Williams Mountain. It calls itself the "Gateway to the Grand Canyon," since the South Rim is about an hour north on AZ-64.',
      'Williams was the last town on Route 66 to be bypassed by Interstate 40, in 1984, and its downtown still has the motels, diners, and neon signs of the old highway. The Grand Canyon Railway, first opened in 1901, runs from its historic depot to Grand Canyon Village.',
    ],
    photos: ['arizona-2026/72.jpg'],
  },
  {
    slug: 'grand-canyon', name: 'Grand Canyon South Rim', country: 'United States', area: 'Coconino County, Arizona',
    match: ['Grand Canyon South Rim', 'Desert View'], keywords: ['Grand Canyon', 'Grandview', 'Moran Point', 'Desert View', 'Mather Point', 'Kaibab'],
    text: [
      'The Grand Canyon was carved by the Colorado River through the Colorado Plateau. It is 277 river miles long, up to 18 miles wide, and more than a mile deep, and the rock in its walls spans nearly two billion years. It became a national park in 1919 and a UNESCO World Heritage Site in 1979.',
      'The South Rim, at about 7,000 feet, is the side open all year. Mather Point and Yavapai Point near Grand Canyon Village are the first views for most visitors. Desert View Drive runs about 25 miles east past Grandview Point and Moran Point to the Desert View Watchtower, designed by Mary Colter and finished in 1932. Kaibab National Forest surrounds the park on the south and allows free dispersed camping just outside its boundary.',
    ],
    photos: ['arizona-2026/68.jpg', 'arizona-2026/48.jpg', 'arizona-2026/51.jpg', 'arizona-2026/52.jpg', 'arizona-2026/54.jpg', 'arizona-2026/61.jpg', 'arizona-2026/65.jpg', 'arizona-2026/57.jpg', 'arizona-2026/71.jpg'],
  },
  {
    slug: 'jerome', name: 'Jerome', country: 'United States', area: 'Yavapai County, Arizona', match: ['Jerome'],
    keywords: ['Jerome'],
    text: [
      'Jerome is a former copper mining town built on the side of Cleopatra Hill on Mingus Mountain, about 5,000 feet up and looking out over the Verde Valley toward Sedona. The United Verde Mine made it one of the largest towns in Arizona in the early 20th century.',
      'After the last mine closed in 1953, the population fell to around a hundred and Jerome was called the largest ghost town in America. It has since been revived by artists and shop owners, and today it is a tourist town of a few hundred people, reached by the switchbacks of AZ-89A between Prescott and the Verde Valley.',
    ],
    photos: ['arizona-2026/74.jpg', 'arizona-2026/75.jpg', 'arizona-2026/76.jpg'],
  },
  {
    slug: 'prescott', name: 'Prescott', country: 'United States', area: 'Yavapai County, Arizona', match: ['Prescott'],
    keywords: ['Prescott', 'Whiskey Row'],
    text: [
      'Prescott, in the pine-covered mountains of central Arizona, was the first capital of the Arizona Territory when it was founded in 1864, and it is the seat of Yavapai County. The town also hosts what it bills as the world\'s oldest rodeo, held since 1888.',
      'Downtown centers on Courthouse Plaza and the 1916 Yavapai County Courthouse. Facing it along Montezuma Street is Whiskey Row, a block of saloons that was rebuilt after a fire in 1900. Prescott is also home to a campus of Embry-Riddle Aeronautical University, and the granite boulders of the Granite Dells lie just north of town.',
    ],
    photos: ['arizona-2026/77.jpg', 'arizona-2026/78.jpg', 'arizona-2026/73.jpg'],
  },
  {
    slug: 'cave-creek', name: 'Cave Creek', country: 'United States', area: 'Maricopa County, Arizona', match: ['Cave Creek'],
    keywords: ['Cave Creek'],
    text: [
      'Cave Creek is a small town in the desert foothills north of Phoenix that started as a mining and ranching settlement in the 1870s. It has kept a Western look, with saloons, steakhouses, and horse trails along its main street.',
      'The Buffalo Chip Saloon on Cave Creek Road is known for its weekly rodeo nights, with bull riding in an arena behind the bar.',
    ],
    photos: ['arizona-2026/04.jpg', 'arizona-2026/05.jpg'],
  },
  // Korea
  {
    slug: 'seoul', name: 'Seoul', country: 'South Korea', area: 'Seoul', match: ['Seoul', 'Lotte World Tower'],
    keywords: ['Gwanghwamun', 'Gyeongbokgung', 'Gangnam', 'Hongdae', 'Dongdaemun'],
    text: [
      'Seoul is the capital of South Korea, and its metropolitan area is home to about half of the country\'s population. It has been the capital since 1394, when the Joseon dynasty made it the seat of its court.',
      'Gyeongbokgung, the main royal palace of Joseon, stands behind the Gwanghwamun gate at the head of the city\'s central boulevard, near the Cheonggyecheon, an urban stream restored in 2005 after an elevated highway over it was removed. Elsewhere the city ranges from the commercial towers of Gangnam and the COEX complex to the student nightlife of Hongdae and the markets of Dongdaemun. Lotte World Tower, at 555 meters, is the tallest building in Korea.',
    ],
    photos: ['2025-korea-waterbomb/02.jpg', '2025-korea-waterbomb/03.jpg', '2025-korea-waterbomb/04.jpg', '2025-korea-waterbomb/15.jpg', '2025-korea-waterbomb/08.jpg', '2025-korea-waterbomb/09.jpg', '2025-korea-waterbomb/10.jpg', '2025-korea-waterbomb/11.jpg', '2025-korea-waterbomb/12.jpg', '2025-korea-waterbomb/16.jpg'],
  },
  {
    slug: 'dmz', name: 'The Korean Demilitarized Zone', country: 'South Korea', area: 'Gyeonggi', match: ['DMZ'],
    keywords: ['DMZ'],
    text: [
      'The Korean Demilitarized Zone is a strip of land about 250 kilometers long and 4 kilometers wide that divides North and South Korea, established by the armistice that ended the fighting of the Korean War in 1953.',
      'Tours from Seoul visit Imjingak, a park beside the Freedom Bridge; the Third Tunnel, an infiltration tunnel dug from the North and discovered in 1978; and the Dora Observatory, which looks across the border into North Korea.',
    ],
    photos: ['2025-korea-waterbomb/05.jpg', '2025-korea-waterbomb/06.jpg', '2025-korea-waterbomb/07.jpg'],
  },
  {
    slug: 'waterbomb', name: 'Waterbomb, Goyang', country: 'South Korea', area: 'Gyeonggi', match: ['Waterbomb, Goyang'],
    keywords: ['Waterbomb'],
    text: [
      'Waterbomb is a summer music festival held in Korea since 2015, at which performers and the audience drench one another with water cannons and water guns. Its Seoul edition draws major K-pop and hip-hop acts.',
      'The 2025 Seoul festival was held at KINTEX in Goyang, the largest exhibition center in Korea, just northwest of Seoul.',
    ],
    photos: ['2025-korea-waterbomb/13.jpg', '2025-korea-waterbomb/14.jpg'],
  },
];
