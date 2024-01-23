import { NavItem } from '@/interfaces/app.interface';
import { cn } from '@/lib/utils';

interface Props {
  navItems: NavItem[];
}

export const Footer = ({ navItems }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:absolute h-14 flex items-center mb-safe md:rounded-b-md bg-primary">
      {navItems.map((nav) => {
        const isActive = false;
        return (
          <a
            href={nav.href}
            key={nav.text}
            className={cn(
              'w-full text-xs',
              isActive
                ? 'text-primary-foreground'
                : 'text-primary-foreground/50 hover:text-primary-foreground duration-200'
            )}
          >
            <div className="flex flex-col items-center py-2 gap-1">
              {nav.icon}
              <p>{nav.text}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
};
