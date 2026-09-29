// A small kit for drawing system design diagrams as SVG in the site's visual
// language: cards with Lucide icons, datastores as cylinders, dashed boundary
// zones, orthogonal edges with rounded corners, numbered request steps, and a
// generated legend. Diagrams are specs in diagrams/*.ts; scripts/build-diagrams.ts
// renders them to WebP.
//
// Coordinates are explicit (x, y in SVG units) so every diagram is laid out by
// hand like a real design doc figure; the kit handles drawing, consistency, and
// the checks that are easy to get wrong by eye, such as text overflowing a card.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconDir = path.resolve(__dirname, '..', '..', 'node_modules', 'lucide-static', 'icons');

const INK = '#1a1a1f';
const PAPER = '#f7f3eb';
const CARD = '#fbf8f2';
const MUTED = '#67635b';
const BODY = '#3a3833';

/** A component's role, which sets its color. */
export type Tone = 'service' | 'state' | 'compute' | 'queue' | 'external' | 'error' | 'change';

const TONES: Record<Tone, { color: string; legend: string }> = {
  service: { color: '#16407a', legend: 'Service or component' },
  state: { color: '#2e6e52', legend: 'Datastore or state' },
  compute: { color: '#c0432e', legend: 'Model or compute' },
  queue: { color: '#8a5a12', legend: 'Queue or stream' },
  external: { color: MUTED, legend: 'External system' },
  error: { color: '#9a3324', legend: 'Failure outcome' },
  change: { color: '#c0432e', legend: 'Changed by this PR' },
};

export type EdgeStyle = 'request' | 'event' | 'control';

const EDGE_LEGEND: Record<EdgeStyle, string> = {
  request: 'Request path',
  event: 'Async or event',
  control: 'Control or config',
};

const EDGE_COLOR: Record<EdgeStyle, string> = { request: INK, event: '#16407a', control: MUTED };

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface CardSpec {
  x: number;
  y: number;
  label: string;
  detail?: string;
  icon: string;
  tone?: Tone;
  w?: number;
  h?: number;
  /** A heavier border for the component the diagram is about. */
  emphasis?: boolean;
  /** A small tag in the top-right corner, such as "THIS PR". */
  tag?: string;
}

export interface ZoneSpec {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tone?: Tone;
  labelAt?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface EdgeSpec {
  /** Waypoints; corners are rounded automatically. */
  points: [number, number][];
  style?: EdgeStyle;
  label?: string;
  /** Where to center the label; defaults to the middle of the longest segment. */
  labelAt?: [number, number];
  /** A numbered step badge and where to put it. */
  step?: number;
  stepAt?: [number, number];
  /** Arrowheads at both ends. */
  both?: boolean;
}

export interface DiagramSpec {
  name: string;
  title: string;
  width: number;
  /** Height of the drawing area; the footer is added below it. */
  height: number;
  figure?: number;
  /** Numbered steps explained in the footer, matching edge step badges. */
  steps?: string[];
}

// Approximate advance widths, used to catch text that would overflow its box.
// JetBrains Mono is exactly 0.6em; Hanken Grotesk semibold averages under 0.5em,
// so 0.5em is a safe upper bound for labels.
const labelWidth = (text: string, size = 16) => text.length * size * 0.5;
const monoWidth = (text: string, size: number) => text.length * size * 0.6;

const esc = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/×/g, '&#215;');

function iconMarkup(name: string, cx: number, cy: number, color: string, size = 18): string {
  const file = path.join(iconDir, `${name}.svg`);
  if (!fs.existsSync(file)) throw new Error(`unknown Lucide icon "${name}"`);
  const body = fs
    .readFileSync(file, 'utf8')
    .replace(/^[\s\S]*?<svg[^>]*>|<\/svg>[\s\S]*$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const scale = size / 24;
  return (
    `<g transform="translate(${cx - size / 2},${cy - size / 2}) scale(${scale})" fill="none" ` +
    `stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</g>`
  );
}

function box(x: number, y: number, w: number, h: number): Box {
  return { x, y, w, h, cx: x + w / 2, cy: y + h / 2, top: y, bottom: y + h, left: x, right: x + w };
}

/** Builds an SVG path through the points, rounding each corner. */
function roundedPath(points: [number, number][], radius = 6): string {
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const inLen = Math.hypot(x - px, y - py);
    const outLen = Math.hypot(nx - x, ny - y);
    const r = Math.min(radius, inLen / 2, outLen / 2);
    const ax = x - ((x - px) / inLen) * r;
    const ay = y - ((y - py) / inLen) * r;
    const bx = x + ((nx - x) / outLen) * r;
    const by = y + ((ny - y) / outLen) * r;
    d += ` L${ax},${ay} Q${x},${y} ${bx},${by}`;
  }
  const last = points[points.length - 1];
  return `${d} L${last[0]},${last[1]}`;
}

export class Diagram {
  private readonly zones: string[] = [];
  private readonly edges: string[] = [];
  private readonly nodes: string[] = [];
  private readonly overlays: string[] = [];
  private readonly tones = new Set<Tone>();
  private readonly edgeStyles = new Set<EdgeStyle>();
  private usesCylinder = false;

  constructor(readonly spec: DiagramSpec) {}

  zone({ x, y, w, h, label, tone = 'service', labelAt = 'top-right' }: ZoneSpec): Box {
    const color = TONES[tone].color;
    const right = labelAt.endsWith('right');
    const tx = right ? x + w - 20 : x + 20;
    const ty = labelAt.startsWith('top') ? y + 24 : y + h - 16;
    this.zones.push(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${color}" fill-opacity="0.035" ` +
        `stroke="${color}" stroke-opacity="0.45" stroke-dasharray="7 5"/>` +
        `<text x="${tx}" y="${ty}" class="zone" fill="${color}"${right ? ' text-anchor="end"' : ''}>${esc(label.toUpperCase())}</text>`
    );
    return box(x, y, w, h);
  }

  private checkFit(spec: CardSpec, w: number) {
    const inner = w - 20;
    if (labelWidth(spec.label) > inner) {
      throw new Error(`${this.spec.name}: label "${spec.label}" overflows a ${w}px card`);
    }
    if (spec.detail && monoWidth(spec.detail, 12.5) > inner) {
      throw new Error(`${this.spec.name}: detail "${spec.detail}" overflows a ${w}px card`);
    }
  }

  private tile(icon: string, cx: number, top: number, color: string): string {
    return (
      `<rect x="${cx - 16}" y="${top}" width="32" height="32" rx="8" fill="${color}" fill-opacity="0.10"/>` +
      iconMarkup(icon, cx, top + 16, color)
    );
  }

  private text(spec: CardSpec, cx: number, labelY: number): string {
    let out = `<text x="${cx}" y="${labelY}" class="label">${esc(spec.label)}</text>`;
    if (spec.detail) out += `<text x="${cx}" y="${labelY + 20}" class="detail">${esc(spec.detail)}</text>`;
    return out;
  }

  private tagMarkup(spec: CardSpec, b: Box) {
    if (!spec.tag) return;
    const w = monoWidth(spec.tag, 10) + 16;
    const color = TONES.change.color;
    this.overlays.push(
      `<rect x="${b.right - w - 8}" y="${b.top - 10}" width="${w}" height="20" rx="10" fill="${color}"/>` +
        `<text x="${b.right - 8 - w / 2}" y="${b.top + 4}" class="tag">${esc(spec.tag)}</text>`
    );
    this.tones.add('change');
  }

  /** A service or component: a card with an icon, a name, and a detail line. */
  card(spec: CardSpec): Box {
    const { x, y, w = 210, h = 100, tone = 'service' } = spec;
    this.checkFit(spec, w);
    this.tones.add(tone);
    const color = TONES[tone].color;
    const external = tone === 'external';
    const stroke = spec.emphasis
      ? `stroke="${color}" stroke-width="1.6"`
      : external
        ? `stroke="${MUTED}" stroke-width="1.2" stroke-dasharray="5 4"`
        : `stroke="${INK}" stroke-opacity="0.22" stroke-width="1"`;
    const cx = x + w / 2 + (external ? 0 : 2);
    const top = y + (h - 84) / 2;
    this.nodes.push(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${external ? 8 : 6}" ` +
        `fill="${external ? 'none' : CARD}" ${stroke}${external ? '' : ' filter="url(#lift)"'}/>` +
        (external ? '' : `<rect x="${x}" y="${y}" width="4" height="${h}" rx="2" fill="${color}"/>`) +
        this.tile(spec.icon, cx, top, color) +
        this.text(spec, cx, top + 54)
    );
    const b = box(x, y, w, h);
    this.tagMarkup(spec, b);
    return b;
  }

  /** A datastore, drawn as a cylinder. */
  store(spec: CardSpec): Box {
    const { x, y, w = 210, h = 100, tone = 'state' } = spec;
    this.checkFit(spec, w);
    this.tones.add(tone);
    this.usesCylinder = true;
    const color = TONES[tone].color;
    const ry = 7;
    const cx = x + w / 2;
    // Below the rim ellipse, so the icon tile never sits on it.
    const top = y + 2 * ry + 3;
    this.nodes.push(
      `<path d="M${x},${y + ry} a${w / 2},${ry} 0 0 1 ${w},0 v${h - 2 * ry} a${w / 2},${ry} 0 0 1 -${w},0 z" ` +
        `fill="#eef2ea" stroke="${color}" stroke-width="1.2" filter="url(#lift)"/>` +
        `<path d="M${x},${y + ry} a${w / 2},${ry} 0 0 0 ${w},0" fill="none" stroke="${color}" stroke-width="1.2"/>` +
        this.tile(spec.icon, cx, top, color) +
        this.text(spec, cx, top + 54)
    );
    const b = box(x, y, w, h);
    this.tagMarkup(spec, b);
    return b;
  }

  edge({ points, style = 'request', label, labelAt, step, stepAt, both }: EdgeSpec): void {
    this.edgeStyles.add(style);
    const marker = `url(#arrow-${style})`;
    this.edges.push(
      `<path class="${style}" d="${roundedPath(points)}" marker-end="${marker}"` +
        `${both ? ` marker-start="url(#arrow-${style}-start)"` : ''}/>`
    );
    if (label) {
      const [lx, ly] = labelAt ?? longestSegmentMidpoint(points);
      const w = monoWidth(label, 11.5) + 22;
      const color = EDGE_COLOR[style];
      this.overlays.push(
        `<rect x="${lx - w / 2}" y="${ly - 11}" width="${w}" height="22" rx="11" fill="${PAPER}" ` +
          `stroke="${color}" stroke-opacity="${style === 'request' ? 0.25 : 0.4}"/>` +
          `<text x="${lx}" y="${ly + 4}" class="pill" fill="${style === 'event' ? color : BODY}">${esc(label)}</text>`
      );
    }
    if (step !== undefined) {
      const [sx, sy] = stepAt ?? longestSegmentMidpoint(points);
      this.overlays.push(
        `<circle cx="${sx}" cy="${sy}" r="11" fill="${INK}"/>` +
          `<text x="${sx}" y="${sy + 4}" class="badge">${step}</text>`
      );
    }
  }

  /** A step badge that is not on an edge, such as a step that happens inside a component. */
  badge(x: number, y: number, step: number): void {
    this.overlays.push(
      `<circle cx="${x}" cy="${y}" r="11" fill="${INK}"/>` + `<text x="${x}" y="${y + 4}" class="badge">${step}</text>`
    );
  }

  /** A free-standing annotation, for notes such as "unchanged" or a caveat. */
  note(x: number, y: number, text: string, anchor: 'start' | 'middle' | 'end' = 'start'): void {
    this.overlays.push(`<text x="${x}" y="${y}" class="note" text-anchor="${anchor}">${esc(text)}</text>`);
  }

  render(): string {
    const { width: W, height, title, figure = 1, steps = [] } = this.spec;
    const legend = this.legendItems();
    const rows = Math.max(steps.length, legend.length);
    const footerTop = height + 16;
    const H = rows ? footerTop + 54 + rows * 24 + 10 : height + 20;

    const defs = `
<defs>
  <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="0.9" fill="${INK}" fill-opacity="0.07"/>
  </pattern>
  <filter id="lift" x="-10%" y="-10%" width="120%" height="140%">
    <feDropShadow dx="0" dy="1.5" stdDeviation="1.6" flood-color="${INK}" flood-opacity="0.10"/>
  </filter>
  ${(Object.keys(EDGE_COLOR) as EdgeStyle[])
    .map(
      (s) =>
        `<marker id="arrow-${s}" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${EDGE_COLOR[s]}"/></marker>` +
        `<marker id="arrow-${s}-start" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M10,0 L0,5 L10,10 z" fill="${EDGE_COLOR[s]}"/></marker>`
    )
    .join('\n  ')}
  <style>
    .label { font-family: 'Hanken Grotesk'; font-size: 16px; font-weight: 600; fill: ${INK}; text-anchor: middle; }
    .detail { font-family: 'JetBrains Mono'; font-size: 12.5px; fill: ${MUTED}; text-anchor: middle; }
    .zone { font-family: 'JetBrains Mono'; font-size: 11.5px; font-weight: 500; letter-spacing: 1.2px; }
    .pill { font-family: 'JetBrains Mono'; font-size: 11.5px; text-anchor: middle; }
    .badge { font-family: 'JetBrains Mono'; font-size: 11.5px; font-weight: 500; fill: ${PAPER}; text-anchor: middle; }
    .tag { font-family: 'JetBrains Mono'; font-size: 10px; font-weight: 500; letter-spacing: 0.8px; fill: ${PAPER}; text-anchor: middle; }
    .heading { font-family: 'JetBrains Mono'; font-size: 12px; font-weight: 500; letter-spacing: 1.4px; fill: ${MUTED}; }
    .note { font-family: 'Hanken Grotesk'; font-size: 13.5px; font-style: italic; fill: ${MUTED}; }
    .step { font-family: 'Hanken Grotesk'; font-size: 14.5px; fill: ${BODY}; }
    .request { fill: none; stroke: ${INK}; stroke-width: 1.6; }
    .event { fill: none; stroke: #16407a; stroke-width: 1.5; stroke-dasharray: 6 4; }
    .control { fill: none; stroke: ${MUTED}; stroke-width: 1.3; stroke-dasharray: 2 4; stroke-linecap: round; }
  </style>
</defs>`;

    const header =
      `<text x="40" y="44" class="heading">${esc(title.toUpperCase())}</text>` +
      `<text x="${W - 40}" y="44" class="heading" text-anchor="end">FIG. ${figure}</text>` +
      `<line x1="40" y1="56" x2="${W - 40}" y2="56" stroke="${INK}" stroke-opacity="0.12"/>`;

    const footer: string[] = [];
    if (rows) {
      const legendX = W - 290;
      footer.push(
        `<line x1="40" y1="${footerTop}" x2="${W - 40}" y2="${footerTop}" stroke="${INK}" stroke-opacity="0.12"/>`
      );
      if (steps.length) {
        footer.push(`<text x="40" y="${footerTop + 30}" class="heading">REQUEST PATH</text>`);
        steps.forEach((text, i) => {
          const y = footerTop + 54 + 24 * i;
          if (68 + text.length * 7.4 > legendX - 20) {
            throw new Error(`${this.spec.name}: step ${i + 1} is too long for the footer`);
          }
          footer.push(
            `<circle cx="50" cy="${y}" r="9" fill="${INK}"/>` +
              `<text x="50" y="${y + 4}" class="badge" font-size="10.5">${i + 1}</text>` +
              `<text x="68" y="${y + 5}" class="step">${esc(text)}</text>`
          );
        });
      }
      footer.push(`<text x="${legendX}" y="${footerTop + 30}" class="heading">LEGEND</text>`);
      legend.forEach((item, i) => {
        const yc = footerTop + 54 + 24 * i;
        footer.push(item(legendX, yc));
      });
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<title>${esc(title)}</title>${defs}
<rect width="${W}" height="${H}" fill="${PAPER}"/>
<rect width="${W}" height="${H}" fill="url(#dots)"/>
${header}
${this.zones.join('\n')}
${this.edges.join('\n')}
${this.nodes.join('\n')}
${this.overlays.join('\n')}
${footer.join('\n')}
</svg>
`;
  }

  private legendItems(): ((x: number, y: number) => string)[] {
    const items: ((x: number, y: number) => string)[] = [];
    const label = (x: number, y: number, text: string) =>
      `<text x="${x + 42}" y="${y + 5}" class="step" font-size="13.5">${esc(text)}</text>`;
    for (const tone of ['service', 'compute', 'queue', 'external', 'error', 'change'] as Tone[]) {
      if (!this.tones.has(tone)) continue;
      const color = TONES[tone].color;
      items.push((x, y) =>
        tone === 'external'
          ? `<rect x="${x}" y="${y - 9}" width="30" height="18" rx="3" fill="none" stroke="${MUTED}" stroke-dasharray="3 2"/>` +
            label(x, y, TONES[tone].legend)
          : tone === 'change'
            ? `<rect x="${x}" y="${y - 7}" width="30" height="14" rx="7" fill="${color}"/>` +
              label(x, y, TONES[tone].legend)
            : `<rect x="${x}" y="${y - 9}" width="30" height="18" rx="3" fill="${CARD}" stroke="${INK}" stroke-opacity="0.22"/>` +
              `<rect x="${x}" y="${y - 9}" width="3" height="18" rx="1.5" fill="${color}"/>` +
              label(x, y, TONES[tone].legend)
      );
    }
    if (this.usesCylinder) {
      const color = TONES.state.color;
      items.push(
        (x, y) =>
          `<path d="M${x},${y - 6} a15,3.5 0 0 1 30,0 v11 a15,3.5 0 0 1 -30,0 z" fill="#eef2ea" stroke="${color}"/>` +
          `<path d="M${x},${y - 6} a15,3.5 0 0 0 30,0" fill="none" stroke="${color}"/>` +
          label(x, y, TONES.state.legend)
      );
    }
    for (const style of ['request', 'event', 'control'] as EdgeStyle[]) {
      if (!this.edgeStyles.has(style)) continue;
      items.push(
        (x, y) =>
          `<path class="${style}" d="M${x},${y} L${x + 30},${y}" marker-end="url(#arrow-${style})"/>` +
          label(x, y, EDGE_LEGEND[style])
      );
    }
    return items;
  }
}

function longestSegmentMidpoint(points: [number, number][]): [number, number] {
  let best: [number, number] = points[0];
  let bestLen = -1;
  for (let i = 1; i < points.length; i++) {
    const [ax, ay] = points[i - 1];
    const [bx, by] = points[i];
    const len = Math.hypot(bx - ax, by - ay);
    if (len > bestLen) {
      bestLen = len;
      best = [(ax + bx) / 2, (ay + by) / 2];
    }
  }
  return best;
}
