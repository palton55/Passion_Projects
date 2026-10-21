---
title: "First Visit to Japan"
summary: "A nine-day spring break journey with friends from Tokyo to Osaka, Kyoto, and a homestay in Tsuruga, undertaken with first-year Japanese."
start: 2023-03-11
end: 2023-03-19
category: Travel
region: Japan
collection: Japan 2023
companions: [friends]
draft: true              # stays a draft until the story and the Mar 18 stop are filled in
# Cities visited and the route between them (from trips/japan-2023/stops.geojson). Rail lines are assumed through main stations.
stops:
  - { name: "Haneda Airport", lat: 35.5494, lng: 139.7798, date: "arrive Mar 11 · depart Mar 19" }
  - { name: "Tokyo", lat: 35.6812, lng: 139.7671, date: "Days 1-4, 9" }
  - { name: "Osaka", lat: 34.6937, lng: 135.5023, date: "Days 4-6" }
  - { name: "Kyoto", lat: 34.9858, lng: 135.7588, date: "Days 6-7, 9" }
  - { name: "Tsuruga", lat: 35.6455, lng: 136.0756, date: "Days 7-9 · homestay" }
  - { name: "Okuibuki Ski Resort", lat: 35.5214, lng: 136.3867, date: "Day 8 · skiing" }
legs:
  - name: "Tokaido Shinkansen (Day 4)"
    mode: shinkansen
    coords: [[35.6812, 139.7671], [35.6285, 139.7388], [35.5066, 139.6175], [35.2564, 139.1553], [35.1038, 139.0779], [35.1263, 138.911], [35.1424, 138.6633], [34.9716, 138.389], [34.7693, 138.0147], [34.7038, 137.735], [34.7629, 137.382], [34.959, 137.079], [35.1709, 136.8815], [35.3157, 136.6857], [35.3146, 136.29], [34.9858, 135.7588], [34.7335, 135.5002]]
  - name: "Local train, Osaka to Kyoto (Day 6)"
    mode: local
    coords: [[34.69, 135.51], [34.7025, 135.4959], [34.7335, 135.5002], [34.8516, 135.6178], [34.9264, 135.6956], [34.9858, 135.7588]]
  - name: "Limited express Thunderbird (Kosei Line) (Day 7)"
    mode: express
    coords: [[34.9858, 135.7588], [34.993, 135.816], [35.1169, 135.9214], [35.29, 136.01], [35.4137, 136.0303], [35.5015, 136.0858], [35.5256, 136.1589], [35.5872, 136.1328], [35.6455, 136.0756]]
  - name: "Limited express Thunderbird (Kosei Line) (Day 9)"
    mode: express
    coords: [[35.6455, 136.0756], [35.5872, 136.1328], [35.5256, 136.1589], [35.5015, 136.0858], [35.4137, 136.0303], [35.29, 136.01], [35.1169, 135.9214], [34.993, 135.816], [34.9858, 135.7588]]
  - name: "Tokaido Shinkansen (Day 9)"
    mode: shinkansen
    coords: [[34.9858, 135.7588], [35.3146, 136.29], [35.3157, 136.6857], [35.1709, 136.8815], [34.959, 137.079], [34.7629, 137.382], [34.7038, 137.735], [34.7693, 138.0147], [34.9716, 138.389], [35.1424, 138.6633], [35.1263, 138.911], [35.1038, 139.0779], [35.2564, 139.1553], [35.5066, 139.6175], [35.6285, 139.7388], [35.6812, 139.7671]]
  - name: "Haneda Airport to central Tokyo (Day 1)"
    mode: local
    coords: [[35.5494, 139.7798], [35.6812, 139.7671]]
  - name: "Car trip to go skiing (Day 8)"
    mode: drive
    coords: [[35.6455, 136.0756], [35.5256, 136.1589], [35.5214, 136.3869], [35.3997, 136.3753], [35.4466, 136.2769], [35.4823, 136.2397], [35.5145, 136.168], [35.6455, 136.0756]]
  - name: "Tokyo to Haneda Airport (Day 9)"
    mode: local
    coords: [[35.6812, 139.7671], [35.5494, 139.7798]]
photos: []
# Day-by-day timeline, generated from the trip notes by scripts/import_trips.py.
timeline:
  - label: "Day 1"
    date: 2023-03-11
    title: "Arrival in Tokyo"
    events:
      - { time: "c. 21:30", text: "Haneda Airport. Landed at night." }
      - { text: "Hotel area near Asakusabashi. This is the Tokyo base for the first three nights." }
      - { time: "c. 23:20", text: "Akihabara at night. The first walk around Tokyo, until about midnight." }
  - label: "Day 2"
    date: 2023-03-12
    title: "Tokyo, the big loop"
    events:
      - { time: "Morning", text: "Shimbashi / Ginza, then Tokyo Station." }
      - { time: "11:30", text: "teamLab Planets, Toyosu." }
      - { time: "13:15", text: "Shinjuku." }
      - { time: "15:45", text: "Ikebukuro (Sunshine City)." }
      - { time: "17:40", text: "Tokyo Skytree. The evening was spent here." }
      - { time: "20:50", text: "Asakusa. The day ended here, then back to the hotel." }
  - label: "Day 3"
    date: 2023-03-13
    title: "Shibuya day"
    events:
      - { time: "11:15 to 16:00", text: "Shibuya. The whole afternoon." }
      - { time: "Evening", text: "Akihabara." }
  - label: "Day 4"
    date: 2023-03-14
    title: "Tokyo to Osaka"
    events:
      - { time: "Morning", text: "Tokaido Shinkansen from Tokyo Station to Shin-Osaka." }
      - { time: "14:05", text: "Arrival in Osaka. The hotel was near Kitahama." }
      - { time: "15:15", text: "Osaka Aquarium Kaiyukan." }
      - { time: "19:00", text: "Dotonbori / Namba." }
      - { time: "20:30", text: "Tennoji, just south of Shinsekai." }
  - label: "Day 5"
    date: 2023-03-15
    title: "Osaka"
    events:
      - { time: "11:15", text: "Umeda / Nakanoshima." }
      - { time: "13:05", text: "Osaka Castle." }
      - { time: "18:20", text: "Shinsekai and Tsutenkaku." }
  - label: "Day 6"
    date: 2023-03-16
    title: "Kyoto"
    events:
      - { time: "Morning", text: "Local train from Osaka to Kyoto. The hotel was near Gojo." }
      - { time: "10:45", text: "Fushimi Inari Taisha." }
      - { time: "13:50", text: "Kawaramachi / Shijo." }
      - { time: "14:30", text: "Kiyomizu-dera." }
      - { time: "16:00", text: "Kyoto Station." }
      - { time: "18:30", text: "Arashiyama at dusk." }
  - label: "Day 7"
    date: 2023-03-17
    title: "To the Tsuruga homestay"
    events:
      - { time: "Late morning", text: "Limited express Thunderbird direct from Kyoto to Tsuruga, along the west shore of Lake Biwa on the Kosei Line." }
      - { time: "13:40", text: "Arrival in Tsuruga to meet the homestay family." }
      - { time: "15:50", text: "Kehi no Matsubara area." }
      - { time: "16:05", text: "Kehi Jingu." }
      - { time: "Evening", text: "East side of Tsuruga, then back to the homestay." }
  - label: "Day 8"
    date: 2023-03-18
    title: "Ski day by car"
    events:
      - { time: "Morning", text: "Tsuruga town and port." }
      - { text: "Car trip to go skiing." }
      - { time: "14:25 to 17:00", text: "Okuibuki Ski Resort, Maibara (Shiga)." }
      - { time: "17:20", text: "Drive home down the mountain and north along Lake Biwa." }
      - { time: "Night", text: "Back at the homestay." }
  - label: "Day 9"
    date: 2023-03-19
    title: "Back to Tokyo, fly home"
    events:
      - { time: "Morning", text: "Limited express Thunderbird from Tsuruga back to Kyoto, then the Tokaido Shinkansen to Tokyo Station." }
      - { time: "15:25 to 18:10", text: "Shibuya, one last time." }
      - { time: "23:10", text: "Haneda Airport for the flight home." }
---

*The full account of this trip is forthcoming. It will cover first impressions of Japan, navigating the country with beginner Japanese, and the homestay in Tsuruga.*
