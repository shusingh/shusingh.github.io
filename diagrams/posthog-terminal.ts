import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'posthog-terminal',
  title: 'PostHog Code  /  decode at the boundary',
  width: 1120,
  height: 470,
  steps: [
    'The shell process writes raw bytes to the PTY.',
    'The shell service decodes them as UTF-8, once, at the boundary.',
    'The terminal renderer receives valid strings only.',
    "It draws them with the app's code font instead of browser defaults.",
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 118;
const R2 = 296;

d.zone({ x: 290, y: 76, w: 510, h: 352, label: 'Shell service', labelAt: 'bottom-left' });
d.zone({ x: 810, y: 76, w: 270, h: 352, label: 'Renderer', tone: 'queue', labelAt: 'bottom-right' });

const pty = d.card({
  x: COL[0],
  y: R1,
  w: 190,
  label: 'PTY',
  detail: 'shell process bytes',
  icon: 'square-terminal',
  tone: 'external',
});
const stream = d.card({ x: COL[1], y: R1, w: 200, label: 'Byte stream', detail: 'raw PTY output', icon: 'binary' });
const decode = d.card({
  x: COL[2] - 20,
  y: R1,
  w: 200,
  label: 'UTF-8 decode',
  detail: 'multibyte safe',
  icon: 'type',
  emphasis: true,
  tag: 'THIS PR',
});
const term = d.card({
  x: COL[3] + 20,
  y: R1,
  w: 230,
  label: 'Terminal surface',
  detail: 'strings in, glyphs out',
  icon: 'monitor',
});
const font = d.card({
  x: COL[3] + 20,
  y: R2,
  w: 230,
  label: 'Code font stack',
  detail: "the app's code font",
  icon: 'type',
  tag: 'THIS PR',
});
const tests = d.card({
  x: COL[1],
  y: R2,
  w: 200,
  label: 'Service tests',
  detail: 'updated in the PR',
  icon: 'list-checks',
  tone: 'external',
});

d.edge({
  points: [
    [pty.right, pty.cy],
    [stream.left, stream.cy],
  ],
  step: 1,
});
d.edge({
  points: [
    [stream.right, stream.cy],
    [decode.left, decode.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [decode.right, decode.cy],
    [term.left, term.cy],
  ],
  step: 3,
  label: 'string',
  labelAt: [(decode.right + term.left) / 2, decode.cy - 24],
});
d.edge({
  points: [
    [font.cx, font.top],
    [term.cx, term.bottom],
  ],
  style: 'control',
  step: 4,
});
d.edge({
  points: [
    [tests.right, tests.cy],
    [decode.cx, tests.cy],
    [decode.cx, decode.bottom],
  ],
  style: 'control',
});

export default d;
