import '@fontsource/newsreader/latin-400.css';
import '@fontsource/newsreader/latin-400-italic.css';
import '@fontsource/newsreader/latin-500.css';
import '@fontsource/newsreader/latin-500-italic.css';
import '@fontsource/newsreader/latin-600.css';
import '@fontsource-variable/hanken-grotesk/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback';
import './index.css';
import { initClarity } from './lib/clarity';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root was not found.');
}

initClarity();

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
