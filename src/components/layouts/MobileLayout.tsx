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
    <>
      <Outlet />
      <Footer navItems={navItems} />
    </>
  );
};
