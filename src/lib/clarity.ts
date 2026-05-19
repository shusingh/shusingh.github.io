const CLARITY_SCRIPT_ID = 'microsoft-clarity-script';

type ClarityCommandQueue = unknown[][];
type ClarityFunction = ((...args: unknown[]) => void) & {
  q?: ClarityCommandQueue;
};

declare global {
  interface Window {
    clarity?: ClarityFunction;
  }
}

function shouldLoadClarity(projectId: string | undefined): projectId is string {
  return Boolean(projectId) && import.meta.env.PROD;
}

export function initClarity() {
  const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

  if (!shouldLoadClarity(projectId)) return;
  if (document.getElementById(CLARITY_SCRIPT_ID)) return;

  if (!window.clarity) {
    const queuedClarity: ClarityFunction = (...args: unknown[]) => {
      queuedClarity.q = queuedClarity.q || [];
      queuedClarity.q.push(args);
    };
    window.clarity = queuedClarity;
  }

  const script = document.createElement('script');
  script.id = CLARITY_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  document.head.appendChild(script);
}
