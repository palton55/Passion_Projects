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
MONTHS = {m: i for i, m in enumerate('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(), 1)}

ENTRIES = [
    dict(id='japan-2024', dir='japan-2024', title='Return to Tokyo', collection='Japan 2024', companions=['Michael'],
         summary='A nine-day return to Tokyo after sophomore finals with friends, including a day trip to Mt. Fuji and Kawaguchiko and a first tour of the city for Michael.'),
    dict(id='2025-west-japan-road-trip', dir='2025-study-abroad/01-west-japan-road-trip', title='West Japan Road Trip',
         collection='West Japan Road Trip',
         summary='The opening week of the study abroad: arrival in Tokyo, the Shinkansen to Osaka, and a drive back across the Shimanami Kaido, Okayama, Himeji, Nara, and Hakone.'),
    dict(id='2025-hakone-fuji', dir='2025-study-abroad/02-hakone-fuji', title='Hakone and Mt. Fuji', collection='Hakone and Mt. Fuji',
         summary='A three-day weekend based in Manazuru, with Lake Ashi, Fuji-Q Highland, and the Gotemba outlets.'),
    dict(id='2025-alpine-route', dir='2025-study-abroad/03-alpine-route', title='Tateyama Kurobe Alpine Route',
         collection='Tateyama Kurobe Alpine Route',
         summary='A rail journey through the Northern Alps by the Azusa limited express, the Tateyama Kurobe Alpine Route, and the Hokuriku Shinkansen.'),
    dict(id='2025-kyoto-osaka-okinawa', dir='2025-study-abroad/04-kyoto-osaka-okinawa', title='Kyoto, Osaka, and Okinawa',
         collection='Kyoto, Osaka and Okinawa',
         summary='Ten days across Kyoto and Osaka by Shinkansen, followed by a flight to Okinawa and a drive around the island.'),
    dict(id='2025-korea-waterbomb', dir='2025-study-abroad/05-korea-waterbomb', title='Korea and Waterbomb', collection='Korea and Waterbomb',
         region='South Korea',
         summary='Eight days in Seoul from Tokyo, including the DMZ and the Waterbomb music festival in Goyang.'),
    dict(id='2025-tohoku-hokkaido', dir='2025-study-abroad/06-tohoku-hokkaido', title='Tohoku and Hokkaido', collection='Tohoku and Hokkaido',
         summary='North by Shinkansen, a round-trip drive from Sapporo to Cape Soya, the northernmost point of Japan, and the Hokuto limited express to Hakodate.'),
    dict(id='2025-kusatsu-onsen', dir='2025-study-abroad/07-kusatsu-onsen', title='Kusatsu Onsen', collection='Kusatsu Onsen',
         summary='An overnight visit to the hot spring town of Kusatsu in Gunma.'),
    dict(id='2025-ishigaki', dir='2025-study-abroad/08-ishigaki', title='Ishigaki and Taketomi', collection='Ishigaki and Taketomi',
         summary='The final trip of the semester: six days in the Yaeyama Islands, with boat trips, a drive along the coast of Ishigaki, and a visit to Taketomi.'),
    dict(id='2025-kanto-day-trips', dir='2025-study-abroad/kanto-day-trips', title='Kanto Day Trips', collection='Kanto Day Trips',
         summary='Fourteen day trips from Kodaira across the Kanto region and the Izu Peninsula between April and August 2025.'),
]


def clean(text):
    """Drop markdown, photo counts and notes addressed to Patrick from a road-map line."""
    text = text.replace('**', '').replace('*', '')
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
        title = h.group(4) or ''
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
    stops, legs, dates = [], [], []
    for f in geo['features']:
        p, g = f['properties'], f['geometry']
        if p.get('date'):
            dates.append(p['date'])
        if kanto and g['type'] == 'Point':
            d = date.fromisoformat(p['date'])
            stops.append({'name': p['name'], 'lat': latlng(g['coordinates'])[0], 'lng': latlng(g['coordinates'])[1],
                          'date': d.strftime('%b ') + str(d.day), 'mode': 'daytrip'})
            legs.append({'name': p['name'], 'mode': 'daytrip', 'coords': [KODAIRA, latlng(g['coordinates'])]})
        elif g['type'] == 'Point' and p.get('kind') == 'city':
            ll = latlng(g['coordinates'])
            stops.append({'name': p['name'], 'lat': ll[0], 'lng': ll[1],
                          'date': re.sub(r'^,\s*|,?\s*no photos', '', p.get('days', '')).strip()})
        elif g['type'] == 'LineString':
            legs.append({'name': clean(p['name']), 'mode': MODES.get(p.get('mode'), 'other'),
                         'coords': thin([latlng(c) for c in g['coordinates']])})
    if kanto:
        stops.insert(0, {'name': 'Kodaira (home base)', 'lat': KODAIRA[0], 'lng': KODAIRA[1], 'mode': 'daytrip'})
    return stops, legs, sorted(dates)


def j(v):
    return json.dumps(v, ensure_ascii=False)


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


def write_entry(e):
    src = TRIPS / e['dir']
    md = (src / 'road-map.md').read_text()
    geo = json.loads((src / 'stops.geojson').read_text())
    kanto = 'kanto' in e['dir']
    stops, legs, dates = map_data(geo, kanto)
    year = int(dates[0][:4])
    days = kanto_days(md, year) if kanto else parse_days(md, year)
    fm = ['---', f'title: {j(e["title"])}', f'summary: {j(e["summary"])}', f'start: {dates[0]}', f'end: {dates[-1]}',
          'category: Travel', f'region: {e.get("region", "Japan")}', f'collection: {j(e["collection"])}',
          f'companions: {j(e.get("companions", []))}', 'draft: true',
          f'# Cities and route from {e["dir"]}/stops.geojson.', 'stops:']
    fm += [f'  - {j(s)}' for s in stops]
    fm.append('legs:')
    fm += [f'  - {j(l)}' for l in legs]
    fm += timeline_yaml(days)
    fm += ['---', '', '*The full account of this sidequest is forthcoming.*', '']
    (OUT / f'{e["id"]}.md').write_text('\n'.join(fm))
    print(f'{e["id"]}: {len(days)} days, {len(stops)} stops, {len(legs)} legs')


def update_2023():
    path = OUT / 'japan-2023.md'
    text = path.read_text()
    _, fm, body = text.split('---\n', 2)
    fm = re.sub(r'# Day-by-day timeline.*?(?=^\S(?!.*timeline)|\Z)', '', fm, flags=re.S | re.M)
    fm = re.sub(r'^timeline:\n(?:  .*\n)*', '', fm, flags=re.M)
    days = parse_days((TRIPS / 'japan-2023/road-map.md').read_text(), 2023)
    fm = fm.rstrip('\n') + '\n' + '\n'.join(timeline_yaml(days)) + '\n'
    path.write_text(f'---\n{fm}---\n{body}')
    print(f'japan-2023: {len(days)} days (timeline only)')


if __name__ == '__main__':
    update_2023()
    for e in ENTRIES:
        write_entry(e)
