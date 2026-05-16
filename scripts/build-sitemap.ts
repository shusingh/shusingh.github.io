import fs from 'node:fs';
import path from 'node:path';

import { SITE_ORIGIN } from '../src/lib/site';
import { distDir, loadWorkFrontmatter, loadWritingFrontmatter } from './lib/content';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

function isoDate(value: string): string {
  return new Date(value).toISOString().split('T')[0];
}

function entryXml(entry: SitemapEntry): string {
  const parts = [`    <loc>${entry.loc}</loc>`];
  if (entry.lastmod) parts.push(`    <lastmod>${entry.lastmod}</lastmod>`);
  if (entry.changefreq) parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  if (entry.priority !== undefined) parts.push(`    <priority>${entry.priority}</priority>`);
  return `  <url>\n${parts.join('\n')}\n  </url>`;
}

export function buildSitemap(): void {
  const writing = loadWritingFrontmatter();
  const work = loadWorkFrontmatter();

  const today = new Date().toISOString().split('T')[0];

  const staticPages: SitemapEntry[] = [
    { loc: `${SITE_ORIGIN}/`, lastmod: today, changefreq: 'weekly', priority: 1.0 },
    { loc: `${SITE_ORIGIN}/work`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_ORIGIN}/writing`, lastmod: today, changefreq: 'weekly', priority: 0.8 },
    { loc: `${SITE_ORIGIN}/about`, lastmod: today, changefreq: 'yearly', priority: 0.5 },
    { loc: `${SITE_ORIGIN}/now`, lastmod: today, changefreq: 'monthly', priority: 0.6 },
  ];

  const workPages: SitemapEntry[] = work.map((fm) => ({
    loc: `${SITE_ORIGIN}/work/${fm.slug}`,
    lastmod: isoDate(fm.date),
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const writingPages: SitemapEntry[] = writing.map((fm) => ({
    loc: `${SITE_ORIGIN}/writing/${fm.slug}`,
    lastmod: isoDate(fm.date),
    changefreq: 'monthly',
    priority: 0.6,
  }));

  const entries = [...staticPages, ...workPages, ...writingPages];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.map(entryXml).join('\n'),
    '</urlset>',
  ].join('\n');

  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), `${xml}\n`);
  console.log(`[sitemap] wrote ${entries.length} entries`);
}
