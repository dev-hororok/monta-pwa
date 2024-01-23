import useBoundStore from '@/stores/useBoundStore';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useBoundStore((state) => state.tokens);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
