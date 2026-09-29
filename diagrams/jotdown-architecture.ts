import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'jotdown-architecture',
  title: 'Jotdown  /  a native shell around a web editor',
  width: 1120,
  height: 600,
  steps: [
    'You type Markdown; CodeMirror renders it in place as you go.',
    'The editor posts small messages: text, color, drag, pin, close.',
    'Swift moves windows and persists the note as JSON and a .md file.',
    'The same editor page runs headless in a browser for parity tests.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;

d.zone({ x: 40, y: 206, w: 490, h: 352, label: 'Swift / AppKit shell', labelAt: 'bottom-left' });
d.zone({ x: 560, y: 206, w: 520, h: 352, label: 'WKWebView', tone: 'queue', labelAt: 'bottom-right' });

const you = d.card({ x: COL[3], y: 76, label: 'You', detail: 'typing a note', icon: 'user', tone: 'external' });
const tests = d.card({
  x: COL[2],
  y: 76,
  label: 'Parity tests',
  detail: 'headless browser',
  icon: 'list-checks',
  tone: 'external',
});

const menu = d.card({ x: COL[0], y: R1, label: 'Menu bar + Dock', detail: 'app lifecycle', icon: 'app-window-mac' });
const windows = d.card({ x: COL[1], y: R1, label: 'Note windows', detail: 'one NSWindow each', icon: 'layout-grid' });
const bridge = d.card({
  x: COL[1],
  y: R2,
  label: 'Message bridge',
  detail: 'WKScriptMessage',
  icon: 'cable',
  emphasis: true,
});
const files = d.store({ x: COL[0], y: R2, label: 'Notes on disk', detail: 'JSON + .md mirror', icon: 'hard-drive' });

const editor = d.card({
  x: COL[2] + 20,
  y: R1,
  w: 440,
  label: 'CodeMirror 6 editor',
  detail: 'live-preview decorations',
  icon: 'notebook-pen',
});
const keys = d.card({
  x: 660,
  y: R2,
  w: 190,
  label: 'Toolbar + keymaps',
  detail: 'lists, checkboxes',
  icon: 'keyboard',
});
const code = d.card({ x: 870, y: R2, w: 190, label: 'Code blocks', detail: 'highlight, auto-tag', icon: 'braces' });

d.edge({
  points: [
    [you.cx, you.bottom],
    [you.cx, editor.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [tests.cx - 40, tests.bottom],
    [tests.cx - 40, editor.top],
  ],
  style: 'control',
  step: 4,
});
d.edge({
  points: [
    [menu.right, menu.cy],
    [windows.left, windows.cy],
  ],
  style: 'control',
});
d.edge({
  points: [
    [editor.left + 25, editor.bottom],
    [editor.left + 25, bridge.cy],
    [bridge.right, bridge.cy],
  ],
  style: 'event',
  step: 2,
  stepAt: [editor.left + 25, (R1 + 100 + R2) / 2],
});
d.edge({
  points: [
    [bridge.cx - 40, bridge.top],
    [bridge.cx - 40, windows.bottom],
  ],
  style: 'control',
  label: 'move, pin',
  labelAt: [bridge.cx - 40, (R1 + 100 + R2) / 2],
});
d.edge({
  points: [
    [bridge.left, bridge.cy],
    [files.right, files.cy],
  ],
  step: 3,
});
d.edge({
  points: [
    [keys.cx, keys.top],
    [keys.cx, editor.bottom],
  ],
  style: 'control',
});
d.edge({
  points: [
    [code.cx, code.top],
    [code.cx, editor.bottom],
  ],
  style: 'control',
});

export default d;
