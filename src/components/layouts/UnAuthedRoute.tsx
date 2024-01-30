import useBoundStore from '@/stores/useBoundStore';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const UnAuthedRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useBoundStore((state) => state.tokens);
  const location = useLocation();

  if (accessToken) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};
