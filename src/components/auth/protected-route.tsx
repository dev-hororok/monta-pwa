import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth-store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useAuthStore((state) => state.tokens);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
};
