import { CDN_IMAGES } from '@/constants/cdn-images';

export const NotFoundPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-safe-offset-14 pb-safe-offset-14">
      <img
        src={CDN_IMAGES.mascot.normal}
        alt="not found image"
        className="w-1/2"
      />
      <p>페이지를 찾을 수 없습니다.</p>
      <p>Not Found 404</p>
    </div>
  );
};
