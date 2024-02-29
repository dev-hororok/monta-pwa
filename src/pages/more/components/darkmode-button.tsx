import { Icons } from '@/components/icons';
import { useTheme } from '@/components/providers/theme-provider';

export const DarkModeButton = () => {
  const { setTheme } = useTheme();
  return (
    <div className="flex">
      <div
        className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm gap-2 dark:hidden"
        onClick={() => setTheme('dark')}
      >
        <Icons.moon className="h-[1.2rem] w-[1.2rem]" />
        다크모드
      </div>
      <div
        className="hidden dark:flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm gap-2"
        onClick={() => setTheme('light')}
      >
        <Icons.sun className="h-[1.2rem] w-[1.2rem]" />
        라이트모드
      </div>
    </div>
  );
};
