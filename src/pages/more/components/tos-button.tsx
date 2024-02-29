import { Icons } from '@/components/icons';
import { toast } from 'sonner';

export const TermsOfServiceButton = () => {
  const handleDummyClick = () => {
    toast.error('미구현', { duration: 1000 });
  };
  return (
    <div
      onClick={handleDummyClick}
      className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
    >
      <div className="flex items-center gap-2">
        <Icons.fileText className="h-[1.2rem] w-[1.2rem]" />
        이용약관
      </div>
    </div>
  );
};