import { Icons } from '@/components/icons';
import { useNavigate } from 'react-router-dom';

export const TermsOfServiceButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/terms', { replace: true, state: { prevPage: '/more' } });
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
    >
      <div className="flex items-center gap-2">
        <Icons.fileText className="h-[1.2rem] w-[1.2rem]" />
        이용약관
      </div>
    </div>
  );
};
