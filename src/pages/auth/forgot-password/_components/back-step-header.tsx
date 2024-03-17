import { commonIcons } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface BackStepHeaderProps {
  onClick: () => void;
}

export const BackStepHeader = ({ onClick }: BackStepHeaderProps) => {
  return (
    <header className="flex items-end justify-center fixed top-0 left-0 right-0 md:absolute h-14 mt-safe md:rounded-t-md bg-background">
      <Button variant={'ghost'} onClick={onClick} className="absolute left-3">
        <img src={commonIcons.left} alt="left icon" className="size-8" />
      </Button>
    </header>
  );
};
