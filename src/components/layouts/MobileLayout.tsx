import { Footer } from '../Footer';
import {
  BackpackIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from '@radix-ui/react-icons';
import { NavItem } from '@/interfaces/app.interface';
import { Outlet } from 'react-router-dom';
import { ShoppingBagIcon, User } from 'lucide-react';

const navItems: NavItem[] = [
  {
    text: '홈',
    icon: <HomeIcon className="w-5 h-5" />,
    href: '/',
  },
  {
    text: '내정보',
    icon: <User className="w-5 h-5" />,
    href: '/my',
  },
  {
    text: '상점',
    icon: <ShoppingBagIcon className="w-5 h-5" />,
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
