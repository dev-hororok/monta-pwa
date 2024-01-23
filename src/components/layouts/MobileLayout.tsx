import { Header } from '../Header';
import { Footer } from '../Footer';
import {
  BackpackIcon,
  DotsHorizontalIcon,
  HomeIcon,
  RocketIcon,
  TimerIcon,
} from '@radix-ui/react-icons';
import { NavItem } from '@/interfaces/app.interface';
import { Outlet } from 'react-router-dom';
import { Toaster } from '../ui/toaster';

const navItems: NavItem[] = [
  {
    text: '홈',
    icon: <HomeIcon className="w-5 h-5" />,
    href: '/',
  },
  {
    text: '타이머',
    icon: <TimerIcon className="w-5 h-5" />,
    href: '/study',
  },
  {
    text: '상점',
    icon: <RocketIcon className="w-5 h-5" />,
    href: '/shop',
  },
  {
    text: '인벤토리',
    icon: <BackpackIcon className="w-5 h-5" />,
    href: '/inventory',
  },
  {
    text: '더보기',
    icon: <DotsHorizontalIcon className="w-5 h-5" />,
    href: '/more',
  },
];

export const MobileLayout = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full fixed top-0 md:top-1/2 md:left-1/2 md:-ml-[213px] md:-mt-[368px]">
        <div className="relative w-full h-screen md:w-[416px] md:h-[736px] md:border md:rounded-md">
          <Header />
          <main className="pb-safe-offset-14 pt-safe-offset-14">
            {<Outlet />}
            <Toaster />
          </main>
          <Footer navItems={navItems} />
        </div>
      </div>
    </div>
  );
};
