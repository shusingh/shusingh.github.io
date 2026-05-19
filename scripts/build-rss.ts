import fs from 'node:fs';
import path from 'node:path';

import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_ORIGIN,
  SITE_TITLE,
} from '../src/lib/site';
import { distDir, loadWritingFrontmatter } from './lib/content';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildRss(): void {
  const writing = loadWritingFrontmatter();

  const items = writing
    .map((fm) => {
      const url = `${SITE_ORIGIN}/writing/${fm.slug}`;
      const pubDate = new Date(fm.date).toUTCString();
      const categories = fm.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      return [
        '    <item>',
        `      <title>${escapeXml(fm.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(fm.excerpt)}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const lastBuildDate = new Date().toUTCString();
  const latest = writing[0];
  const latestPubDate = latest ? new Date(latest.date).toUTCString() : lastBuildDate;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_ORIGIN}/writing</link>
    <atom:link href="${SITE_ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <managingEditor>shubh.singh.dev@gmail.com (${escapeXml(SITE_AUTHOR)})</managingEditor>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${latestPubDate}</pubDate>
${items}
  </channel>
</rss>
`;

  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, 'rss.xml'), xml);
  console.log(`[rss] wrote ${writing.length} items`);
}
