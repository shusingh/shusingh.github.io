import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'waymark-architecture',
  title: 'Waymark  /  local memory and grounded answers',
  width: 1120,
  height: 600,
  steps: [
    'You capture, import, decide, or ask from the CLI or the guided TUI.',
    'Both surfaces write through one memory model into local SQLite.',
    'Ask retrieves saved memories and the sources they came from.',
    'Ollama, if enabled, answers from those sources only, with citations.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;

d.zone({ x: 40, y: 206, w: 1040, h: 352, label: 'Your machine  /  no hosted service', labelAt: 'bottom-right' });

const you = d.card({ x: COL[0], y: 76, label: 'You', detail: 'in the terminal', icon: 'user', tone: 'external' });
d.card({ x: COL[3], y: 76, label: 'Local AI agents', detail: 'future consumers', icon: 'bot', tone: 'external' });

const cli = d.card({ x: COL[0], y: R1, label: 'Typer CLI', detail: 'capture, ask, decide', icon: 'square-terminal' });
const tui = d.card({ x: COL[1], y: R1, label: 'Textual TUI', detail: 'guided terminal app', icon: 'app-window' });
const imp = d.card({
  x: COL[2],
  y: R1,
  label: 'Explicit import',
  detail: 'preview-first, bounded',
  icon: 'file-input',
});
const ask = d.card({
  x: COL[3],
  y: R1,
  label: 'Ask with sources',
  detail: 'cite, or say not found',
  icon: 'search-check',
  emphasis: true,
});

const model = d.card({ x: COL[0], y: R2, label: 'Memory model', detail: 'entries, decisions, tags', icon: 'brain' });
const db = d.store({ x: COL[1], y: R2, label: 'SQLite', detail: 'local source of truth', icon: 'database' });
const backup = d.store({ x: COL[2], y: R2, label: 'Backup bundles', detail: 'portable, restorable', icon: 'archive' });
const ollama = d.card({
  x: COL[3],
  y: R2,
  label: 'Ollama',
  detail: 'optional, local model',
  icon: 'cpu',
  tone: 'compute',
});

const mid = (R1 + 100 + R2) / 2;

d.edge({
  points: [
    [you.cx, you.bottom],
    [cli.cx, cli.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [cli.cx, cli.bottom],
    [model.cx, model.top],
  ],
});
d.edge({
  points: [
    [tui.cx, tui.bottom],
    [tui.cx, mid - 8],
    [model.cx + 50, mid - 8],
    [model.cx + 50, model.top],
  ],
});
d.edge({
  points: [
    [model.right, model.cy],
    [db.left, db.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [imp.cx - 30, imp.bottom],
    [imp.cx - 30, mid + 8],
    [db.cx + 20, mid + 8],
    [db.cx + 20, db.top],
  ],
  label: 'after preview',
  labelAt: [imp.cx - 30, mid + 8],
});
d.edge({
  points: [
    [ask.cx - 60, ask.bottom],
    [ask.cx - 60, mid + 30],
    [db.cx + 70, mid + 30],
    [db.cx + 70, db.top],
  ],
  step: 3,
  stepAt: [ask.cx - 60, mid + 8],
});
d.edge({
  points: [
    [db.right, db.cy],
    [backup.left, backup.cy],
  ],
  style: 'control',
});
d.edge({
  points: [
    [ask.cx + 40, ask.bottom],
    [ask.cx + 40, ollama.top],
  ],
  step: 4,
  stepAt: [ask.cx + 40, mid],
});
d.edge({
  points: [
    [ask.cx, 176],
    [ask.cx, ask.top],
  ],
  style: 'control',
  label: 'grounded context, planned',
  labelAt: [ask.cx, 191],
  both: true,
});

export default d;
