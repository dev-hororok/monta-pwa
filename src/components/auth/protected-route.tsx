import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useBoundStore from '@/stores/use-bound-store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useBoundStore((state) => state.tokens);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
