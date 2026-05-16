import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';

import {
  parseWorkFrontmatter,
  parseWritingFrontmatter,
  type WorkFrontmatter,
  type WritingFrontmatter,
} from '../../src/content/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');

function normalize(value: unknown): unknown {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (Array.isArray(value)) {
    return value.map(normalize);
  }
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, inner] of Object.entries(value as Record<string, unknown>)) {
      result[key] = normalize(inner);
    }
    return result;
  }
  return value;
}

function readMdxFrontmatter(dir: string): Array<{ filePath: string; data: unknown }> {
  const fullDir = path.join(projectRoot, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => {
      const filePath = path.join(fullDir, name);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);
      return { filePath, data: normalize(data) };
    });
}

export function loadWritingFrontmatter(): WritingFrontmatter[] {
  return readMdxFrontmatter('content/writing')
    .map(({ filePath, data }) => parseWritingFrontmatter(data, filePath))
    .filter((fm) => !fm.draft)
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export function loadWorkFrontmatter(): WorkFrontmatter[] {
  return readMdxFrontmatter('content/work')
    .map(({ filePath, data }) => parseWorkFrontmatter(data, filePath))
    .filter((fm) => !fm.draft)
    .sort((a, b) => {
      const orderA = a.order;
      const orderB = b.order;
      if (orderA !== undefined && orderB !== undefined) return orderA - orderB;
      if (orderA !== undefined) return -1;
      if (orderB !== undefined) return 1;
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });
}

export const distDir = path.join(projectRoot, 'dist');
export const publicDir = path.join(projectRoot, 'public');
