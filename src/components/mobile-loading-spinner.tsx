import { Icons } from './icons';

export const MobileLoadingSpinner = () => {
  return (
    <div className="absolute bottom-14 left-0 flex justify-center items-center w-full h-full bg-background z-50">
      <Icons.spinner className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
};
