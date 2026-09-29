import { Diagram } from '../scripts/diagrams/kit';

const d = new Diagram({
  name: 'markitdown-eml',
  title: 'MarkItDown  /  where the EML converter fits',
  width: 1120,
  height: 600,
  steps: [
    'A .eml file is passed to MarkItDown like any other document.',
    'Converter selection routes it to the new EmlConverter.',
    'Headers become a preamble; the body prefers text/plain, else HTML.',
    'Attachments are listed as metadata; Markdown goes to search or RAG.',
  ],
});

const COL = [70, 320, 570, 820];
const R1 = 248;
const R2 = 426;

d.zone({ x: 40, y: 206, w: 740, h: 352, label: 'microsoft/markitdown', labelAt: 'bottom-left' });

const eml = d.card({ x: COL[0], y: 76, label: '.eml file', detail: 'RFC 822 / MIME', icon: 'mail', tone: 'external' });

const select = d.card({ x: COL[0], y: R1, label: 'MarkItDown', detail: 'picks a converter', icon: 'split' });
const conv = d.card({
  x: COL[1],
  y: R1,
  label: 'EmlConverter',
  detail: 'format-specific parse',
  icon: 'file-code',
  emphasis: true,
  tag: 'THIS PR',
});
const md = d.card({ x: COL[2], y: R1, label: 'Markdown', detail: 'preamble, body, list', icon: 'file-text' });
const rag = d.card({
  x: COL[3],
  y: R1,
  label: 'Search / RAG',
  detail: 'downstream ingestion',
  icon: 'search',
  tone: 'external',
});

const headers = d.card({ x: COL[0], y: R2, label: 'Headers', detail: 'From, To, Subject, Date', icon: 'list-ordered' });
const body = d.card({ x: COL[1], y: R2, label: 'Body selection', detail: 'text/plain, else HTML', icon: 'text' });
const attach = d.card({ x: COL[2], y: R2, label: 'Attachments', detail: 'metadata, not content', icon: 'paperclip' });

const bus = (R1 + 100 + R2) / 2;

d.edge({
  points: [
    [eml.cx, eml.bottom],
    [select.cx, select.top],
  ],
  step: 1,
});
d.edge({
  points: [
    [select.right, select.cy],
    [conv.left, conv.cy],
  ],
  step: 2,
});
d.edge({
  points: [
    [conv.right, conv.cy],
    [md.left, md.cy],
  ],
});
d.edge({
  points: [
    [md.right, md.cy],
    [rag.left, rag.cy],
  ],
  step: 4,
});
d.edge({
  points: [
    [conv.cx - 40, conv.bottom],
    [conv.cx - 40, bus],
    [headers.cx, bus],
    [headers.cx, headers.top],
  ],
  style: 'control',
});
d.edge({
  points: [
    [conv.cx, conv.bottom],
    [body.cx, body.top],
  ],
  style: 'control',
  step: 3,
});
d.edge({
  points: [
    [conv.cx + 40, conv.bottom],
    [conv.cx + 40, bus],
    [attach.cx, bus],
    [attach.cx, attach.top],
  ],
  style: 'control',
});

export default d;
