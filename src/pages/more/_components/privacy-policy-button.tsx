import { morePageIcons } from '@/components/icons';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicyButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/privacy', { replace: true, state: { prevPage: '/more' } });
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
    >
      <div className="flex items-center gap-2">
        <img
          src={morePageIcons.shield}
          alt="shield icon"
          className="h-[1.2rem] w-[1.2rem]"
        />
        개인정보처리방침
      </div>
    </div>
  );
};
