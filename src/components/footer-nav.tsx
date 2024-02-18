import * as React from 'react';
import { NavLink } from 'react-router-dom';

import type { NavItem } from '@/types/nav';
import { Icons } from '@/components/icons';

const navItems: NavItem[] = [
  {
    text: '홈',
    icon: <Icons.home className="w-5 h-5" />,
    href: '/',
  },
  {
    text: '내정보',
    icon: <Icons.user className="w-5 h-5" />,
    href: '/my',
  },
  {
    text: '상점',
    icon: <Icons.shop className="w-5 h-5" />,
    href: '/shop',
  },
  {
    text: '인벤토리',
    icon: <Icons.bag className="w-5 h-5" />,
    href: '/inventory',
  },
  {
    text: '더보기',
    icon: <Icons.moreHorizontal className="w-5 h-5" />,
    href: '/more',
  },
];

export const FooterNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:absolute h-14 flex items-center mb-safe md:rounded-b-md bg-accent">
      {navItems.map((nav) => {
        return (
          <NavItemLink
            key={nav.text}
            icon={nav.icon}
            href={nav.href}
            // text={nav.text}
          />
        );
      })}
    </nav>
  );
};

interface NavItemLinkProps {
  icon: React.ReactNode;
  href: string;
  // text: string;
}

const NavItemLink = ({ icon, href }: NavItemLinkProps) => {
  return (
    <NavLink
      to={href}
      replace
      className={({ isActive }) =>
        `w-full text-xs ${
          isActive
            ? 'text-accent-foreground'
            : 'text-accent-foreground/50 hover:text-accent-foreground duration-200'
        }`
      }
    >
      <div className="flex flex-col items-center py-2 gap-1">
        {icon}
        {/* <p>{text}</p> */}
      </div>
    </NavLink>
  );
};