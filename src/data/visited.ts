// Japan prefectures visited, from the prefectures-visited map (to be confirmed against photo GPS).
// Add trip slugs to `trips` to link each prefecture to the adventures that covered it.
export const visited: Record<string, { trips: string[] }> = {
  Hokkaido: { trips: [] }, Aomori: { trips: [] }, Iwate: { trips: [] }, Akita: { trips: [] },
  Miyagi: { trips: [] }, Yamagata: { trips: [] }, Fukushima: { trips: [] },
  Tochigi: { trips: [] }, Gunma: { trips: [] }, Saitama: { trips: [] }, Tokyo: { trips: ['japan-2023'] },
  Chiba: { trips: [] }, Kanagawa: { trips: [] },
  Niigata: { trips: [] }, Toyama: { trips: [] }, Ishikawa: { trips: [] }, Fukui: { trips: ['japan-2023'] },
  Yamanashi: { trips: [] }, Nagano: { trips: [] }, Gifu: { trips: [] }, Shizuoka: { trips: [] }, Aichi: { trips: [] },
  Mie: { trips: [] }, Shiga: { trips: ['japan-2023'] }, Kyoto: { trips: ['japan-2023'] }, Osaka: { trips: ['japan-2023'] },
  Hyogo: { trips: [] }, Nara: { trips: [] },
  Okayama: { trips: [] }, Hiroshima: { trips: [] }, Ehime: { trips: [] }, Okinawa: { trips: [] },
};
