import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
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
