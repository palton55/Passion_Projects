#!/usr/bin/env python3
"""Build Japan sidequest entries from the processed trip notes.

Reads each trip's road-map.md (day-by-day timeline) and stops.geojson (cities and
route legs) and writes src/content/adventures/<id>.md. Photo counts and notes meant
for Patrick are left out. Japan 2023 already has a hand-tuned entry, so only its
timeline is replaced.

Usage: python3 scripts/import_trips.py [/mnt/project-files/trips]
"""
import json
import re
import sys
from datetime import date
from pathlib import Path

TRIPS = Path(sys.argv[1] if len(sys.argv) > 1 else '/mnt/project-files/trips')
OUT = Path(__file__).resolve().parent.parent / 'src/content/adventures'
KODAIRA = [35.7286, 139.4775]
MODES = {'car': 'drive', 'bus': 'bus', 'ferry': 'ferry', 'flight': 'flight', 'shinkansen': 'shinkansen',
         'express': 'express', 'local': 'local'}
# Friends are not named on the site (Patrick, Oct 2026).
FRIENDS = [(r'Michael joined from today, the day after getting back from Fuji\. Days 5 to 9 are the Tokyo tour with him\.',
            'Days 5 to 9 were spent touring Tokyo with friends.'),
           (r',? Michael joins\b', ''), (r'\b(?:Michael|Shaggy)\b', 'friends')]
MONTHS = {m: i for i, m in enumerate('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(), 1)}

ENTRIES = [
    dict(id='japan-2024', dir='japan-2024', title='Return to Tokyo', collection='Japan 2024', companions=['friends'],
         summary='Nine days in Tokyo with friends right after sophomore finals, from Shinjuku and Shibuya to Tokyo Tower and Zojoji Temple, plus a day trip to Fujiyoshida to see Mt. Fuji from Arakurayama Sengen Park and Lake Kawaguchiko.'),
    # One entry with two sections (Patrick, Oct 21 2026): the Shimanami Kaido, then the drive back as the West Japan Road Trip.
    dict(id='2025-west-japan-road-trip', dir='2025-study-abroad/01-west-japan-road-trip',
         title='Shimanami Kaido and West Japan Road Trip', collection='Shimanami Kaido and West Japan Road Trip',
         summary='The first week of my study abroad. I took the Tokaido Shinkansen to Osaka and crossed the Shimanami Kaido from Setoda over the Tatara Bridge to Imabari, then spent three days driving back to Tokyo by way of Kurashiki, Himeji Castle, Arima Onsen, Nara, Lake Hamana, and Hakone.',
         parts=[
             dict(title='Shimanami Kaido', days=[1, 2, 3, 4],
                  stops=['Haneda Airport', 'Tokyo', 'Shin-Osaka', 'Shimanami Kaido', 'Imabari', 'Fukuyama', 'Okayama'],
                  blurb='Landing in Tokyo, the Tokaido Shinkansen to Osaka, and the Shimanami Kaido from Setoda over the Tatara Bridge to Imabari, then back across the islands to Fukuyama and on to Okayama by the Sanyo Shinkansen.'),
             dict(title='West Japan Road Trip', days=[4, 5, 6],
                  stops=['Okayama / Kurashiki', 'Himeji', 'Arima Onsen', 'Nara', 'Mountain village', 'Nagashima Spa Land',
                         'Hamamatsu', 'Hakone / Gotemba', 'Tachikawa'],
                  blurb='The drive back to Tokyo from Okayama: Kibitsu Shrine and Kurashiki, then Himeji Castle, Arima Onsen, and Nara, along the Ise Bay coast and over Lake Hamana to Hamamatsu, and on through Hakone and Gotemba to a hostel near Tachikawa.'),
         ]),
    dict(id='2025-hakone-fuji', dir='2025-study-abroad/02-hakone-fuji', title='Hakone and Mt. Fuji', collection='Hakone and Mt. Fuji',
         summary='A three-day weekend staying in Manazuru on Sagami Bay, with Lake Ashi in Hakone, a day at Fuji-Q Highland at the foot of Mt. Fuji, and some shopping at the Gotemba Premium Outlets.'),
    dict(id='2025-alpine-route', dir='2025-study-abroad/03-alpine-route', title='Tateyama Kurobe Alpine Route',
         collection='Tateyama Kurobe Alpine Route',
         summary='Three days crossing the Northern Alps: the Azusa limited express to Matsumoto and Shinano-Omachi, the Tateyama Kurobe Alpine Route past Kurobe Dam to the snow walls at Murodo, then the Amaharashi Coast and Toyama before taking the Hokuriku Shinkansen back to Tokyo.'),
    dict(id='2025-kyoto-osaka-okinawa', dir='2025-study-abroad/04-kyoto-osaka-okinawa', title='Kyoto, Osaka, and Okinawa',
         collection='Kyoto, Osaka and Okinawa',
         summary='Ten days in Kansai and Okinawa. I started with Fushimi Inari in Kyoto, then hit Universal Studios Japan, the Kaiyukan aquarium, and Expo 2025 in Osaka, before flying to Okinawa and driving from Cape Maeda and Chatan up to Sesoko and Cape Hedo at the northern tip of the island.'),
    dict(id='2025-korea-waterbomb', dir='2025-study-abroad/05-korea-waterbomb', title='Korea and Waterbomb', collection='Korea and Waterbomb',
         region='South Korea',
         summary='Eight days in Seoul from Tokyo: Gyeongbokgung Palace and Gwanghwamun, Gangnam, Hongdae, and Dongdaemun, a tour of the DMZ, and the Waterbomb music festival in Goyang.'),
    dict(id='2025-tohoku-hokkaido', dir='2025-study-abroad/06-tohoku-hokkaido', title='Tohoku and Hokkaido', collection='Tohoku and Hokkaido',
         summary='Six days heading north from Tokyo. I rode the Tohoku, Yamagata, and Akita Shinkansen through Yamagata, Sendai, and Morioka up to Hokkaido, drove from Sapporo up the Oronron Line to Cape Soya, the northernmost point of Japan, and back in a single day, and spent two nights in Hakodate with Goryokaku and Onuma Park.',
         # Kept as one entry, with the train journey and the road trip as their own sections (Patrick, Oct 21 2026).
         parts=[
             dict(title='The Train Journey', days=[1, 2, 4, 5, 6], modes=['shinkansen', 'express', 'local'],
                  stops=['Omiya', 'Utsunomiya', 'Fukushima', 'Yamagata', 'Sendai', 'Omagari', 'Morioka', 'Aomori',
                         'Shin-Hakodate-Hokuto', 'Sapporo', 'Hakodate', 'Tokyo'],
                  blurb='From Omiya to Hokkaido and back by the Tohoku, Yamagata, Akita, and Hokkaido Shinkansen and the Hokuto limited express, with stops across Tohoku and two nights in Hakodate.'),
             dict(title='The Hokkaido Road Trip', days=[3], modes=['drive'],
                  stops=['Sapporo Station', 'Obira', 'Enbetsu', 'Wakkanai', 'Cape Soya', 'Nakatombetsu', 'Asahikawa'],
                  blurb='A drive from Sapporo up the Sea of Japan coast on the Oronron Line to Wakkanai and Cape Soya, the northernmost point of Japan, then inland to Asahikawa and back to Sapporo.'),
         ]),
    dict(id='2025-kusatsu-onsen', dir='2025-study-abroad/07-kusatsu-onsen', title='Kusatsu Onsen', collection='Kusatsu Onsen',
         summary='An overnight bus trip from Ikebukuro to Kusatsu Onsen in the mountains of Gunma, one of the best-known hot spring towns in Japan, with the Yubatake at its center and a stop around Yanba Dam in Naganohara.'),
    dict(id='2025-ishigaki', dir='2025-study-abroad/08-ishigaki', title='Ishigaki and Taketomi', collection='Ishigaki and Taketomi',
         summary='My last trip of the semester: six days in the Yaeyama Islands, with boat trips past Taketomi, Kohama, and Kuroshima, a drive along the west coast of Ishigaki to Cape Ogan, and a day among the red-tiled houses of Taketomi.'),
    dict(id='2025-kanto-day-trips', dir='2025-study-abroad/kanto-day-trips', title='Kanto Day Trips', collection='Kanto Day Trips',
         summary='Fourteen day trips from Kodaira between April and August 2025 by train, bus, and car, from Asakusa, Yokohama, and Enoshima out to Chichibu, Mt. Takao, Okutama, the Boso Peninsula, Atami, and Ito on the Izu Peninsula.'),
    # Japan 2026 (trips/japan-2026/road-map.md): Kanazawa, Mt. Fuji and Hokkaido as their own entries (Patrick, Oct 22 2026),
    # and the Tokyo week as part of the Japan 2026 page itself rather than a sidequest (Patrick, Oct 24 2026). The page runs
    # in order: arriving in Tokyo, Kanazawa, Mt. Fuji, Tokyo, Hokkaido (Patrick, Oct 24 2026). `days` picks
    # each entry's days from the trip, renumbered from 1. Told from Patrick's own perspective, with no companions named.
    dict(id='japan-2026-kanazawa', dir='japan-2026', days=[2, 3], title='Kanazawa', collection='Kanazawa',
         summary='The Hokuriku Shinkansen from Tokyo Station to Kanazawa for the Tsuzumi Gate at Kanazawa Station, the Asanogawa River, and the lantern-lit lanes of the Higashi Chaya district, heading back the next morning along the Japan Sea coast past Toyama and Itoigawa.',
         stops=['Tokyo Station', 'Omiya', 'Kanazawa', 'Toyama', 'Itoigawa / Joetsu', 'Yokohama', 'Machida']),
    dict(id='japan-2026-fuji', dir='japan-2026', days=[4, 5], title='Mt. Fuji', collection='Mt. Fuji',
         summary='A two-day drive from Yokohama to the Gotemba outlets and a night at a ryokan on Lake Yamanakako, then the Chureito Pagoda, Lake Kawaguchiko, and Fuji-Q Highland under Mt. Fuji, dropping the car off in Shinjuku.',
         stops=['Yokohama', 'Gotemba Premium Outlets', 'Lake Yamanakako', 'Chureito Pagoda', 'Lake Kawaguchiko', 'Fuji-Q Highland', 'Shinjuku']),
    dict(id='japan-2026-tokyo', dir='japan-2026', days=list(range(6, 13)), title='Tokyo Days', collection='Tokyo Days',
         summary='A week around Tokyo from the Machida and Sagamihara side: back at Hitotsubashi in Kunitachi, Shibuya, Setagaya, the Chiikawa exhibit and an esports cafe in Ikebukuro, and Tachikawa, ending with a flight north from Haneda.',
         stops=['Machida / Sagamihara', 'Zama', 'Shibuya / Harajuku', 'Setagaya', 'Ikebukuro', 'Tachikawa', 'Ebisu', 'Haneda Airport']),
    dict(id='japan-2026-hokkaido', dir='japan-2026', days=list(range(13, 20)), pois=[('japan-2026/manholes.geojson', 'Manhole covers')],
         bands=[('japan-2026/route-238.geojson', 'National Route 238, driven end to end', '#26a69a')], title='Hokkaido Road Trip', collection='Hokkaido Road Trip',
         summary='A winter road trip around Hokkaido from New Chitose: across Tokachi to Abashiri, along the Sea of Okhotsk to the drift ice at Monbetsu, up to Cape Soya, inland to Asahikawa, Biei, and Furano, and down to Upopoy, the National Ainu Museum, followed by a day in Sapporo and the trip home through Tokyo.',
         parts=[
             dict(title='Hokkaido Road Trip', days=[13, 14, 15, 16], modes=['drive'], notes=['Why this route: the manhole covers'],
                  stops=['New Chitose Airport', 'Obihiro', 'Ashoro / Rikubetsu', 'Abashiri', 'Monbetsu', 'Cape Soya', 'Wakkanai', 'Teshio',
                         'Asahikawa', 'Biei / Furano', 'Furano', 'Upopoy, Shiraoi'],
                  blurb='Four days of driving from New Chitose: across Tokachi to Abashiri, along the Sea of Okhotsk to the drift ice at Monbetsu, north to Cape Soya, inland to Asahikawa, Biei, and Furano, and south to Upopoy.'),
             dict(title='Sapporo and Home', days=[16, 17, 18, 19],
                  stops=['Sapporo', 'New Chitose Airport'],
                  blurb='A day around Odori and Tanukikoji in Sapporo, the flight back to Tokyo, and one last afternoon in Ginza before flying out of Narita.'),
         ]),
]


def anonymize(text):
    for pat, rep in FRIENDS:
        text = re.sub(pat, rep, text)
    return text


def clean(text):
    """Drop markdown, photo counts, friends' names and notes addressed to Patrick from a road-map line."""
    text = anonymize(text.replace('**', '').replace('*', ''))
    text = re.sub(r'\((?:inferred[^)]*|rounded|[^)]*, rounded)\)', '', text)
    text = re.sub(r', (?:inferred|rounded)\)', ')', text)
    text = re.sub(r'\s*\(no photos\)', '', text)
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    keep = [s for s in sentences if s and not s.endswith('?')
            and not re.search(r'\b\d+ (?:photos?|videos?|short clips?)\b|\b1 short clip\b|\bphotos? (?:on|from) the\b', s)]
    out = ' '.join(keep)
    out = re.sub(r'\s+([.,;])', r'\1', re.sub(r'\s{2,}', ' ', out)).strip()
    return out


TIME = re.compile(r'^(~?\d{1,2}:\d{2}(?: to ~?\d{1,2}:\d{2})?|(?:Late |Early )?(?:Morning|Afternoon|Evening|Night)):?\s*', re.I)


def parse_event(line):
    m = re.match(r'^- \*\*(.+?)\*\*(.*)$', line)
    if not m:
        return None
    bold, rest = m.group(1).strip(), m.group(2).strip()
    if re.search(r'\bvideos?\b', bold):  # notes about video files are for phase 2
        return None
    t = TIME.match(bold)
    time = t.group(1).replace('~', 'c. ') if t else None
    head = bold[t.end():] if t else bold
    if head and head[0].islower() and not re.match(r'\w+[A-Z]', head):
        head = head[0].upper() + head[1:]
    text = clean(f'{head} {rest}' if rest else head)
    text = re.sub(r',$', '.', text)
    if text and text[-1] not in '.!?)':
        text += '.'
    return {'time': time.capitalize() if time and not time[0].isdigit() and not time.startswith('c.') else time, 'text': text} if text else None


def place(text):
    t = re.sub(r'\s*\(.*?\)', '', text).rstrip('.')
    return re.split(r',|:| then | from ', t)[0].strip()


def parse_days(md, year):
    days = []
    for block in re.split(r'^## ', md, flags=re.M)[1:]:
        lines = block.strip().splitlines()
        h = re.match(r'Day (\d+) · \w{3} (\w{3}) (\d{1,2})(?: · (.+))?', lines[0])
        if not h:
            continue
        title = anonymize(h.group(4) or '')
        if re.search(r'photos and videos', title):
            title = ''
        events, route = [], []
        for ln in lines[1:]:
            if ln.startswith('- *Route:*'):
                route.append(clean(ln[len('- *Route:*'):]).rstrip('.') + '.')
            elif ln.startswith('- **'):
                e = parse_event(ln)
                if e:
                    events.append(e)
        if not title:
            names = []
            for e in events:
                n = place(e['text'])
                if n and n not in names and not re.match(r'(Back|Home)\b', n) and not re.search(r'Airport|Station|Expressway', n):
                    names.append(n)
            title = ', '.join(names[:3]) or 'Travel day'
        d = date(year, MONTHS[h.group(2)], int(h.group(3)))
        days.append({'label': f'Day {h.group(1)}', 'date': d.isoformat(), 'title': title, 'events': events, 'route': route})
    return days


def kanto_days(md, year):
    days = []
    for m in re.finditer(r'^\| (\w{3}) (\w{3}) (\d{1,2}) \| (.+?) \|', md, flags=re.M):
        d = date(year, MONTHS[m.group(2)], int(m.group(3)))
        days.append({'label': 'Day trip', 'date': d.isoformat(), 'title': m.group(4), 'events': [], 'route': []})
    return days


def latlng(c):
    return [round(c[1], 4), round(c[0], 4)]


def thin(coords, limit=120):
    if len(coords) <= limit:
        return coords
    step = len(coords) / (limit - 1)
    return [coords[int(i * step)] for i in range(limit - 1)] + [coords[-1]]


def map_data(geo, kanto=False):
    stops, legs, dates, leg_dates = [], [], [], []
    for f in geo['features']:
        p, g = f['properties'], f['geometry']
        if p.get('date'):
            dates.append(p['date'])
        if kanto and g['type'] == 'Point':
            d = date.fromisoformat(p['date'])
            stops.append({'name': p['name'], 'lat': latlng(g['coordinates'])[0], 'lng': latlng(g['coordinates'])[1],
                          'date': d.strftime('%b ') + str(d.day), 'mode': 'daytrip'})
            # Confirmed modes (car, bus) draw as that mode; the rest stay generic day-trip lines.
            mode = {'car': 'drive', 'bus': 'bus'}.get(p.get('mode'), 'daytrip')
            legs.append({'name': p['name'], 'mode': mode, 'coords': [KODAIRA, latlng(g['coordinates'])]})
        elif g['type'] == 'Point' and p.get('kind') == 'city' and p['name'] not in {st['name'] for st in stops}:
            ll = latlng(g['coordinates'])
            stops.append({'name': p['name'], 'lat': ll[0], 'lng': ll[1],
                          'date': re.sub(r'^,\s*|,?\s*no photos', '', p.get('days', '')).strip()})
        elif g['type'] == 'LineString':
            leg_dates.append(p.get('date'))
            legs.append({'name': clean(p['name']), 'mode': MODES.get(p.get('mode'), 'other'), 'date': p.get('date'),
                         'coords': thin([latlng(c) for c in g['coordinates']])})
    if kanto:
        stops.insert(0, {'name': 'Kodaira (home base)', 'lat': KODAIRA[0], 'lng': KODAIRA[1], 'mode': 'daytrip'})
    return stops, legs, sorted(dates), leg_dates


def j(v):
    return json.dumps(v, ensure_ascii=False)


# Average speeds (km/h) for rough travel-time estimates, and how much longer the real line is than the drawn one.
SPEED = {'shinkansen': 210, 'express': 85, 'local': 45, 'drive': 65, 'bus': 60, 'ferry': 25}
DETOUR = {'drive': 1.15, 'bus': 1.15}
BUCKETS = [('Morning', 0, 12), ('Afternoon', 12, 17), ('Evening', 17, 24)]


def km(coords):
    from math import radians, sin, cos, asin, sqrt
    total = 0.0
    for (a, b), (c, d) in zip(coords, coords[1:]):
        p1, p2 = radians(a), radians(c)
        h = sin((p2 - p1) / 2) ** 2 + cos(p1) * cos(p2) * sin(radians(d - b) / 2) ** 2
        total += 2 * 6371 * asin(sqrt(h))
    return total


def leg_summary(leg):
    """'Name (about 515 km, 2 h 30 min)': distance from the drawn line, time from an average speed."""
    name = re.sub(r'\s*\(Day \d+\)', '', leg['name'])
    if leg['mode'] not in SPEED:
        return name + '.'
    dist = km(leg['coords']) * DETOUR.get(leg['mode'], 1.0)
    if dist < 3:
        return name + '.'
    mins = dist / SPEED[leg['mode']] * 60
    mins = round(mins / 5) * 5 if mins < 60 else round(mins / 15) * 15
    t = f'{mins // 60} h {mins % 60} min' if mins >= 60 and mins % 60 else (f'{mins // 60} h' if mins >= 60 else f'{max(mins, 5)} min')
    d = round(dist, -1) if dist >= 30 else round(dist)
    return f'{name} (about {int(d)} km, {t}).'


def bucket_of(time, prev):
    if not time:
        return prev or 'Morning'
    m = re.search(r'(\d{1,2}):\d{2}', time)
    if m:
        h = int(m.group(1))
        return next(n for n, a, b in BUCKETS if a <= h < b)
    t = time.lower()
    return 'Morning' if 'morning' in t else 'Afternoon' if 'afternoon' in t else 'Evening'


def consolidate(days, legs):
    """Fold each day's stops into morning, afternoon and evening lines, and list its legs with distance and time."""
    for d in days:
        if not d['events']:
            continue
        groups, prev = {}, None
        for e in d['events']:
            prev = bucket_of(e.get('time'), prev)
            short = re.split(r'(?<=[a-z)])\.\s', e['text'])[0].rstrip('.')
            groups.setdefault(prev, []).append(short)
        d['events'] = [{'time': n, 'text': '; '.join(groups[n]) + '.'} for n, _, _ in BUCKETS if n in groups]
        day_no = int(d['label'].split()[1]) if re.match(r'Day \d', d['label']) else None
        day_legs = [l for l in legs if l.get('day') == day_no]
        if day_legs:
            d['route'] = [leg_summary(l) for l in day_legs]
    return days


def timeline_yaml(days):
    out = ['# Day-by-day timeline, generated from the trip notes by scripts/import_trips.py.', 'timeline:']
    for d in days:
        out.append(f'  - label: {j(d["label"])}')
        out.append(f'    date: {d["date"]}')
        if d['title']:
            out.append(f'    title: {j(d["title"])}')
        if d['events']:
            out.append('    events:')
            for e in d['events']:
                out.append('      - { ' + (f'time: {j(e["time"])}, ' if e['time'] else '') + f'text: {j(e["text"])} }}')
        if d['route']:
            out.append(f'    route: {j(d["route"])}')
    return out


def load(d):
    src = TRIPS / d
    md = (src / 'road-map.md').read_text()
    geo = json.loads((src / 'stops.geojson').read_text())
    kanto = 'kanto' in d
    stops, legs, dates, _ = map_data(geo, kanto)
    year = int(dates[0][:4])
    days = kanto_days(md, year) if kanto else parse_days(md, year)
    return stops, legs, dates, days


def shift_days(text, offset):
    return re.sub(r'(?<=Day )\d+|(?<=Days )\d+|(?<=-)\d+|(?<= and )\d+', lambda m: str(int(m.group(0)) + offset), text)


def day_set(text):
    """Day numbers named in a stop's date ('Days 1-12, 18-19', 'Days 6, 7 and 12', 'Day 3 · night')."""
    head = text.split(' · ')[0]
    if not re.match(r'Days? \d', head):
        return None
    out = set()
    for a, b in re.findall(r'(\d+)(?:-(\d+))?', head):
        out.update(range(int(a), int(b or a) + 1))
    return out


def day_label(nums):
    nums = sorted(nums)
    runs, i = [], 0
    while i < len(nums):
        j = i
        while j + 1 < len(nums) and nums[j + 1] == nums[j] + 1:
            j += 1
        runs.append(str(nums[i]) if i == j else f'{nums[i]}-{nums[j]}')
        i = j + 1
    if len(nums) == 1:
        return f'Day {nums[0]}'
    return 'Days ' + (' and '.join(runs) if len(runs) == 2 else ', '.join(runs))


def pick_days(e, stops, legs, days):
    """Keep only the entry's days of a longer trip, renumbered from 1, with its listed stops and those days' legs."""
    keep, offset = set(e['days']), min(e['days']) - 1
    names = e.get('stops') or [n for pt in e['parts'] for n in pt['stops']]
    picked = []
    for st in stops:
        if st['name'] not in names:
            continue
        st = dict(st)
        ds = day_set(st.get('date', ''))
        if ds is not None:
            inside = ds & keep
            rest = st['date'].split(' · ', 1)[1:]
            st['date'] = ' · '.join([day_label([d - offset for d in inside])] + rest) if inside else ''
        picked.append(st)
    legs = [dict(l, day=l['day'] - offset) for l in legs if l.get('day') in keep]
    days = [dict(d, label=f'Day {int(d["label"].split()[1]) - offset}') for d in days
            if re.match(r'Day \d', d['label']) and int(d['label'].split()[1]) in keep]
    for pt in e.get('parts', []):
        pt['days'] = [d - offset for d in pt['days']]
    return picked, legs, days, [d['date'] for d in days]


def load_pois(e, start):
    """Extra map points from a geojson file (e.g. manhole covers), each with its day number in the entry.
    A point without a date takes the day of the point before it."""
    out = []
    for path, layer in e['pois']:
        day = None
        for f in json.loads((TRIPS / path).read_text())['features']:
            p, ll = f['properties'], latlng(f['geometry']['coordinates'])
            d = date.fromisoformat(p['date']) if p.get('date') else None
            if d:
                day = (d - date.fromisoformat(str(start))).days + 1
            count = p.get('count', 1)
            approx = 'location approximate' if 'approximate' in p.get('source', '') else ''
            note = '; '.join(x for x in [p.get('note', ''), f'{count} covers' if count > 1 else '', approx] if x)
            note = note[:1].upper() + note[1:]
            out.append({'layer': layer, 'name': p['town'], 'lat': ll[0], 'lng': ll[1], **({'highlight': True} if p.get('way_up') else {}),
                        **({'day': day} if day else {}),
                        **({'date': d.strftime('%b ') + str(d.day) + (f", {p['time']}" if p.get('time') else '')} if d else {}),
                        **({'note': note} if note else {})})
    return out


def section_text(d, heading):
    """Paragraphs under a `## heading` in a trip's road-map.md, without images."""
    m = re.search(rf'^## {re.escape(heading)}\n(.*?)(?=^## |\Z)', (TRIPS / d / 'road-map.md').read_text(), re.S | re.M)
    return [x.strip() for x in m.group(1).split('\n\n') if x.strip() and not x.strip().startswith('![')]


def write_entry(e):
    # An entry can combine several road-map folders (e.g. two parts of one trip); days are numbered across them.
    stops, legs, dates, days = [], [], [], []
    for d in e.get('dirs', [e.get('dir')]):
        s_, l_, d_, t_ = load(d)
        offset = len(days)
        for st in s_:
            if st['name'] not in {x['name'] for x in stops}:
                st['date'] = shift_days(st.get('date', ''), offset) if offset else st.get('date', '')
                stops.append(st)
        for t in t_:
            t['label'] = f'Day {int(t["label"].split()[1]) + offset}' if re.match(r'Day \d', t['label']) else t['label']
        legs += l_
        dates += d_
        days += t_
    dates.sort()
    start = date.fromisoformat(dates[0])
    for l in legs:
        if l.get('date'):
            l['day'] = (date.fromisoformat(l['date']) - start).days + 1
        l.pop('date', None)
    if 'days' in e:
        stops, legs, days, dates = pick_days(e, stops, legs, days)
    fm = ['---', f'title: {j(e["title"])}', f'summary: {j(e["summary"])}', f'start: {dates[0]}', f'end: {dates[-1]}',
          'category: Travel', f'region: {e.get("region", "Japan")}', f'collection: {j(e["collection"])}',
          f'companions: {j(e.get("companions", []))}', 'draft: true',
          f'# Cities and route from {", ".join(e.get("dirs", [e.get("dir")]))}/stops.geojson.', 'stops:']
    fm += [f'  - {j(s)}' for s in stops]
    fm.append('legs:')
    fm += [f'  - {j(l)}' for l in legs]
    consolidate(days, legs)
    if 'bands' in e:
        fm.append('bands:')
        for path, name, color in e['bands']:
            g = json.loads((TRIPS / path).read_text())
            g = g['features'][0] if 'features' in g else g
            fm.append(f'  - {j({"name": name, "color": color, "coords": [latlng(c) for c in g["geometry"]["coordinates"]]})}')
    if 'pois' in e:
        fm.append('pois:')
        fm += [f'  - {j(pt)}' for pt in load_pois(e, dates[0])]
    if 'parts' in e:
        fm.append('parts:')
        fm += [f'  - {j({**pt, "notes": [{"title": n, "text": section_text(e["dir"], n)} for n in pt["notes"]]} if "notes" in pt else pt)}' for pt in e['parts']]
    fm += timeline_yaml(days)
    fm += ['---', '', "*I'm still writing up the full story of this one, so check back soon.*", '']
    (OUT / f'{e["id"]}.md').write_text('\n'.join(fm))
    print(f'{e["id"]}: {len(days)} days, {len(stops)} stops, {len(legs)} legs')


def update_2023():
    path = OUT / 'japan-2023.md'
    text = path.read_text()
    _, fm, body = text.split('---\n', 2)
    fm = re.sub(r'# Day-by-day timeline.*?(?=^\S(?!.*timeline)|\Z)', '', fm, flags=re.S | re.M)
    fm = re.sub(r'^timeline:\n(?:  .*\n)*', '', fm, flags=re.M)
    days = parse_days((TRIPS / 'japan-2023/road-map.md').read_text(), 2023)
    import yaml
    legs = yaml.safe_load(fm).get('legs', [])
    for l in legs:
        m = re.search(r'\(Day (\d+)\)', l['name'])
        l['day'] = int(m.group(1)) if m else None
    consolidate(days, legs)
    fm = fm.rstrip('\n') + '\n' + '\n'.join(timeline_yaml(days)) + '\n'
    path.write_text(f'---\n{fm}---\n{body}')
    print(f'japan-2023: {len(days)} days (timeline only)')


if __name__ == '__main__':
    update_2023()
    for e in ENTRIES:
        write_entry(e)
