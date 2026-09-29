import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'michi-architecture',
  title: 'Michi  /  map-first planner on Vercel',
  width: 1120,
  height: 720,
  steps: [
    'The trip wizard sends destination, dates, interests, and pace.',
    'The Go API builds the prompt and calls Groq; the browser never does.',
    'The model returns one JSON object with coordinates for every place.',
    'The API normalizes it into the itinerary contract the UI renders.',
    'The UI pins places on the map and fetches photos from Wikipedia.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;

d.zone({ x: 40, y: 206, w: 740, h: 352, label: 'Vercel', labelAt: 'top-right' });

const you = d.card({ x: COL[0], y: 76, label: 'Traveler', detail: 'browser', icon: 'user', tone: 'external' });

const ui = d.card({ x: COL[0], y: R1, label: 'React UI', detail: 'wizard, typed state', icon: 'app-window' });
const api = d.card({
  x: COL[2],
  y: R1,
  label: 'Go API',
  detail: 'serverless function',
  icon: 'server',
  emphasis: true,
});
const map = d.card({ x: COL[0], y: R2, label: 'MapLibre GL', detail: '3D map, markers', icon: 'map' });
const normalize = d.card({
  x: COL[2],
  y: R2,
  label: 'Prompt + normalize',
  detail: 'one JSON contract',
  icon: 'braces',
});
const cards = d.card({ x: COL[1], y: R2, label: 'Itinerary cards', detail: 'photos or tinted tile', icon: 'image' });

const groq = d.card({ x: COL[3], y: R1, label: 'Groq', detail: 'llama-3.3-70b', icon: 'sparkles', tone: 'compute' });
const wiki = d.card({
  x: COL[1],
  y: 600,
  label: 'Wikipedia API',
  detail: 'place thumbnails',
  icon: 'globe',
  tone: 'external',
});
const tiles = d.card({
  x: COL[0],
  y: 600,
  label: 'OpenFreeMap',
  detail: 'keyless map tiles',
  icon: 'layout-grid',
  tone: 'external',
});

d.edge({
  points: [
    [you.cx, you.bottom],
    [ui.cx, ui.top],
  ],
});
d.edge({
  points: [
    [ui.right, ui.cy - 16],
    [api.left, api.cy - 16],
  ],
  step: 1,
  stepAt: [ui.right + 80, ui.cy - 16],
});
d.edge({
  points: [
    [api.left, api.cy + 16],
    [ui.right, ui.cy + 16],
  ],
  step: 4,
  stepAt: [api.left - 80, ui.cy + 16],
});
d.edge({
  points: [
    [api.right, api.cy - 16],
    [groq.left, groq.cy - 16],
  ],
  step: 2,
});
d.edge({
  points: [
    [groq.left, groq.cy + 16],
    [api.right, api.cy + 16],
  ],
  step: 3,
});
d.edge({
  points: [
    [api.cx, api.bottom],
    [normalize.cx, normalize.top],
  ],
  style: 'control',
  both: true,
});
d.edge({
  points: [
    [ui.cx, ui.bottom],
    [map.cx, map.top],
  ],
  label: 'pins',
  labelAt: [ui.cx, (R1 + 100 + R2) / 2],
});
d.edge({
  points: [
    [map.right, map.cy],
    [cards.left, cards.cy],
  ],
  style: 'control',
  both: true,
});
d.edge({
  points: [
    [cards.cx, cards.bottom],
    [wiki.cx, wiki.top],
  ],
  style: 'event',
  step: 5,
  label: 'photo lookup',
  labelAt: [cards.cx + 70, 580],
  stepAt: [cards.cx, 580],
});
d.edge({
  points: [
    [map.cx, map.bottom],
    [tiles.cx, tiles.top],
  ],
  style: 'event',
  label: 'tiles',
  labelAt: [map.cx + 42, 580],
});

export default d;
