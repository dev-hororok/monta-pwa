import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { useCloseAppHandler } from '@/hooks/use-close-app-handler';
import { useViewport } from '@/hooks/use-viewport';
import { ModalManager } from '@/components/modals/modal-manager';
import { cn } from '@/lib/utils';
import { useCheckDevice } from '@/hooks/use-check-device';

export const RootLayout = () => {
  useCloseAppHandler();
  useViewport();
  useCheckDevice();

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div
        className={cn(
          'relative w-full h-full bg-background select-none transition-colors',
          'md:max-w-mobile md:max-h-mobile md:border md:rounded-md'
        )}
      >
        <Outlet />
        <ModalManager />
        {/* <div className="hidden md:block absolute -bottom-12">
          <DarkModeToggle />
        </div> */}
      </div>
      <Toaster position="top-center" duration={1500} />
    </div>
  );
};
