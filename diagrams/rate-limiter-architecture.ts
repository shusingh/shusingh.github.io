import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'rate-limiter-architecture',
  title: 'Distributed rate limiter  /  one atomic decision in Redis',
  width: 1120,
  height: 600,
  steps: [
    'A request reaches any app instance; each embeds the Go limiter.',
    'The limiter runs one Lua script with the key, limit, and window.',
    'Inside Redis: trim old entries, count, insert if under limit, set TTL.',
    'Allow or throttle returns with metadata the caller turns into headers.',
  ],
});

const COL = [70, 320, 570, 820];

d.zone({ x: 40, y: 206, w: 490, h: 352, label: 'App instances', labelAt: 'bottom-left' });
d.zone({ x: 560, y: 206, w: 520, h: 352, label: 'Redis', tone: 'state', labelAt: 'bottom-right' });

const traffic = d.card({ x: 195, y: 76, label: 'Traffic', detail: 'any instance', icon: 'users', tone: 'external' });

const a = d.card({ x: COL[0], y: 248, label: 'Instance A', detail: 'Go limiter', icon: 'server' });
const b = d.card({ x: COL[1], y: 248, label: 'Instance B', detail: 'Go limiter', icon: 'server' });
d.card({ x: 195, y: 426, label: 'If Redis is down', detail: 'fail open or closed', icon: 'shield', tone: 'external' });

const lua = d.card({
  x: COL[2] + 20,
  y: 248,
  w: 440,
  label: 'Lua script',
  detail: 'trim, count, insert, TTL',
  icon: 'file-code',
  emphasis: true,
});
const zset = d.store({
  x: COL[2] + 20,
  y: 426,
  w: 440,
  label: 'Sorted set per key',
  detail: 'timestamps as scores',
  icon: 'database',
});

d.edge({
  points: [
    [traffic.cx - 60, traffic.bottom],
    [traffic.cx - 60, 222],
    [a.cx, 222],
    [a.cx, a.top],
  ],
  step: 1,
  stepAt: [a.cx, 232],
});
d.edge({
  points: [
    [traffic.cx + 60, traffic.bottom],
    [traffic.cx + 60, 222],
    [b.cx, 222],
    [b.cx, b.top],
  ],
});
d.edge({
  points: [
    [b.right, b.cy - 16],
    [lua.left, lua.cy - 16],
  ],
  step: 2,
  stepAt: [(b.right + lua.left) / 2, b.cy - 16],
});
d.edge({
  points: [
    [lua.left, lua.cy + 16],
    [b.right, b.cy + 16],
  ],
  step: 4,
  stepAt: [(b.right + lua.left) / 2, b.cy + 16],
});
d.edge({
  points: [
    [a.cx, a.bottom],
    [a.cx, 382],
    [lua.left + 40, 382],
    [lua.left + 40, lua.bottom],
  ],
  label: 'same script',
  labelAt: [(a.cx + lua.left) / 2 + 60, 382],
});
d.edge({
  points: [
    [lua.cx, lua.bottom],
    [zset.cx, zset.top],
  ],
  step: 3,
  both: true,
});

export default d;
