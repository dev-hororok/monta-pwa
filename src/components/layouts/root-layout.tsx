import { Outlet } from 'react-router-dom';

import { ModalManager } from '@/components/modals/ModalManager';
import { DarkModeToggle } from '@/components/DarkmodeToggle';
import { useCloseAppHandler } from '@/hooks/useCloseAppHandler';
import useViewport from '@/hooks/useViewport';

const RootLayout = () => {
  useCloseAppHandler();
  useViewport();

  return (
    <div className="w-full">
      <div className="w-full fixed top-0 md:top-1/2 md:left-1/2 md:-ml-[213px] md:-mt-[368px]">
        <div className="relative w-full h-screen md:w-[416px] md:h-[736px] md:border md:rounded-md bg-background select-none">
          <Outlet />

          <ModalManager />
          <div className="absolute -bottom-16 -right-16">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
