import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production pages arrive already rendered (scripts/prerender-seo.cjs renders every page at build time),
// so React attaches to that HTML instead of rebuilding it. The dev server serves an empty #root.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app, {
    // If the HTML and the app ever disagree, React re-renders that part; keep a count so it can be checked
    onRecoverableError: (error) => {
      const w = window as unknown as { __hydrationErrors?: number };
      w.__hydrationErrors = (w.__hydrationErrors ?? 0) + 1;
      console.error(error);
    },
  });
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
