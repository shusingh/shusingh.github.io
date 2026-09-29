import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'strands-multi-agent-architecture',
  title: 'Strands multi-agent  /  narrow roles over explicit state',
  width: 1120,
  height: 600,
  steps: [
    'A task enters as a structured definition, not a chat message.',
    'The planner writes a plan; the executor performs the next bounded action.',
    'The critic returns structured findings against a rubric.',
    'The refiner applies targeted revisions, or the loop finalizes.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;

d.zone({ x: 40, y: 206, w: 1040, h: 352, label: 'Bounded agent loop', labelAt: 'bottom-right' });

const task = d.card({
  x: COL[0],
  y: 76,
  label: 'Task',
  detail: 'structured definition',
  icon: 'clipboard-list',
  tone: 'external',
});
const human = d.card({
  x: COL[3],
  y: 76,
  label: 'Human feedback',
  detail: 'updates state',
  icon: 'user',
  tone: 'external',
});

const planner = d.card({ x: COL[0], y: R1, label: 'Planner', detail: 'plan JSON', icon: 'route' });
const executor = d.card({ x: COL[1], y: R1, label: 'Executor', detail: 'next bounded action', icon: 'play' });
const critic = d.card({
  x: COL[2],
  y: R1,
  label: 'Critic',
  detail: 'findings, severity, fix',
  icon: 'scale',
  emphasis: true,
});
const refiner = d.card({ x: COL[3], y: R1, label: 'Refiner', detail: 'targeted revision', icon: 'wrench' });

d.card({ x: COL[0], y: R2, label: 'Schemas', detail: 'contract per role', icon: 'braces', tone: 'external' });
const state = d.store({
  x: COL[1],
  y: R2,
  w: 460,
  label: 'Task state',
  detail: 'task, plan, revision history',
  icon: 'database',
});
d.card({ x: COL[3], y: R2, label: 'Eval cases', detail: 'bounded retries', icon: 'list-checks', tone: 'external' });

const mid = (R1 + 100 + R2) / 2;

d.edge({
  points: [
    [task.cx, task.bottom],
    [planner.cx, planner.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [planner.right, planner.cy],
    [executor.left, executor.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [executor.right, executor.cy],
    [critic.left, critic.cy],
  ],
});
d.edge({
  points: [
    [critic.right, critic.cy],
    [refiner.left, refiner.cy],
  ],
  step: 3,
});
d.edge({
  points: [
    [refiner.cx, refiner.top],
    [refiner.cx, 222],
    [executor.cx, 222],
    [executor.cx, executor.top],
  ],
  step: 4,
  stepAt: [refiner.cx, 222],
  label: 'not good enough',
  labelAt: [(executor.cx + refiner.cx) / 2, 222],
});
d.edge({
  points: [
    [refiner.cx + 60, human.bottom],
    [refiner.cx + 60, refiner.top],
  ],
  style: 'control',
});
for (const agent of [executor, critic]) {
  d.edge({
    points: [
      [agent.cx, agent.bottom],
      [agent.cx, state.top],
    ],
    style: 'event',
    both: true,
  });
}
d.edge({
  points: [
    [planner.cx, planner.bottom],
    [planner.cx, mid],
    [state.left + 40, mid],
    [state.left + 40, state.top],
  ],
  style: 'event',
  both: true,
});
d.edge({
  points: [
    [refiner.cx, refiner.bottom],
    [refiner.cx, mid],
    [state.right - 40, mid],
    [state.right - 40, state.top],
  ],
  style: 'event',
  both: true,
  label: 'read / write',
  labelAt: [refiner.cx, mid],
});

export default d;
