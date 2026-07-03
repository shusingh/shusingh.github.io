export const SITE_ORIGIN = 'https://shusingh.github.io';
export const SITE_TITLE = 'Shubham Singh | Software Engineer';
export const SITE_DESCRIPTION =
  'SDE II at Amazon building production agentic AI systems and distributed infrastructure on AWS.';
export const SITE_AUTHOR = 'Shubham Singh';
// Injected at build time from the last content change to NowPage.tsx (see vite.config.ts).
// The postbuild scripts import this module outside Vite, where the constant is not defined.
function fallbackNowDate(): string {
  const today = new Date();
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });
  return `${monthName} ${today.getFullYear()} · Seattle`;
}

export const NOW_DATE = typeof __NOW_DATE__ !== 'undefined' ? __NOW_DATE__ : fallbackNowDate();
