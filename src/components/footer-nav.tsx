import * as React from 'react';
import { NavLink } from 'react-router-dom';

import type { NavItem } from '@/types/nav';
import { footerNavIcons } from '@/components/icons';

const navItems: NavItem[] = [
  {
    text: '홈',
    icon: <img src={footerNavIcons.home} alt="home icon" className="size-6" />,
    href: '/',
  },
  {
    text: '내정보',
    icon: <img src={footerNavIcons.user} alt="user icon" className="size-6" />,
    href: '/my',
  },
  {
    text: '상점',
    icon: <img src={footerNavIcons.shop} alt="shop icon" className="size-6" />,
    href: '/shop',
  },
  {
    text: '인벤토리',
    icon: (
      <img
        src={footerNavIcons.backpack}
        alt="backpack icon"
        className="size-6"
      />
    ),
    href: '/inventory',
  },
  {
    text: '더보기',
    icon: <img src={footerNavIcons.dots} alt="dots icon" className="size-6" />,
    href: '/more',
  },
];

export const FooterNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:absolute h-14 flex items-center md:rounded-b-md bg-gray-50">
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
      aria-label={href}
      className={({ isActive }) =>
        `w-full text-xs text-accent-foreground ${
          isActive
            ? ' opacity-100'
            : 'opacity-50 hover:opacity-100 duration-200'
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
