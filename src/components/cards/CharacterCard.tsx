import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ICharacterInventory } from '@/models/character.model';

interface Props {
  characterInventory: ICharacterInventory;
}

export const CharacterItemCard = ({ characterInventory }: Props) => {
  return (
    <Button
      type="button"
      variant={'ghost'}
      className="h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm"
    >
      <Badge variant={'secondary'}>
        {characterInventory.character.grade} 등급
      </Badge>
      <img
        onContextMenu={(e) => e.preventDefault()}
        src={characterInventory.character.image_url}
        alt={characterInventory.character.name}
        width={200}
        height={200}
        className="p-2"
      />
      <div className="w-full flex flex-col items-center justify-between gap-1.5">
        <p className="w-full font-semibold truncate">
          {characterInventory.character.name}
        </p>
        <p className="flex items-center gap-1 text-foreground/60">
          {characterInventory.character.sell_price}원 |{' '}
          {characterInventory.quantity}개
        </p>
      </div>
    </Button>
  );
};
