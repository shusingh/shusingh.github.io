import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'dify-socketio',
  title: 'Dify  /  realtime events across workers',
  width: 1120,
  height: 610,
  steps: [
    'Configuration says whether collaboration mode is on.',
    'Each worker picks its Socket.IO manager when it builds the server.',
    'With collaboration on, a Redis manager relays events between workers.',
    'A client on worker 2 receives an event emitted on worker 1.',
  ],
});

const COL = [70, 320, 570, 820];
const R = 248;

d.zone({ x: 40, y: 206, w: 500, h: 176, label: 'API worker 1', labelAt: 'bottom-left' });
d.zone({ x: 580, y: 206, w: 500, h: 176, label: 'API worker 2', labelAt: 'bottom-right' });

const config = d.card({
  x: 445,
  y: 76,
  w: 230,
  label: 'Collaboration config',
  detail: 'mode + Redis URL',
  icon: 'sliders-horizontal',
  tone: 'external',
});
const c1 = d.card({ x: COL[0], y: 76, label: 'Client A', detail: 'Socket.IO', icon: 'user', tone: 'external' });
const c2 = d.card({
  x: COL[3] + 30,
  y: 76,
  w: 180,
  label: 'Client B',
  detail: 'Socket.IO',
  icon: 'user',
  tone: 'external',
});

const s1 = d.card({ x: COL[0], y: R, label: 'Socket.IO server', detail: 'events', icon: 'radio' });
const m1 = d.card({
  x: COL[1] - 10,
  y: R,
  label: 'Manager selection',
  detail: 'Redis or in-memory',
  icon: 'git-branch',
  emphasis: true,
  tag: 'THIS PR',
});
const m2 = d.card({
  x: COL[2] + 30,
  y: R,
  label: 'Manager selection',
  detail: 'Redis or in-memory',
  icon: 'git-branch',
  emphasis: true,
  tag: 'THIS PR',
});
const s2 = d.card({ x: COL[3] + 30, y: R, w: 180, label: 'Socket.IO server', detail: 'events', icon: 'radio' });

const redis = d.store({ x: 330, y: 440, w: 460, label: 'Redis', detail: 'shared pub/sub channel', icon: 'database' });

d.edge({
  points: [
    [config.cx - 40, config.bottom],
    [config.cx - 40, 222],
    [m1.cx, 222],
    [m1.cx, m1.top],
  ],
  style: 'control',
  step: 1,
  stepAt: [config.cx - 40, 196],
});
d.edge({
  points: [
    [config.cx + 40, config.bottom],
    [config.cx + 40, 222],
    [m2.cx, 222],
    [m2.cx, m2.top],
  ],
  style: 'control',
});
d.edge({
  points: [
    [m1.left, m1.cy],
    [s1.right, s1.cy],
  ],
  style: 'control',
  step: 2,
});
d.edge({
  points: [
    [m2.right, m2.cy],
    [s2.left, s2.cy],
  ],
  style: 'control',
});
d.edge({
  points: [
    [c1.cx, c1.bottom],
    [s1.cx, s1.top],
  ],
  both: true,
});
d.edge({
  points: [
    [c2.cx, c2.bottom],
    [s2.cx, s2.top],
  ],
  both: true,
  step: 4,
  stepAt: [c2.cx, 196],
});
d.edge({
  points: [
    [s1.cx, s1.bottom],
    [s1.cx, redis.cy],
    [redis.left, redis.cy],
  ],
  style: 'event',
  both: true,
  step: 3,
  stepAt: [s1.cx, 414],
});
d.edge({
  points: [
    [s2.cx, s2.bottom],
    [s2.cx, redis.cy],
    [redis.right, redis.cy],
  ],
  style: 'event',
  both: true,
});
d.note(560, 580, 'Collaboration off: the in-memory manager, exactly as before.', 'middle');

export default d;
