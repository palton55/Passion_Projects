---
title: "First Visit to Japan"
summary: "Nine days over freshman spring break with friends: Tokyo, the Shinkansen to Osaka, Kyoto, and a homestay in Tsuruga on the Sea of Japan coast, with a day of skiing at Okuibuki. The first chance to put a year of classroom Japanese to use."
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
      - { time: "Evening", text: "Haneda Airport; Hotel area near Asakusabashi; Akihabara at night." }
    route: ["Haneda Airport to central Tokyo (about 15 km, 20 min)."]
  - label: "Day 2"
    date: 2023-03-12
    title: "Tokyo, the big loop"
    events:
      - { time: "Morning", text: "Shimbashi / Ginza, then Tokyo Station; teamLab Planets, Toyosu." }
      - { time: "Afternoon", text: "Shinjuku; Ikebukuro (Sunshine City)." }
      - { time: "Evening", text: "Tokyo Skytree; Asakusa." }
  - label: "Day 3"
    date: 2023-03-13
    title: "Shibuya day"
    events:
      - { time: "Morning", text: "Shibuya." }
      - { time: "Evening", text: "Akihabara." }
  - label: "Day 4"
    date: 2023-03-14
    title: "Tokyo to Osaka"
    events:
      - { time: "Morning", text: "Tokaido Shinkansen from Tokyo Station to Shin-Osaka." }
      - { time: "Afternoon", text: "Arrival in Osaka; Osaka Aquarium Kaiyukan." }
      - { time: "Evening", text: "Dotonbori / Namba; Tennoji, just south of Shinsekai." }
    route: ["Tokaido Shinkansen (about 480 km, 2 h 15 min)."]
  - label: "Day 5"
    date: 2023-03-15
    title: "Osaka"
    events:
      - { time: "Morning", text: "Umeda / Nakanoshima." }
      - { time: "Afternoon", text: "Osaka Castle." }
      - { time: "Evening", text: "Shinsekai and Tsutenkaku." }
  - label: "Day 6"
    date: 2023-03-16
    title: "Kyoto"
    events:
      - { time: "Morning", text: "Local train from Osaka to Kyoto; Fushimi Inari Taisha." }
      - { time: "Afternoon", text: "Kawaramachi / Shijo; Kiyomizu-dera; Kyoto Station." }
      - { time: "Evening", text: "Arashiyama at dusk." }
    route: ["Local train, Osaka to Kyoto (about 40 km, 55 min)."]
  - label: "Day 7"
    date: 2023-03-17
    title: "To the Tsuruga homestay"
    events:
      - { time: "Morning", text: "Limited express Thunderbird direct from Kyoto to Tsuruga, along the west shore of Lake Biwa on the Kosei Line." }
      - { time: "Afternoon", text: "Arrival in Tsuruga to meet the homestay family; Kehi no Matsubara area; Kehi Jingu." }
      - { time: "Evening", text: "East side of Tsuruga, then back to the homestay." }
    route: ["Limited express Thunderbird (Kosei Line) (about 90 km, 1 h)."]
  - label: "Day 8"
    date: 2023-03-18
    title: "Ski day by car"
    events:
      - { time: "Morning", text: "Tsuruga town and port; Car trip to go skiing." }
      - { time: "Afternoon", text: "Okuibuki Ski Resort, Maibara (Shiga)." }
      - { time: "Evening", text: "Drive home down the mountain and north along Lake Biwa; Back at the homestay." }
    route: ["Car trip to go skiing (about 100 km, 1 h 30 min)."]
  - label: "Day 9"
    date: 2023-03-19
    title: "Back to Tokyo, fly home"
    events:
      - { time: "Morning", text: "Limited express Thunderbird from Tsuruga back to Kyoto, then the Tokaido Shinkansen to Tokyo Station." }
      - { time: "Afternoon", text: "Shibuya, one last time." }
      - { time: "Evening", text: "Haneda Airport for the flight home." }
    route: ["Limited express Thunderbird (Kosei Line) (about 90 km, 1 h).", "Tokaido Shinkansen (about 450 km, 2 h 15 min).", "Tokyo to Haneda Airport (about 15 km, 20 min)."]
---

*The full account of this trip is forthcoming. It will cover first impressions of Japan, navigating the country with beginner Japanese, and the homestay in Tsuruga.*
