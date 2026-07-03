import { execSync } from 'node:child_process';

import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// The /now date tracks the last commit (or pending edit) of the page's content,
// so it can never claim to be fresher than the content actually is.
function nowDate(): string {
  const file = 'src/pages/NowPage.tsx';
  let year: number;
  let month: number;
  try {
    const dirty = execSync(`git status --porcelain -- ${file}`).toString().trim() !== '';
    if (dirty) {
      const today = new Date();
      year = today.getFullYear();
      month = today.getMonth();
    } else {
      const iso = execSync(`git log -1 --format=%cs -- ${file}`).toString().trim();
      const [y, m] = iso.split('-').map(Number);
      year = y;
      month = m - 1;
    }
  } catch {
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth();
  }
  const monthName = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long' });
  return `${monthName} ${year} · Seattle`;
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  define: {
    __NOW_DATE__: JSON.stringify(nowDate()),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');

          if (normalizedId.includes('/content/writing/')) return 'content-writing';
          if (normalizedId.includes('/content/work/')) return 'content-work';
          if (normalizedId.includes('/content/projects/')) return 'content-projects';

          if (normalizedId.includes('/node_modules/react')) return 'react-vendor';
          if (normalizedId.includes('/node_modules/@mdx-js/')) return 'mdx-vendor';
          if (normalizedId.includes('/node_modules/')) return 'vendor';
        },
      },
    },
  },
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      }),
    },
    react({ include: /\.(mdx|jsx|tsx)$/ }),
    tsconfigPaths(),
  ],
});
