import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useCurrentAccountQuery } from '@/services/queries/member-queries';
import { MobileLoadingSpinner } from '../mobile-loading-spinner';

interface AdminRouteouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteouteProps) => {
  const { data, isLoading, isError } = useCurrentAccountQuery();
  const location = useLocation();

  if (isLoading) {
    return <MobileLoadingSpinner isOveray />;
  }
  if (isError) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (data?.role.role_id !== 1) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};
