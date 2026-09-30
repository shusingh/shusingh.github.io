import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'roundhouse-architecture',
  title: 'Roundhouse  /  create and exec path, one host',
  width: 1120,
  height: 850,
  steps: [
    'An agent asks for a sandbox, with its API key.',
    'The key is checked in constant time; per-key quotas apply.',
    'Admission reserves memory, vCPUs, and a uid, or answers 429.',
    'A warm pool of the same shape hands over a ready sandbox.',
    'Otherwise the booter restores the template for that shape.',
    'New jail, network namespace, and disk copy; Firecracker loads the snapshot.',
    'Commands and files go to the guest agent over vsock.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;
const RG = 636;

d.zone({ x: 40, y: 206, w: 1040, h: 352, label: 'roundhoused  /  one Go binary, root' });
d.zone({
  x: 40,
  y: 608,
  w: 1040,
  h: 232,
  label: 'Per-sandbox jail  /  chroot, cgroup, own uid, × N',
  tone: 'compute',
  labelAt: 'bottom-left',
});

const clients = d.card({
  x: 70,
  y: 76,
  label: 'Agents',
  detail: 'HTTP API, rhctl, SDK',
  icon: 'users',
  tone: 'external',
});
const api = d.card({ x: COL[0], y: R1, label: 'API + auth', detail: 'bearer keys, quotas', icon: 'key-round' });
const admission = d.card({
  x: COL[1],
  y: R1,
  label: 'Admission',
  detail: 'memory, vCPU, uid budget',
  icon: 'gauge',
});
const manager = d.card({
  x: COL[2],
  y: R1,
  label: 'Sandbox manager',
  detail: 'lifecycle, reaper',
  icon: 'boxes',
  emphasis: true,
});
const booter = d.card({
  x: COL[3],
  y: R1,
  label: 'Booter',
  detail: 'jailer, restore or boot',
  icon: 'server',
});
const nft = d.store({ x: COL[0], y: R2, label: 'Host nftables', detail: 'egress policy per netns', icon: 'shield' });
const pool = d.store({ x: COL[1], y: R2, label: 'Warm pool', detail: 'restored, probed, idle', icon: 'zap' });
const templates = d.store({
  x: COL[3],
  y: R2,
  label: 'Templates',
  detail: 'snapshot + manifest',
  icon: 'snowflake',
});
const netns = d.card({
  x: COL[0],
  y: RG,
  label: 'Network namespace',
  detail: 'tap0, veth, NAT',
  icon: 'network',
  tone: 'compute',
});
const disk = d.store({ x: COL[1], y: RG, label: 'Scratch disk', detail: 'sparse copy, overlay', icon: 'database' });
const agent = d.card({
  x: COL[2],
  y: RG,
  label: 'Guest agent (PID 1)',
  detail: 'exec, files, workload cg',
  icon: 'terminal',
  tone: 'compute',
});
const vmm = d.card({
  x: COL[3],
  y: RG,
  label: 'Firecracker VMM',
  detail: 'KVM, rate limiters',
  icon: 'cpu',
  tone: 'compute',
});

const mid = (R1 + 100 + R2) / 2;
const gap = (R2 + 100 + RG) / 2;
const lane1 = RG + 100 + 22;
const lane2 = RG + 100 + 46;

d.edge({
  points: [
    [clients.cx, clients.bottom],
    [api.cx, api.top],
  ],
  step: 1,
  stepAt: [clients.cx, 212],
});
d.edge({
  points: [
    [api.right, api.cy],
    [admission.left, admission.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [admission.right, admission.cy],
    [manager.left, manager.cy],
  ],
  step: 3,
});
d.edge({
  points: [
    [610, manager.bottom],
    [610, mid],
    [pool.cx, mid],
    [pool.cx, pool.top],
  ],
  step: 4,
  stepAt: [520, mid],
});
d.edge({
  points: [
    [manager.right, manager.cy],
    [booter.left, booter.cy],
  ],
  step: 5,
});
d.edge({
  points: [
    [booter.cx, booter.bottom],
    [booter.cx, templates.top],
  ],
  style: 'control',
  label: 'snapshot',
  labelAt: [booter.cx, mid],
});
d.edge({
  points: [
    [booter.right, booter.cy],
    [1060, booter.cy],
    [1060, vmm.cy],
    [vmm.right, vmm.cy],
  ],
  step: 6,
  stepAt: [1060, gap],
});
d.edge({
  points: [
    [720, manager.bottom],
    [720, agent.top],
  ],
  step: 7,
  stepAt: [720, gap],
});
d.edge({
  points: [
    [vmm.left, vmm.cy],
    [agent.right, agent.cy],
  ],
  both: true,
  label: 'vsock',
  labelAt: [800, RG - 20],
});
d.edge({
  points: [
    [vmm.cx - 40, vmm.bottom],
    [vmm.cx - 40, lane1],
    [disk.cx, lane1],
    [disk.cx, disk.bottom],
  ],
  label: 'virtio-blk',
  labelAt: [620, lane1],
});
d.edge({
  points: [
    [vmm.cx + 40, vmm.bottom],
    [vmm.cx + 40, lane2],
    [netns.cx, lane2],
    [netns.cx, netns.bottom],
  ],
  label: 'virtio-net, tap0',
  labelAt: [340, lane2],
});
d.edge({
  points: [
    [nft.cx, nft.bottom],
    [nft.cx, netns.top],
  ],
  style: 'control',
  label: 'drop host, private, metadata',
  labelAt: [nft.cx, gap],
});

export default d;
