import fs from 'node:fs';
import path from 'node:path';

import { Resvg } from '@resvg/resvg-js';
import React from 'react';
import satori from 'satori';

import {
  distDir,
  loadProjectFrontmatter,
  loadWorkFrontmatter,
  loadWritingFrontmatter,
} from './lib/content';
import { loadFonts, type LoadedFont } from './lib/fonts';

const WIDTH = 1200;
const HEIGHT = 630;

// Mirrors --bg / --bg-elevated / --text-primary / --text-secondary / --accent / --border
// from src/index.css (dark theme).
const TOKENS = {
  bg: '#0e0e10',
  bgElevated: '#161618',
  textPrimary: '#ededed',
  textSecondary: '#a1a1a6',
  textTertiary: '#6b6b72',
  accent: '#9bc4b2',
  accentDim: '#5e8276',
  border: 'rgba(255, 255, 255, 0.08)',
};

function frame(eyebrow: string, title: string, footer: string) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: TOKENS.bg,
        color: TOKENS.textPrimary,
        fontFamily: 'Fraunces',
        padding: '64px 72px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${TOKENS.accent}22 0%, transparent 60%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 22,
          color: TOKENS.textSecondary,
        }}
      >
        <span style={{ color: TOKENS.textPrimary, fontWeight: 500 }}>Shubham Singh</span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 22,
            color: TOKENS.accent,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ width: 28, height: 2, backgroundColor: TOKENS.accent }} />
          {eyebrow}
        </div>
        <div
          style={{
            fontFamily: 'Fraunces',
            fontSize: title.length > 56 ? 60 : 76,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: TOKENS.textPrimary,
            maxWidth: 1000,
            display: 'flex',
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 28,
          borderTop: `1px solid ${TOKENS.border}`,
          fontSize: 20,
          color: TOKENS.textTertiary,
        }}
      >
        <span>Shubham Singh · SDE II · Amazon</span>
        <span>{footer}</span>
      </div>
    </div>
  );
}

function defaultFrame() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: TOKENS.bg,
        color: TOKENS.textPrimary,
        fontFamily: 'Fraunces',
        padding: '80px 90px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${TOKENS.accent}22 0%, transparent 60%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontSize: 24,
          color: TOKENS.textSecondary,
        }}
      >
        <span style={{ color: TOKENS.textPrimary, fontWeight: 500 }}>Shubham Singh</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      >
        <div
          style={{
            fontFamily: 'Fraunces',
            fontSize: 104,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            display: 'flex',
            gap: 24,
          }}
        >
          <span>Shubham</span>
          <span style={{ color: TOKENS.accent, fontStyle: 'italic' }}>Singh</span>
        </div>
        <div
          style={{
            fontSize: 32,
            color: TOKENS.textSecondary,
            maxWidth: 880,
            lineHeight: 1.35,
          }}
        >
          Production agentic AI systems and distributed infrastructure on AWS.
        </div>
      </div>
      <div
        style={{
          paddingTop: 32,
          borderTop: `1px solid ${TOKENS.border}`,
          fontSize: 22,
          color: TOKENS.textTertiary,
          display: 'flex',
        }}
      >
        SDE II · Amazon · Seattle
      </div>
    </div>
  );
}

async function renderToPng(element: JSX.Element, fonts: LoadedFont[]): Promise<Buffer> {
  const svg = await satori(element, { width: WIDTH, height: HEIGHT, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render();
  return png.asPng();
}

export async function buildOg(): Promise<void> {
  const fonts = await loadFonts();
  if (fonts.length === 0) {
    console.warn('[og] no fonts available; skipping OG generation');
    return;
  }

  const ogDir = path.join(distDir, 'og');
  fs.mkdirSync(ogDir, { recursive: true });

  const defaultPng = await renderToPng(defaultFrame(), fonts);
  fs.writeFileSync(path.join(ogDir, 'default.png'), defaultPng);

  const writing = loadWritingFrontmatter();
  for (const fm of writing) {
    const png = await renderToPng(
      frame('Writing', fm.title, `${fm.readTime} · ${new Date(fm.date).getFullYear()}`),
      fonts
    );
    fs.writeFileSync(path.join(ogDir, `writing-${fm.slug}.png`), png);
  }

  const work = loadWorkFrontmatter();
  for (const fm of work) {
    const png = await renderToPng(
      frame(fm.eyebrow, fm.title, fm.stat ? fm.stat.number : 'Case study'),
      fonts
    );
    fs.writeFileSync(path.join(ogDir, `work-${fm.slug}.png`), png);
  }

  const projects = loadProjectFrontmatter();
  for (const fm of projects) {
    const png = await renderToPng(
      frame(
        fm.kind === 'contribution' ? 'Open source' : 'Project',
        fm.title,
        fm.status ? `${fm.status} · ${fm.year}` : `${fm.year}`
      ),
      fonts
    );
    fs.writeFileSync(path.join(ogDir, `project-${fm.slug}.png`), png);
  }

  console.log(`[og] wrote ${1 + writing.length + work.length + projects.length} images`);
}
