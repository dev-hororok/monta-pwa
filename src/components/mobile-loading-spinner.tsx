import { loadingIcons } from './icons';

export const MobileLoadingSpinner = () => {
  return (
    <div className="absolute bottom-14 left-0 flex flex-col justify-center items-center w-full h-full bg-background z-50">
      <img
        src={loadingIcons.globalLoading}
        alt="loading img"
        className="w-10 h-10 animate-bounce text-primary"
      />
      <p>로딩중...</p>
    </div>
  );
};
