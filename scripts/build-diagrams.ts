// Renders the hand-authored SVG diagrams in diagrams/ to WebP images in
// public/diagrams/, using the site's own typefaces. Run with `npm run diagrams`
// after editing a diagram; the outputs are committed so the site build does not
// depend on this step.
//
// The SVG source stays the editable original. It is rendered to a raster
// because an SVG loaded through <img> cannot use the page's web fonts.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'diagrams');
const outputDir = path.join(root, 'public', 'diagrams');
const fontCacheDir = path.join(root, 'node_modules', '.cache', 'diagram-fonts');

// Rendered at twice the SVG's size so text stays sharp on high-density screens.
const SCALE = 2;

const FONTS = [
  '@fontsource/hanken-grotesk/files/hanken-grotesk-latin-400-normal.woff',
  '@fontsource/hanken-grotesk/files/hanken-grotesk-latin-500-normal.woff',
  '@fontsource/hanken-grotesk/files/hanken-grotesk-latin-600-normal.woff',
  '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff',
  '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff',
];

/**
 * Converts a WOFF 1.0 font to the TrueType/OpenType file it wraps, which is
 * what resvg can load. WOFF stores each table, optionally zlib-compressed,
 * after a directory; the sfnt rebuilds that as an offset table and a
 * 4-byte-aligned table directory.
 */
function woffToSfnt(woff: Buffer): Buffer {
  if (woff.toString('latin1', 0, 4) !== 'wOFF') {
    throw new Error('not a WOFF 1.0 font');
  }
  const flavor = woff.readUInt32BE(4);
  const numTables = woff.readUInt16BE(12);

  const tables = Array.from({ length: numTables }, (_, i) => {
    const entry = 44 + i * 20;
    const tag = woff.readUInt32BE(entry);
    const offset = woff.readUInt32BE(entry + 4);
    const compLength = woff.readUInt32BE(entry + 8);
    const origLength = woff.readUInt32BE(entry + 12);
    const checksum = woff.readUInt32BE(entry + 16);
    const raw = woff.subarray(offset, offset + compLength);
    const data = compLength < origLength ? zlib.inflateSync(raw) : raw;
    return { tag, checksum, data };
  });

  const entrySelector = Math.floor(Math.log2(numTables));
  const searchRange = 2 ** entrySelector * 16;
  const header = Buffer.alloc(12 + numTables * 16);
  header.writeUInt32BE(flavor, 0);
  header.writeUInt16BE(numTables, 4);
  header.writeUInt16BE(searchRange, 6);
  header.writeUInt16BE(entrySelector, 8);
  header.writeUInt16BE(numTables * 16 - searchRange, 10);

  const chunks: Buffer[] = [header];
  let offset = header.length;
  tables.forEach((table, i) => {
    const entry = 12 + i * 16;
    header.writeUInt32BE(table.tag, entry);
    header.writeUInt32BE(table.checksum, entry + 4);
    header.writeUInt32BE(offset, entry + 8);
    header.writeUInt32BE(table.data.length, entry + 12);
    const padding = (4 - (table.data.length % 4)) % 4;
    chunks.push(table.data, Buffer.alloc(padding));
    offset += table.data.length + padding;
  });
  return Buffer.concat(chunks);
}

async function prepareFonts(): Promise<string[]> {
  await fs.mkdir(fontCacheDir, { recursive: true });
  return Promise.all(
    FONTS.map(async (font) => {
      const target = path.join(fontCacheDir, path.basename(font, '.woff') + '.ttf');
      const woff = await fs.readFile(path.join(root, 'node_modules', font));
      await fs.writeFile(target, woffToSfnt(woff));
      return target;
    }),
  );
}

async function main(): Promise<void> {
  const fontFiles = await prepareFonts();
  await fs.mkdir(outputDir, { recursive: true });
  const sources = (await fs.readdir(sourceDir)).filter((name) => name.endsWith('.svg'));

  for (const name of sources) {
    const svg = await fs.readFile(path.join(sourceDir, name), 'utf8');
    const resvg = new Resvg(svg, {
      font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Hanken Grotesk' },
      fitTo: { mode: 'zoom', value: SCALE },
    });
    const png = resvg.render().asPng();
    const outPath = path.join(outputDir, name.replace(/\.svg$/, '.webp'));
    // Flat diagram colors compress far better losslessly than with lossy
    // quantization, which also blurs thin lines and small text.
    const info = await sharp(png).webp({ lossless: true, effort: 6 }).toFile(outPath);
    console.log(
      `[diagrams] ${name} -> ${path.relative(root, outPath)} ` +
        `(${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB)`,
    );
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
