import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');

interface FontSpec {
  name: string;
  weight: number;
  style: 'normal' | 'italic';
  filePath: string;
}

const FONTS: FontSpec[] = [
  {
    name: 'Fraunces',
    weight: 300,
    style: 'italic',
    filePath: 'node_modules/@fontsource/fraunces/files/fraunces-latin-300-italic.woff',
  },
  {
    name: 'Fraunces',
    weight: 400,
    style: 'normal',
    filePath: 'node_modules/@fontsource/fraunces/files/fraunces-latin-400-normal.woff',
  },
  {
    name: 'Fraunces',
    weight: 500,
    style: 'normal',
    filePath: 'node_modules/@fontsource/fraunces/files/fraunces-latin-500-normal.woff',
  },
];

export interface LoadedFont {
  name: string;
  data: ArrayBuffer;
  weight: number;
  style: 'normal' | 'italic';
}

async function loadOne(spec: FontSpec): Promise<LoadedFont> {
  const buffer = await fs.readFile(path.join(projectRoot, spec.filePath));
  return {
    name: spec.name,
    data: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
    weight: spec.weight,
    style: spec.style,
  };
}

export async function loadFonts(): Promise<LoadedFont[]> {
  return Promise.all(FONTS.map(loadOne));
}
