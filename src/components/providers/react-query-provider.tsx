import useApiError from '@/hooks/useApiError';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

const MINUTE = 1000 * 60;

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const { handleError } = useApiError();
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: handleError,
      },

      queries: {
        gcTime: 10 * MINUTE,
      },
    },
    queryCache: new QueryCache({
      onError: handleError,
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
