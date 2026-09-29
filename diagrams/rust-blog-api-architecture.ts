import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'rust-blog-api-architecture',
  title: 'Rust blog API  /  HTTP at the edges, domain in the middle',
  width: 1120,
  height: 420,
  steps: [
    'Actix routes the request and extracts typed input.',
    'The handler validates and translates it into a domain operation.',
    'The domain layer owns posts and their rules; storage sits behind it.',
    'Domain errors map to HTTP responses in one place.',
  ],
});

const COL = [70, 320, 570, 820];
const R = 248;

d.zone({ x: 40, y: 206, w: 1040, h: 176, label: 'Actix Web service', labelAt: 'bottom-right' });

const client = d.card({ x: COL[0], y: 76, label: 'Client', detail: 'REST, JSON', icon: 'users', tone: 'external' });
const router = d.card({ x: COL[0], y: R, label: 'Router', detail: 'routes + extractors', icon: 'split' });
const handler = d.card({ x: COL[1], y: R, label: 'Handlers', detail: 'HTTP <-> domain', icon: 'arrow-right-left' });
const domain = d.card({ x: COL[2], y: R, label: 'Domain', detail: 'Post types, rules', icon: 'box', emphasis: true });
const store = d.store({ x: COL[3], y: R, label: 'Storage', detail: 'in memory, DB later', icon: 'database' });
const errors = d.card({
  x: COL[2],
  y: 76,
  label: 'Error types',
  detail: 'map to HTTP status',
  icon: 'triangle-alert',
  tone: 'external',
});

d.edge({
  points: [
    [client.cx, client.bottom],
    [router.cx, router.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [router.right, router.cy],
    [handler.left, handler.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [handler.right, handler.cy],
    [domain.left, domain.cy],
  ],
  step: 3,
});
d.edge({
  points: [
    [domain.right, domain.cy],
    [store.left, store.cy],
  ],
  both: true,
});
d.edge({
  points: [
    [domain.cx, domain.top],
    [errors.cx, errors.bottom],
  ],
  style: 'control',
  step: 4,
});
d.edge({
  points: [
    [errors.left, errors.cy],
    [client.right, client.cy],
  ],
  style: 'control',
  label: 'status + body',
});

export default d;
