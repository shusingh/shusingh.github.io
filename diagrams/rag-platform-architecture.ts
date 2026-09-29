import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'rag-platform-architecture',
  title: 'RAG platform  /  retrieval as its own service boundary',
  width: 1120,
  height: 620,
  steps: [
    'A client sends a query; the Go API validates it against a typed contract.',
    'The query is normalized; the cache key includes the index version.',
    'On a miss, OpenSearch retrieves with metadata filters, then results rank.',
    'Citations are assembled from Postgres records and returned with results.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const RD = 470;

d.zone({ x: 40, y: 206, w: 1040, h: 176, label: 'Go service', labelAt: 'bottom-right' });
d.zone({ x: 40, y: 430, w: 1040, h: 170, label: 'State', tone: 'state', labelAt: 'bottom-right' });

const client = d.card({ x: COL[0], y: 76, label: 'Client', detail: 'typed API', icon: 'users', tone: 'external' });

const api = d.card({ x: COL[0], y: R1, label: 'Go API', detail: 'validate request', icon: 'server' });
const norm = d.card({ x: COL[1], y: R1, label: 'Normalizer', detail: 'canonical query', icon: 'type' });
const retrieve = d.card({
  x: COL[2],
  y: R1,
  label: 'Retrieve + rank',
  detail: 'ranking boundary',
  icon: 'search',
  emphasis: true,
});
const cite = d.card({ x: COL[3], y: R1, label: 'Citation assembly', detail: 'evidence first', icon: 'quote' });

const redis = d.store({ x: COL[1], y: RD, label: 'Redis', detail: 'keyed by index version', icon: 'zap' });
const os = d.store({ x: COL[2], y: RD, label: 'OpenSearch', detail: 'search + filters', icon: 'layers' });
const pg = d.store({ x: COL[3], y: RD, label: 'Postgres', detail: 'document, query records', icon: 'database' });

d.edge({
  points: [
    [client.cx, client.bottom],
    [api.cx, api.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [api.right, api.cy],
    [norm.left, norm.cy],
  ],
});
d.edge({
  points: [
    [norm.cx, norm.bottom],
    [redis.cx, redis.top],
  ],
  step: 2,
  both: true,
  label: 'cache',
  labelAt: [norm.cx + 56, 406],
  stepAt: [norm.cx, 406],
});
d.edge({
  points: [
    [norm.right, norm.cy],
    [retrieve.left, retrieve.cy],
  ],
  label: 'miss',
  labelAt: [(norm.right + retrieve.left) / 2, norm.cy - 22],
});
d.edge({
  points: [
    [retrieve.cx, retrieve.bottom],
    [os.cx, os.top],
  ],
  step: 3,
});
d.edge({
  points: [
    [retrieve.right, retrieve.cy],
    [cite.left, cite.cy],
  ],
});
d.edge({
  points: [
    [cite.cx, cite.bottom],
    [pg.cx, pg.top],
  ],
  step: 4,
});
d.edge({
  points: [
    [cite.cx, cite.top],
    [cite.cx, 191],
    [client.cx + 50, 191],
    [client.cx + 50, client.bottom],
  ],
  label: 'results + citations',
  labelAt: [(cite.cx + client.cx) / 2, 191],
});

export default d;
