import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './styles/index.css';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { OAuthProviders } from './components/providers/oauth-provider';
import { App } from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <OAuthProviders>
        <ReactQueryProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </OAuthProviders>
    </ThemeProvider>
  </React.StrictMode>
);
