import '@fontsource/fraunces/latin-300.css';
import '@fontsource/fraunces/latin-300-italic.css';
import '@fontsource/fraunces/latin-400.css';
import '@fontsource/fraunces/latin-400-italic.css';
import '@fontsource/fraunces/latin-500.css';
import '@fontsource/fraunces/latin-500-italic.css';
import '@fontsource/fraunces/latin-700.css';
import '@fontsource-variable/geist/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root was not found.');
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
