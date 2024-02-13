import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useBoundStore from '@/stores/use-bound-store';

interface UnauthedRouteProps {
  children: React.ReactNode;
}

const UnauthedRoute = ({ children }: UnauthedRouteProps) => {
  const { accessToken } = useBoundStore((state) => state.tokens);
  const location = useLocation();

  if (accessToken) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default UnauthedRoute;
