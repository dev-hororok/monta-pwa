import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

import { CDN_IMAGES } from '@/constants/cdn-images';

interface GiveUpWorkAlarmProps {
  earnedPoints: number;
}

export const GiveUpWorkAlarm = ({ earnedPoints }: GiveUpWorkAlarmProps) => {
  return (
    <div className={'w-full h-1/2 flex flex-col items-center justify-end'}>
      <Fireworks autorun={{ speed: 1, duration: 2000 }} />
      <img
        src={CDN_IMAGES.mascot.exhausted}
        alt="main"
        className={'w-1/2 aspect-square'}
      />
      <div className="w-2/3 mx-auto text-center">
        <p>중간에 포기했습니다 ㅜㅜ 다시 파이팅해서 도전해보세요!</p>
        <br />
        <p>{earnedPoints} 포인트를 획득했습니다.</p>
      </div>
    </div>
  );
};
