# Shubham Singh

Personal portfolio for [shusingh.github.io](https://shusingh.github.io).

Built with React, Vite, TypeScript, MDX, CSS Modules, Three.js, and GitHub Pages.

## What is inside

- Case studies in `content/work`
- Writing in `content/writing`
- Interactive suminagashi ink background on the homepage: a Three.js GPU fluid simulation
  (stable fluids with Beer-Lambert subtractive ink) rendered on procedural washi paper, in
  `src/components/FluidBackground`
- A single warm paper (washi) theme driven by CSS custom properties
- Static sitemap, RSS, Open Graph image generation, and route metadata via `scripts/postbuild.ts`

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run deploy
```

`npm run deploy` publishes `dist` to the `gh-pages` branch.

## Analytics

Set `VITE_CLARITY_PROJECT_ID` to enable Microsoft Clarity in production builds.
Leave it empty for local development.
