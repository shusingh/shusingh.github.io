import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'agent-replay-architecture',
  title: 'Agent Replay  /  ingest off the main thread, draw from typed arrays',
  width: 1120,
  height: 600,
  steps: [
    'A JSONL trace is loaded into the page; there is no backend.',
    'A Web Worker parses it and builds typed arrays and an interval index.',
    'The buffers are transferred to the main thread zero-copy.',
    'Each frame, the render loop culls to the viewport and draws the canvas.',
    'React panels read the same index only when interaction settles.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;

d.zone({ x: 40, y: 206, w: 1040, h: 352, label: 'Browser tab  /  static site', labelAt: 'bottom-right' });

const trace = d.card({
  x: COL[0],
  y: 76,
  label: 'Trace file',
  detail: 'JSONL, 50k spans',
  icon: 'file-json',
  tone: 'external',
});
const you = d.card({ x: COL[3], y: 76, label: 'You', detail: 'pan, zoom, scrub', icon: 'user', tone: 'external' });

const worker = d.card({ x: COL[0], y: R1, label: 'Web Worker', detail: 'parse + build index', icon: 'workflow' });
const index = d.store({ x: COL[1], y: R1, label: 'TraceIndex', detail: 'SoA + interval tree', icon: 'layers' });
const loop = d.card({
  x: COL[2],
  y: R1,
  label: 'Render loop',
  detail: 'one rAF, cull + LOD',
  icon: 'refresh-cw',
  emphasis: true,
});
const viewport = d.card({ x: COL[3], y: R1, label: 'Viewport refs', detail: 'not React state', icon: 'crosshair' });

const payloads = d.store({ x: COL[0], y: R2, label: 'Payload store', detail: 'lazy, by span index', icon: 'archive' });
const panels = d.card({
  x: COL[1],
  y: R2,
  label: 'React panels',
  detail: 'inspector, replay, diff',
  icon: 'panels-top-left',
});
const canvas = d.card({
  x: COL[2],
  y: R2,
  label: 'Canvas waterfall',
  detail: '60fps at 50k spans',
  icon: 'chart-gantt',
});
d.card({ x: COL[3], y: R2, label: 'Span tree', detail: 'keyboard a11y view', icon: 'list-tree' });

const mid = (R1 + 100 + R2) / 2;

d.edge({
  points: [
    [trace.cx, trace.bottom],
    [worker.cx, worker.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [worker.right, worker.cy],
    [index.left, index.cy],
  ],
  style: 'event',
  step: 3,
});
d.edge({
  points: [
    [worker.cx, worker.bottom],
    [payloads.cx, payloads.top],
  ],
  style: 'event',
  step: 2,
  stepAt: [worker.cx, mid],
});
d.edge({
  points: [
    [index.right, index.cy],
    [loop.left, loop.cy],
  ],
  label: 'query',
  labelAt: [index.right + 20, index.cy - 22],
});
d.edge({
  points: [
    [loop.cx, loop.bottom],
    [canvas.cx, canvas.top],
  ],
  step: 4,
});
d.edge({
  points: [
    [viewport.left, viewport.cy],
    [loop.right, loop.cy],
  ],
  style: 'control',
});
d.edge({
  points: [
    [you.cx, you.bottom],
    [viewport.cx, viewport.top],
  ],
  style: 'control',
});
d.edge({
  points: [
    [index.cx, index.bottom],
    [panels.cx, panels.top],
  ],
  step: 5,
  label: 'on settle',
  labelAt: [index.cx + 58, mid],
});
d.edge({
  points: [
    [payloads.right, payloads.cy],
    [panels.left, panels.cy],
  ],
});

export default d;
