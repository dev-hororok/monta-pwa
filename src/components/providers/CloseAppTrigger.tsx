import { useCloseAppHandler } from '@/hooks/useCloseAppHandler';
import { ReactNode } from 'react';

export const CloseAppTrigger = ({ children }: { children: ReactNode }) => {
  useCloseAppHandler();
  return <>{children}</>;
};
