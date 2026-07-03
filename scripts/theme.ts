import { readFileSync } from 'node:fs';
import path from 'node:path';

const THEME_FILE = path.resolve(process.cwd(), 'src/index.css');

/**
 * Reads a custom property from the :root block of src/index.css, the single
 * source of truth for site colors. Build scripts must use this instead of
 * hardcoding hex values.
 */
export function cssVar(name: string): string {
  const css = readFileSync(THEME_FILE, 'utf8');
  const match = css.match(new RegExp(`${name}:\\s*([^;]+);`));
  if (!match) {
    throw new Error(`[theme] ${name} not found in src/index.css`);
  }
  const value = match[1].trim();
  // Resolve one level of var() indirection (e.g. --accent: var(--matcha)).
  const reference = value.match(/^var\((--[\w-]+)\)$/);
  return reference ? cssVar(reference[1]) : value;
}
