import { NavItem } from '@/interfaces/app.interface';
import { NavLink } from 'react-router-dom';

interface Props {
  navItems: NavItem[];
}

export const Footer = ({ navItems }: Props) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:absolute h-14 flex items-center mb-safe md:rounded-b-md bg-primary">
      {navItems.map((nav) => {
        return (
          <NavLink
            to={nav.href}
            key={nav.text}
            className={({ isActive }) =>
              isActive
                ? 'w-full text-xs text-primary-foreground'
                : 'w-full text-xs text-primary-foreground/50 hover:text-primary-foreground duration-200'
            }
          >
            <div className="flex flex-col items-center py-2 gap-1">
              {nav.icon}
              <p>{nav.text}</p>
            </div>
          </NavLink>
        );
      })}
    </nav>
  );
};
