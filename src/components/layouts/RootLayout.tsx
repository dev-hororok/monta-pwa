import { Outlet } from 'react-router-dom';
import { Toaster } from '../ui/toaster';
import { DarkModeToggle } from '../DarkmodeToggle';

export const RootLayout = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full fixed top-0 md:top-1/2 md:left-1/2 md:-ml-[213px] md:-mt-[368px]">
        <div className="relative w-full h-screen md:w-[416px] md:h-[736px] md:border md:rounded-md">
          <Outlet />
          <Toaster />
          <div className="absolute -bottom-16 -right-16">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
