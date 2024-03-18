import { morePageIcons } from '@/components/icons';

export const AppVersionView = () => {
  return (
    <div className="flex items-center justify-between w-full py-4 px-6 text-sm">
      <div className="flex items-center gap-2">
        <img
          src={morePageIcons.info}
          alt="info icon"
          className="h-[1.2rem] w-[1.2rem]"
        />
        앱 버전
      </div>
      <span>1.0.0</span>
    </div>
  );
};
