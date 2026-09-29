import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'driftboard-architecture',
  title: 'Driftboard  /  one undoable action per move',
  width: 1120,
  height: 600,
  steps: [
    'You drag a card; hover positions live in a throwaway working copy.',
    'On drop, one typed action commits the move to the board store.',
    'zundo records it as a single undo entry.',
    'The persistence layer mirrors the board to localStorage.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;

d.zone({ x: 40, y: 206, w: 1040, h: 352, label: 'Browser  /  no backend', labelAt: 'bottom-right' });

const you = d.card({ x: COL[0], y: 76, label: 'You', detail: 'drag, type, filter', icon: 'user', tone: 'external' });
const file = d.card({
  x: COL[3],
  y: 76,
  label: 'JSON file',
  detail: 'import / export',
  icon: 'file-json',
  tone: 'external',
});

const dnd = d.card({ x: COL[0], y: R1, label: 'Board UI', detail: 'dnd-kit, palette', icon: 'layout-grid' });
const working = d.card({ x: COL[1], y: R1, label: 'Working copy', detail: 'hover state only', icon: 'copy' });
const board = d.store({ x: COL[2], y: R1, label: 'Board store', detail: 'Zustand, typed actions', icon: 'database' });
const persist = d.card({ x: COL[3], y: R1, label: 'Persistence', detail: 'mirror on change', icon: 'save' });

const ui = d.store({
  x: COL[0],
  y: R2,
  label: 'UI store',
  detail: 'theme, filters, focus',
  icon: 'sliders-horizontal',
});
const undo = d.card({
  x: COL[2],
  y: R2,
  label: 'zundo history',
  detail: 'undo / redo',
  icon: 'undo-2',
  emphasis: true,
});
const ls = d.store({ x: COL[3], y: R2, label: 'localStorage', detail: 'board state', icon: 'hard-drive' });

d.edge({
  points: [
    [you.cx, you.bottom],
    [dnd.cx, dnd.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [dnd.right, dnd.cy],
    [working.left, working.cy],
  ],
  style: 'control',
});
d.edge({
  points: [
    [working.right, working.cy],
    [board.left, board.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [board.cx, board.bottom],
    [undo.cx, undo.top],
  ],
  step: 3,
  both: true,
});
d.edge({
  points: [
    [board.right, board.cy],
    [persist.left, persist.cy],
  ],
});
d.edge({
  points: [
    [persist.cx, persist.bottom],
    [ls.cx, ls.top],
  ],
  step: 4,
});
d.edge({
  points: [
    [dnd.cx, dnd.bottom],
    [ui.cx, ui.top],
  ],
  style: 'control',
  label: 'not undoable',
  labelAt: [dnd.cx, (R1 + 100 + R2) / 2],
});
d.edge({
  points: [
    [file.left, file.cy],
    [board.cx + 50, file.cy],
    [board.cx + 50, board.top],
  ],
  style: 'control',
  both: true,
});

export default d;
