# Shubham Singh

Personal portfolio for [shusingh.github.io](https://shusingh.github.io).

Built with React, Vite, TypeScript, MDX, CSS Modules, Three.js, and GitHub Pages.
A single warm washi-paper theme, an interactive suminagashi ink background, and a
kentō registration cursor give the whole site the feel of ink on paper.

## Content

All writing lives as MDX with typed frontmatter, loaded and validated at build
time by `src/content/load.ts` (`src/content/types.ts` defines the schemas):

- `content/projects`: personal projects and open-source contributions. Any entry
  with a `liveUrl` is surfaced automatically in the nav's **Projects** dropdown, so
  the live links are data-driven, not hand-maintained.
- `content/work`: longer case studies.
- `content/writing`: essays. Technical posts can embed the diagram components in
  `src/components/MdxDiagrams` (`FlowDiagram`, `LayerDiagram`, `LoopDiagram`).

## Signature pieces

- **Suminagashi ink background** (`src/components/FluidBackground`): a Three.js GPU
  fluid simulation (stable fluids with a Jacobi pressure solve and vorticity
  confinement) painting Beer-Lambert subtractive ink on **procedurally computed
  washi paper**. The paper fibre and deckled vignette are generated in the display
  shader (`shaders.ts`), not from an image. Runs only on the homepage.
- **Kentō cursor** (`src/components/Layout/SiteLayout.tsx`): the pointer is a fine
  ink dot inside four registration brackets that expand to frame whatever
  interactive element you hover. Falls back to the native cursor for touch and
  reduced-motion.
- **One theme, one source**: theme tokens live in `scripts/theme.ts` and are synced
  into CSS custom properties by the `prebuild` step (`scripts/sync-theme.ts`).

## Build pipeline

`npm run build` runs `tsc` → `vite build` → `scripts/postbuild.ts`, which generates:

- a sitemap (`build-sitemap.ts`),
- an RSS feed (`build-rss.ts`),
- per-page Open Graph images with Satori + resvg (`build-og.tsx`), and
- static HTML entry points with route metadata for crawlers (`build-static-meta.ts`).

## Commands

```bash
npm install
npm run dev
npm run lint
npm run format
npm run build
npm run deploy
```

`npm run deploy` publishes `dist` to the `gh-pages` branch.

## Analytics

Set `VITE_CLARITY_PROJECT_ID` to enable Microsoft Clarity in production builds.
Leave it empty for local development.
