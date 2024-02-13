import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { useCloseAppHandler } from '@/hooks/use-close-app-handler';
import { useViewport } from '@/hooks/use-viewport';
import { DarkModeToggle } from '@/components/darkmode-toggle';
import { ModalManager } from '@/components/modals/modal-manager';
import { cn } from '@/lib/utils';

export const RootLayout = () => {
  useCloseAppHandler();
  useViewport();

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div
        className={cn(
          'relative w-full h-full border rounded-md bg-background select-none',
          'md:max-w-mobile md:max-h-mobile md:border md:rounded-md'
        )}
      >
        <Outlet />
        <ModalManager />
        <div className="hidden md:block absolute -bottom-12">
          <DarkModeToggle />
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};
