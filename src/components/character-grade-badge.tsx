import { CharacterGrade } from '@/types/models/character.model';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface CharacterGradeBadgeProps {
  grade: CharacterGrade;
  className?: string;
}

export const CharacterGradeBadge = ({
  grade,
  className,
}: CharacterGradeBadgeProps) => {
  const commonStyle =
    'bg-secondary text-secondary-foreground hover:bg-secondary/80';
  const rareStyle = 'bg-blue-500 text-white hover:bg-blue-500/80';
  const epicStyle = 'bg-purple-500 text-white hover:bg-purple-500/80';
  const legendaryStyle =
    'bg-gradient-to-tl from-[#FF2525] to-[#FFE53B] text-white hover:opacity-80';

  return (
    <Badge
      className={cn(
        'text-xs border-none shadow-md',
        grade === 'Common' && commonStyle,
        grade === 'Rare' && rareStyle,
        grade === 'Epic' && epicStyle,
        grade === 'Legendary' && legendaryStyle,
        className
      )}
    >
      {grade}
    </Badge>
  );
};
