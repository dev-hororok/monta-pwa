import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

import './styles/index.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import App from './app';
import ReactQueryProvider from './components/providers/react-query-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <ReactQueryProvider>
        <App />
        <Toaster position="top-center" />
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
