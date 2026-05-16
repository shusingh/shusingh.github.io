import fs from 'node:fs';
import path from 'node:path';

import {
  SITE_DESCRIPTION,
  SITE_ORIGIN,
  SITE_TITLE,
} from '../src/lib/site';
import { distDir, loadWorkFrontmatter, loadWritingFrontmatter } from './lib/content';

interface StaticRouteMeta {
  path: string;
  title: string;
  description: string;
  type: 'website' | 'article';
  image: string;
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function canonicalPath(routePath: string): string {
  return routePath === '/' ? '' : routePath;
}

function routeUrl(routePath: string): string {
  return `${SITE_ORIGIN}${canonicalPath(routePath)}`;
}

function upsertMeta(html: string, attribute: 'name' | 'property', key: string, content: string): string {
  const tag = `<meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(content)}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${key}["'][^>]*>`, 'i');
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace('</head>', `    ${tag}\n</head>`);
}

function upsertCanonical(html: string, href: string): string {
  const tag = `<link rel="canonical" href="${escapeAttribute(href)}" />`;
  const pattern = /<link\s+rel=["']canonical["'][^>]*>/i;
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace('</head>', `    ${tag}\n</head>`);
}

function applyMeta(template: string, meta: StaticRouteMeta): string {
  const fullTitle = meta.title === SITE_TITLE ? SITE_TITLE : `${meta.title} | Shubham Singh`;
  let html = template.replace(/<title>.*?<\/title>/is, `<title>${escapeText(fullTitle)}</title>`);
  html = upsertCanonical(html, routeUrl(meta.path));
  html = upsertMeta(html, 'name', 'description', meta.description);
  html = upsertMeta(html, 'property', 'og:title', fullTitle);
  html = upsertMeta(html, 'property', 'og:description', meta.description);
  html = upsertMeta(html, 'property', 'og:url', routeUrl(meta.path));
  html = upsertMeta(html, 'property', 'og:type', meta.type);
  html = upsertMeta(html, 'property', 'og:image', meta.image);
  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMeta(html, 'name', 'twitter:title', fullTitle);
  html = upsertMeta(html, 'name', 'twitter:description', meta.description);
  html = upsertMeta(html, 'name', 'twitter:image', meta.image);
  return html;
}

function outputPath(routePath: string): string {
  if (routePath === '/') {
    return path.join(distDir, 'index.html');
  }
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

function writeRoute(template: string, meta: StaticRouteMeta): void {
  const filePath = outputPath(meta.path);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, applyMeta(template, meta));
}

export function buildStaticMeta(): void {
  const templatePath = path.join(distDir, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  const staticRoutes: StaticRouteMeta[] = [
    {
      path: '/',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      type: 'website',
      image: `${SITE_ORIGIN}/og/default.png`,
    },
    {
      path: '/work',
      title: 'Work',
      description:
        'Selected production case studies in agentic AI, distributed orchestration, and platform design at Amazon.',
      type: 'website',
      image: `${SITE_ORIGIN}/og/default.png`,
    },
    {
      path: '/writing',
      title: 'Writing',
      description:
        'Working notes on AI infrastructure, distributed systems, retrieval, and production engineering. Long-form, no listicles.',
      type: 'website',
      image: `${SITE_ORIGIN}/og/default.png`,
    },
    {
      path: '/about',
      title: 'About',
      description:
        'Shubham Singh, SDE II at Amazon, working on agentic AI systems and distributed infrastructure.',
      type: 'website',
      image: `${SITE_ORIGIN}/og/default.png`,
    },
    {
      path: '/now',
      title: 'Now',
      description: 'What Shubham Singh is working on, learning, and reading right now.',
      type: 'website',
      image: `${SITE_ORIGIN}/og/default.png`,
    },
  ];

  const workRoutes: StaticRouteMeta[] = loadWorkFrontmatter().map((frontmatter) => ({
    path: `/work/${frontmatter.slug}`,
    title: frontmatter.title,
    description: frontmatter.description,
    type: 'article',
    image: `${SITE_ORIGIN}/og/work-${frontmatter.slug}.png`,
  }));

  const writingRoutes: StaticRouteMeta[] = loadWritingFrontmatter().map((frontmatter) => ({
    path: `/writing/${frontmatter.slug}`,
    title: frontmatter.title,
    description: frontmatter.excerpt,
    type: 'article',
    image: `${SITE_ORIGIN}/og/writing-${frontmatter.slug}.png`,
  }));

  const routes = [...staticRoutes, ...workRoutes, ...writingRoutes];
  routes.forEach((meta) => writeRoute(template, meta));
  console.log(`[static-meta] wrote ${routes.length} HTML entry points`);
}
