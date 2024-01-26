import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './components/providers/theme-provider';
import { ReactQueryProvider } from './components/providers/ReactQueryProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
