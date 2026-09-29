import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'agent-framework-null',
  title: 'Agent Framework  /  keeping an explicit null',
  width: 1120,
  height: 460,
  steps: [
    'A tool is called directly, or by the model through function calling.',
    "Arguments are validated against the tool's schema.",
    'The argument dump used to drop explicit nulls; now it keeps them.',
    'The tool receives x=None, distinct from a missing argument.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 110;
const R2 = 290;
const MID = (R1 + R2) / 2;

d.zone({ x: 40, y: 76, w: 1040, h: 350, label: 'microsoft/agent-framework', labelAt: 'bottom-right' });

const direct = d.card({
  x: COL[0],
  y: R1,
  label: 'Your code',
  detail: 'FunctionTool.invoke()',
  icon: 'square-terminal',
});
const auto = d.card({
  x: COL[0],
  y: R2,
  label: 'Model tool call',
  detail: 'auto function calling',
  icon: 'sparkles',
  tone: 'compute',
});
const validate = d.card({
  x: COL[1],
  y: MID,
  label: 'Schema validation',
  detail: 'required, nullable',
  icon: 'shield',
});
const dump = d.card({
  x: COL[2],
  y: MID,
  label: 'Argument dump',
  detail: 'keeps explicit null',
  icon: 'braces',
  emphasis: true,
  tag: 'THIS PR',
});
const tool = d.card({ x: COL[3], y: MID, label: 'Tool function', detail: 'receives x=None', icon: 'wrench' });

d.edge({
  points: [
    [direct.right, direct.cy],
    [300, direct.cy],
    [300, validate.cy - 20],
    [validate.left, validate.cy - 20],
  ],
  step: 1,
  stepAt: [300, (direct.cy + validate.cy) / 2],
});
d.edge({
  points: [
    [auto.right, auto.cy],
    [300, auto.cy],
    [300, validate.cy + 20],
    [validate.left, validate.cy + 20],
  ],
});
d.edge({
  points: [
    [validate.right, validate.cy],
    [dump.left, dump.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [dump.right, dump.cy],
    [tool.left, tool.cy],
  ],
  step: 3,
});
d.note(dump.cx, dump.bottom + 30, 'Before: {"x": null} arrived as a missing x', 'middle');
d.note(tool.cx, tool.bottom + 30, 'Both paths now share one contract', 'middle');
d.badge(tool.right - 18, tool.top + 18, 4);

export default d;
