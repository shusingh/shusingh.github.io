import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/components/Error/ErrorFallback.tsx';
import { Provider } from '@/components/ui/provider';

import App from './App.tsx';
import './index.css';
import '@fontsource-variable/source-code-pro/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
