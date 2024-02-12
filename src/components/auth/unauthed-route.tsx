import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useBoundStore from '@/stores/use-bound-store';

const UnAuthedRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useBoundStore((state) => state.tokens);
  const location = useLocation();

  if (accessToken) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default UnAuthedRoute;
