import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'agentops-rag-architecture',
  title: 'AgentOps RAG  /  ingestion and answer paths',
  width: 1180,
  height: 780,
  steps: [
    'A client uploads a document; the tenant comes from JWT claims.',
    'The API stores metadata in Postgres and enqueues an ingestion job.',
    'The worker chunks and indexes; failed jobs go to a tenant-scoped DLQ.',
    'An ask request runs the planner, then tenant-filtered hybrid retrieval.',
    'The critic checks citation coverage; the finalizer answers or refuses.',
    'The answer or refusal returns with a trace ID.',
  ],
});

const W = 180;
const COL = [70, 286, 502, 718, 934];
const R1 = 248;
const R2 = 426;
const R3 = 640;

d.zone({ x: 40, y: 206, w: 1100, h: 352, label: 'API, workers, and agent runtime', labelAt: 'bottom-right' });
d.zone({ x: 40, y: 598, w: 1100, h: 172, label: 'Data plane', tone: 'state', labelAt: 'bottom-right' });

const client = d.card({
  x: COL[0],
  y: 76,
  w: W,
  label: 'Client app',
  detail: 'JWT per tenant',
  icon: 'users',
  tone: 'external',
});
d.card({
  x: COL[2],
  y: 76,
  w: 396,
  label: 'Eval harness + benchmarks',
  detail: 'citation P/R, refusals, p50/p95',
  icon: 'list-checks',
  tone: 'external',
});

const api = d.card({ x: COL[0], y: R1, w: W, label: 'FastAPI', detail: 'auth, rate limits', icon: 'server' });
const planner = d.card({ x: COL[1], y: R1, w: W, label: 'Planner', detail: 'bounded plan', icon: 'clipboard-list' });
const retriever = d.card({
  x: COL[2],
  y: R1,
  w: W,
  label: 'Retriever tool',
  detail: 'BM25 + vector, fused',
  icon: 'search',
});
const critic = d.card({
  x: COL[3],
  y: R1,
  w: W,
  label: 'Coverage critic',
  detail: 'checks citations',
  icon: 'scale',
  emphasis: true,
});
const finalizer = d.card({
  x: COL[4],
  y: R1,
  w: W,
  label: 'Finalizer',
  detail: 'answer or refuse',
  icon: 'message-square-text',
});

const streams = d.card({
  x: COL[0],
  y: R2,
  w: W,
  label: 'Redis Streams',
  detail: 'ingestion jobs',
  icon: 'list-ordered',
  tone: 'queue',
});
const worker = d.card({ x: COL[1], y: R2, w: W, label: 'Ingest worker', detail: 'chunk + index', icon: 'workflow' });
const llm = d.card({
  x: COL[3],
  y: R2,
  w: W,
  label: 'LLM API',
  detail: 'model calls',
  icon: 'sparkles',
  tone: 'compute',
});
d.card({ x: COL[4], y: R2, w: W, label: 'OpenTelemetry', detail: 'a span per hop', icon: 'activity' });

const pg = d.store({ x: COL[0], y: R3, w: W, label: 'Postgres', detail: 'document metadata', icon: 'database' });
const dlq = d.card({
  x: COL[1],
  y: R3,
  w: W,
  label: 'Dead-letter queue',
  detail: 'scoped replay',
  icon: 'inbox',
  tone: 'queue',
});
const os = d.store({
  x: COL[2],
  y: R3,
  w: 396,
  label: 'OpenSearch',
  detail: 'BM25 + vector, tenant filter',
  icon: 'layers',
});

const gapTop = (R1 + 100 + R2) / 2;

d.edge({
  points: [
    [client.cx - 30, client.bottom],
    [api.cx - 30, api.top],
  ],
  step: 1,
  stepAt: [client.cx - 30, 212],
});
d.edge({
  points: [
    [api.left, api.cy],
    [54, api.cy],
    [54, pg.cy],
    [pg.left, pg.cy],
  ],
});
d.edge({
  points: [
    [api.cx, api.bottom],
    [streams.cx, streams.top],
  ],
  step: 2,
});
d.edge({
  points: [
    [streams.right, streams.cy],
    [worker.left, worker.cy],
  ],
  style: 'event',
});
d.edge({
  points: [
    [worker.cx, worker.bottom],
    [dlq.cx, dlq.top],
  ],
  style: 'event',
  label: 'on failure',
  labelAt: [worker.cx, (R2 + 100 + R3) / 2],
});
d.edge({
  points: [
    [worker.right, worker.cy],
    [os.left + 60, worker.cy],
    [os.left + 60, os.top],
  ],
  step: 3,
  stepAt: [os.left + 20, worker.cy],
});

d.edge({
  points: [
    [api.right, api.cy],
    [planner.left, planner.cy],
  ],
  step: 4,
});
d.edge({
  points: [
    [planner.right, planner.cy],
    [retriever.left, retriever.cy],
  ],
});
d.edge({
  points: [
    [retriever.cx + 40, retriever.bottom],
    [retriever.cx + 40, os.top],
  ],
  label: 'tenant filter',
  labelAt: [retriever.cx + 40, gapTop],
});
d.edge({
  points: [
    [retriever.right, retriever.cy],
    [critic.left, critic.cy],
  ],
});
d.edge({
  points: [
    [critic.right, critic.cy],
    [finalizer.left, finalizer.cy],
  ],
  step: 5,
});
d.edge({
  points: [
    [critic.cx, critic.bottom],
    [llm.cx, llm.top],
  ],
  style: 'control',
  label: 'prompts',
  labelAt: [critic.cx, gapTop],
  both: true,
});
d.edge({
  points: [
    [finalizer.cx, finalizer.top],
    [finalizer.cx, 191],
    [client.cx + 30, 191],
    [client.cx + 30, client.bottom],
  ],
  step: 6,
  stepAt: [finalizer.cx, 191],
});

export default d;
