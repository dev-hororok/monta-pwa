import {
  BackpackIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from '@radix-ui/react-icons';
import { ShoppingBagIcon, User } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import type { NavItem } from '@/types/nav';
import Footer from '@/components/footer';

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

const MobileLayout = () => {
  return (
    <>
      <Outlet />
      <Footer navItems={navItems} />
    </>
  );
};

export default MobileLayout;
