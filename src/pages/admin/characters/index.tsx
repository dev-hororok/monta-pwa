import { CDN_IMAGES } from '@/constants/cdn-images';

export const AdminCharactersPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-safe-offset-14 pb-safe-offset-14">
      <img
        src={CDN_IMAGES.mascot.normal}
        alt="not found image"
        className="w-1/2"
      />
      <p>어드민이다</p>
    </div>
  );
};
