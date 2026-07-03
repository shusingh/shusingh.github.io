import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { cssVar } from './theme';

// Keeps static assets that cannot reference CSS variables (the favicon) in
// sync with the theme in src/index.css. Runs automatically via `prebuild`.
function syncFavicon(): void {
  const accent = cssVar('--accent-on-dark');
  const file = path.resolve(process.cwd(), 'src/assets/favicon.svg');
  const svg = readFileSync(file, 'utf8');
  const updated = svg.replace(/(<circle[^>]*fill=")[^"]*(")/, `$1${accent.toUpperCase()}$2`);
  if (updated !== svg) {
    writeFileSync(file, updated);
    console.log(`[theme] favicon accent -> ${accent}`);
  } else {
    console.log('[theme] favicon already in sync');
  }
}

syncFavicon();
