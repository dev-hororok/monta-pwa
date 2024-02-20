import type { ICharacterInventory } from '@/models/character.model';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface CharacterItemCardProps {
  characterInventory: ICharacterInventory;
  onClick: () => void;
}

export const CharacterItemCard = ({
  characterInventory,
  onClick,
}: CharacterItemCardProps) => {
  const { character, quantity } = characterInventory;
  const { grade, image_url, name, sell_price } = character;

  return (
    <div
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm cursor-pointer'
      )}
      onClick={onClick}
    >
      <Badge variant="secondary">{grade} 등급</Badge>
      <img
        onContextMenu={(e) => e.preventDefault()} // 이미지 우클릭 방지
        src={image_url}
        alt={name}
        width={200}
        height={200}
        className="p-2"
      />
      <CharacterInfo name={name} sellPrice={sell_price} quantity={quantity} />
    </div>
  );
};

interface CharacterInfoProps {
  name: string;
  sellPrice: number;
  quantity: number;
}

const CharacterInfo = ({ name, sellPrice, quantity }: CharacterInfoProps) => (
  <div className="w-full flex flex-col items-center justify-center gap-1.5">
    <p className="w-full font-semibold truncate text-center">{name}</p>
    <p className="flex items-center gap-1 text-foreground/60">
      {sellPrice}원 | {quantity}개
    </p>
  </div>
);

CharacterItemCard.Skeleton = () => {
  return <Skeleton className="w-full aspect-[3/4]"></Skeleton>;
};
