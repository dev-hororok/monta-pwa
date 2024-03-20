import * as React from 'react';

import { morePageIcons } from '@/components/icons';
import { APP_INFO } from '@/constants/app-info';
import { useNavigate } from 'react-router-dom';

export const AppVersionView = () => {
  const [clickCount, setClickCount] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    let timerId: NodeJS.Timeout;

    const resetCount = () => {
      setClickCount(0);
    };

    if (clickCount > 0) {
      timerId = setTimeout(resetCount, 5000);
    }

    return () => clearTimeout(timerId);
  }, [clickCount]);

  const handleInteraction = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 10) {
        navigate('/admin');
      }
      return newCount;
    });
  };

  return (
    <div
      onClick={handleInteraction}
      className="flex items-center justify-between w-full py-4 px-6 text-sm"
    >
      <div className="flex items-center gap-2">
        <img
          src={morePageIcons.info}
          alt="info icon"
          className="h-[1.2rem] w-[1.2rem]"
        />
        앱 버전
      </div>
      <span>{APP_INFO.version}</span>
    </div>
  );
};
