---
title: "Kanazawa"
summary: "The first few days of March 2026. I landed at Narita and spent a night in Shinjuku, then took the Hokuriku Shinkansen to Kanazawa for the Tsuzumi Gate at Kanazawa Station, the Asanogawa River, and the lantern-lit lanes of the Higashi Chaya district, heading back the next morning along the Japan Sea coast past Toyama and Itoigawa."
start: 2026-03-06
end: 2026-03-08
category: Travel
region: Japan
collection: "Kanazawa"
companions: []
draft: true
# Cities and route from japan-2026/stops.geojson.
stops:
  - {"name": "Narita Airport", "lat": 35.772, "lng": 140.3929, "date": "Day 1"}
  - {"name": "Kanazawa", "lat": 36.578, "lng": 136.648, "date": "Days 2-3"}
  - {"name": "Shinjuku", "lat": 35.6896, "lng": 139.7006, "date": "Day 1 · night"}
  - {"name": "Tokyo Station", "lat": 35.6812, "lng": 139.7671, "date": "Days 2-3"}
  - {"name": "Omiya", "lat": 35.9063, "lng": 139.6239, "date": "Day 2"}
  - {"name": "Toyama", "lat": 36.7013, "lng": 137.2132, "date": "Day 3 · from the train"}
  - {"name": "Itoigawa / Joetsu", "lat": 37.0425, "lng": 137.8606, "date": "Day 3 · from the train"}
  - {"name": "Yokohama", "lat": 35.4658, "lng": 139.6223, "date": "Day 3 · night"}
  - {"name": "Machida", "lat": 35.542, "lng": 139.446, "date": "Day 3"}
legs:
  - {"name": "Narita Airport to Shinjuku (train, to confirm)", "mode": "express", "coords": [[35.772, 140.3929], [35.73, 140.1], [35.6812, 139.7671], [35.6896, 139.7006]], "day": 1}
  - {"name": "Hokuriku Shinkansen, Tokyo to Kanazawa", "mode": "shinkansen", "coords": [[35.6812, 139.7671], [35.7138, 139.7774], [35.9063, 139.6239], [36.3227, 139.0126], [36.3428, 138.6352], [36.3965, 138.2493], [36.6431, 138.1887], [36.8445, 138.3634], [37.0915, 138.2475], [37.0425, 137.8606], [36.8749, 137.4497], [36.7013, 137.2132], [36.73, 137.0106], [36.578, 136.648]], "day": 2}
  - {"name": "Hokuriku Shinkansen, Kanazawa back to Tokyo", "mode": "shinkansen", "coords": [[36.578, 136.648], [36.73, 137.0106], [36.7013, 137.2132], [36.8749, 137.4497], [37.0425, 137.8606], [37.0915, 138.2475], [36.8445, 138.3634], [36.6431, 138.1887], [36.3965, 138.2493], [36.3428, 138.6352], [36.3227, 139.0126], [35.9063, 139.6239], [35.7138, 139.7774], [35.6812, 139.7671]], "day": 3}
  - {"name": "Tokyo to Yokohama and Machida (train, to confirm)", "mode": "local", "coords": [[35.6812, 139.7671], [35.6285, 139.7388], [35.4658, 139.6223], [35.542, 139.446], [35.4658, 139.6223]], "day": 3}
# Day-by-day timeline, generated from the trip notes by scripts/import_trips.py.
timeline:
  - label: "Day 1"
    date: 2026-03-06
    title: "Shinjuku"
    events:
      - { time: "Afternoon", text: "Narita Airport (arrival in Japan)." }
      - { time: "Evening", text: "Shinjuku (night)." }
    route: ["Narita Airport to Shinjuku (train, to confirm) (about 60 km, 45 min)."]
  - label: "Day 2"
    date: 2026-03-07
    title: "Omiya, Higashi Chaya district"
    events:
      - { time: "Morning", text: "Tokyo Station, Hokuriku Shinkansen; Omiya (from the train); Kanazawa Station area." }
      - { time: "Afternoon", text: "Higashi Chaya district, Kanazawa." }
    route: ["Hokuriku Shinkansen, Tokyo to Kanazawa (about 410 km, 2 h)."]
  - label: "Day 3"
    date: 2026-03-08
    title: "Kanazawa, Toyama and the Japan Sea coast, Itoigawa and Joetsu"
    events:
      - { time: "Morning", text: "Kanazawa, morning; Toyama and the Japan Sea coast from the Shinkansen; Itoigawa and Joetsu from the Shinkansen; Tokyo Station." }
      - { time: "Afternoon", text: "Yokohama." }
      - { time: "Evening", text: "Machida; Yokohama (night)." }
    route: ["Hokuriku Shinkansen, Kanazawa back to Tokyo (about 410 km, 2 h).", "Tokyo to Yokohama and Machida (train, to confirm) (about 60 km, 1 h 30 min)."]
---

*The full write-up for this sidequest is coming soon.*
