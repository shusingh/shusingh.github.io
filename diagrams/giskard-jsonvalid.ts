import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'giskard-jsonvalid',
  title: 'Giskard  /  the JsonValid check',
  width: 1120,
  height: 600,
  steps: [
    'The check receives a JSON string or an already-parsed value.',
    'Strings are parsed; a parse error fails as invalid JSON.',
    'With a schema, the value is validated; a mismatch fails with a reason.',
    'A malformed schema is a configuration error, not a failed output.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;

d.zone({ x: 40, y: 206, w: 1040, h: 352, label: 'JsonValid  /  shipped in Giskard v3.0.0', labelAt: 'bottom-right' });

const input = d.card({
  x: COL[0],
  y: 76,
  label: 'LLM output',
  detail: 'string, dict, or list',
  icon: 'sparkles',
  tone: 'external',
});

const accept = d.card({
  x: COL[0],
  y: R1,
  label: 'Accept input',
  detail: 'string or parsed value',
  icon: 'braces',
  tag: 'THIS PR',
});
const parse = d.card({
  x: COL[1],
  y: R1,
  label: 'Parse JSON',
  detail: 'strings only',
  icon: 'file-code',
  tag: 'THIS PR',
});
const schema = d.card({
  x: COL[2],
  y: R1,
  label: 'Schema check',
  detail: 'optional JSON Schema',
  icon: 'shield',
  tag: 'THIS PR',
});
const pass = d.card({ x: COL[3], y: R1, label: 'Pass', detail: 'structured result', icon: 'circle-check' });

const badJson = d.card({
  x: COL[1],
  y: R2,
  label: 'Invalid JSON',
  detail: 'fail, with reason',
  icon: 'circle-x',
  tone: 'error',
});
const mismatch = d.card({
  x: COL[2],
  y: R2,
  label: 'Schema mismatch',
  detail: 'fail, with reason',
  icon: 'circle-x',
  tone: 'error',
});
const config = d.card({
  x: COL[3],
  y: R2,
  label: 'Bad schema',
  detail: 'configuration error',
  icon: 'triangle-alert',
  tone: 'error',
});

d.edge({
  points: [
    [input.cx, input.bottom],
    [accept.cx, accept.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [accept.right, accept.cy],
    [parse.left, parse.cy],
  ],
});
d.edge({
  points: [
    [parse.right, parse.cy],
    [schema.left, schema.cy],
  ],
  step: 2,
  stepAt: [parse.cx, parse.bottom + 39],
});
d.edge({
  points: [
    [schema.right, schema.cy],
    [pass.left, pass.cy],
  ],
});
d.edge({
  points: [
    [parse.cx, parse.bottom],
    [badJson.cx, badJson.top],
  ],
  style: 'control',
});
d.edge({
  points: [
    [schema.cx, schema.bottom],
    [mismatch.cx, mismatch.top],
  ],
  style: 'control',
  step: 3,
});
d.edge({
  points: [
    [schema.cx + 60, schema.bottom],
    [schema.cx + 60, (R1 + 100 + R2) / 2],
    [config.cx, (R1 + 100 + R2) / 2],
    [config.cx, config.top],
  ],
  style: 'control',
  step: 4,
  stepAt: [(schema.cx + 60 + config.cx) / 2, (R1 + 100 + R2) / 2],
});

export default d;
