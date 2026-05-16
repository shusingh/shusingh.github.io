import { buildOg } from './build-og';
import { buildRss } from './build-rss';
import { buildSitemap } from './build-sitemap';
import { buildStaticMeta } from './build-static-meta';

async function main(): Promise<void> {
  buildSitemap();
  buildRss();
  await buildOg();
  buildStaticMeta();
}

main().catch((error) => {
  console.error('[postbuild] failed', error);
  process.exit(1);
});
