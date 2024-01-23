import { ReactNode } from 'react';

export const MobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen">
      <div className="w-full fixed top-0 md:top-1/2 md:left-1/2 md:-ml-[213px] md:-mt-[368px]">
        <div className="relative w-full h-screen md:w-[416px] md:h-[736px] md:border md:rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
};
