import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'switchyard-architecture',
  title: 'Switchyard  /  request path and control plane',
  width: 1120,
  height: 800,
  steps: [
    'Client sends an OpenAI-compatible request, streaming or not.',
    'Admission applies tenant budgets and fair queuing; overload gets 429.',
    'The keyer hashes canonical request bytes into a chain of block hashes.',
    "The policy matches the chain against each replica's cache, and reads load.",
    'The proxy takes a load ticket for the chosen replica and forwards.',
    'Tokens stream back; a failure before the first byte retries elsewhere.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;
const RG = 636;

d.zone({ x: 40, y: 206, w: 1040, h: 352, label: 'Switchyard router  /  one Go binary' });
d.zone({
  x: 40,
  y: 608,
  w: 1040,
  h: 182,
  label: 'GPU host  /  1 × RTX 4090, reference setup',
  tone: 'compute',
  labelAt: 'bottom-left',
});

const clients = d.card({
  x: 70,
  y: 76,
  label: 'Clients',
  detail: 'OpenAI SDKs, agents',
  icon: 'users',
  tone: 'external',
});
const admission = d.card({
  x: COL[0],
  y: R1,
  label: 'Admission control',
  detail: 'token buckets, fair queue',
  icon: 'shield-check',
});
const keyer = d.card({ x: COL[1], y: R1, label: 'Prefix keyer', detail: 'canonical bytes, hashed', icon: 'hash' });
const policy = d.card({
  x: COL[2],
  y: R1,
  label: 'Routing policy',
  detail: 'prefix_affinity (default)',
  icon: 'route',
  emphasis: true,
});
const proxy = d.card({
  x: COL[3],
  y: R1,
  label: 'Streaming proxy',
  detail: 'SSE, retry pre-first-byte',
  icon: 'arrow-right-left',
});
const health = d.card({
  x: COL[0],
  y: R2,
  label: 'Health + breakers',
  detail: 'active checks, cooldown',
  icon: 'heart-pulse',
});
const kv = d.card({ x: COL[1], y: R2, label: 'KV event subscriber', detail: 'ZeroMQ, precise mode', icon: 'radio' });
const index = d.store({ x: COL[2], y: R2, label: 'Prefix index', detail: 'per-replica LRU + TTL', icon: 'layers' });
const load = d.store({ x: COL[3], y: R2, label: 'Load tracker', detail: 'in-flight tickets, EWMA', icon: 'gauge' });
const replicas = COL.map((x, i) =>
  d.card({ x, y: RG, label: `vLLM replica ${i}`, detail: 'Qwen2.5-1.5B, 1 GiB KV', icon: 'cpu', tone: 'compute' })
);

const mid = (R1 + 100 + R2) / 2;
const gap = (R2 + 100 + RG) / 2;

d.edge({
  points: [
    [clients.cx, clients.bottom],
    [admission.cx, admission.top],
  ],
  step: 1,
  stepAt: [clients.cx, 212],
});
d.edge({
  points: [
    [admission.right, admission.cy],
    [keyer.left, keyer.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [keyer.right, keyer.cy],
    [policy.left, policy.cy],
  ],
  step: 3,
});
d.edge({
  points: [
    [640, policy.bottom],
    [640, index.top],
  ],
  step: 4,
});
d.edge({
  points: [
    [740, policy.bottom],
    [740, mid],
    [880, mid],
    [880, load.top],
  ],
  label: 'load',
  labelAt: [810, mid],
});
d.edge({
  points: [
    [policy.right, policy.cy],
    [proxy.left, proxy.cy],
  ],
  step: 5,
});
d.edge({
  points: [
    [proxy.right, proxy.cy],
    [1060, proxy.cy],
    [1060, replicas[3].cy],
    [replicas[3].right, replicas[3].cy],
  ],
  step: 6,
  stepAt: [1060, gap],
});
d.edge({
  points: [
    [960, proxy.bottom],
    [960, load.top],
  ],
  style: 'control',
  label: 'tickets',
  labelAt: [1018, mid],
});
d.edge({
  points: [
    [kv.right, kv.cy],
    [index.left, index.cy],
  ],
  style: 'event',
});
d.edge({
  points: [
    [kv.cx, replicas[1].top],
    [kv.cx, kv.bottom],
  ],
  style: 'event',
  label: 'KV events ×4, ZMQ',
  labelAt: [kv.cx, gap],
});
d.edge({
  points: [
    [health.cx, health.bottom],
    [health.cx, replicas[0].top],
  ],
  style: 'control',
  label: 'GET /health ×4',
  labelAt: [health.cx, gap],
});

export default d;
