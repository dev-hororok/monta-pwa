import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth-store';

interface UnauthedRouteProps {
  children: React.ReactNode;
}

export const UnauthedRoute = ({ children }: UnauthedRouteProps) => {
  const accessToken = useAuthStore((state) => state.tokens.accessToken);
  const location = useLocation();

  if (accessToken) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};
