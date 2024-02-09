import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import App from './App';
import { ThemeProvider } from './components/providers/theme-provider';
import { ReactQueryProvider } from './components/providers/ReactQueryProvider';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <ReactQueryProvider>
        <App />
        <Toaster position="top-center" />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </ReactQueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
