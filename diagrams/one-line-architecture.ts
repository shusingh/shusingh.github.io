import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'one-line-architecture',
  title: 'One Line  /  every view derived from one map',
  width: 1120,
  height: 600,
  steps: [
    'You write one sentence and pick one mood.',
    'The entry is stored under its date key; that map is the only state.',
    'Streaks, flashbacks, the year map, and insights derive at render time.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;

d.zone({ x: 40, y: 206, w: 1040, h: 352, label: 'Browser  /  no backend, no account', labelAt: 'bottom-right' });

const you = d.card({ x: COL[0], y: 76, label: 'You', detail: 'once a day', icon: 'user', tone: 'external' });

const composer = d.card({ x: COL[0], y: R1, label: 'Composer', detail: 'one line, one mood', icon: 'notebook-pen' });
const entries = d.store({
  x: COL[1],
  y: R1,
  w: 460,
  label: 'Entries by date',
  detail: 'YYYY-MM-DD -> { text, mood }',
  icon: 'calendar-days',
  emphasis: true,
});
const ls = d.store({ x: COL[3], y: R1, label: 'localStorage', detail: 'persisted map', icon: 'hard-drive' });

const views = [
  d.card({ x: COL[0], y: R2, label: 'Streaks', detail: 'derived', icon: 'flame' }),
  d.card({ x: COL[1], y: R2, label: 'Flashbacks', detail: 'derived', icon: 'history' }),
  d.card({ x: COL[2], y: R2, label: 'Year map', detail: 'suminagashi marbling', icon: 'palette' }),
  d.card({ x: COL[3], y: R2, label: 'Insights', detail: 'monthly counts', icon: 'chart-column' }),
];

d.edge({
  points: [
    [you.cx, you.bottom],
    [composer.cx, composer.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [composer.right, composer.cy],
    [entries.left, entries.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [entries.right, entries.cy],
    [ls.left, ls.cy],
  ],
  both: true,
});
const bus = (R1 + 100 + R2) / 2;
views.forEach((view, i) => {
  const x = view.cx;
  const from = Math.min(Math.max(x, entries.left + 30), entries.right - 30);
  d.edge({
    points:
      from === x
        ? [
            [x, entries.bottom],
            [x, view.top],
          ]
        : [
            [from, entries.bottom],
            [from, bus],
            [x, bus],
            [x, view.top],
          ],
    style: 'control',
    ...(i === 2 ? { step: 3, stepAt: [x, bus] as [number, number] } : {}),
  });
});

export default d;
