import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './styles/index.css';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { App } from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  </React.StrictMode>
);
