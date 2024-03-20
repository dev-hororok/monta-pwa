import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IAdminCharacter } from '@/services/admin/types/characters.model';
import { formatDateStr } from '@/lib/date-format';

interface AdminCharacterCardProps {
  character: IAdminCharacter;
}

export const AdminCharacterCard = ({ character }: AdminCharacterCardProps) => {
  const { grade, image_url, name, sell_price, updated_at } = character;

  return (
    <div
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm cursor-pointer'
      )}
    >
      <Badge variant="secondary">{grade}</Badge>
      <img
        onContextMenu={(e) => e.preventDefault()} // 이미지 우클릭 방지
        src={image_url}
        alt={name}
        width={200}
        height={200}
        className="p-2"
      />
      <CharacterInfo
        name={name}
        sellPrice={sell_price}
        updated_at={updated_at}
      />
    </div>
  );
};

interface CharacterInfoProps {
  name: string;
  sellPrice: number;
  updated_at: Date | string;
}

const CharacterInfo = ({ name, sellPrice, updated_at }: CharacterInfoProps) => (
  <div className="w-full flex flex-col items-center justify-center gap-1.5">
    <p className="w-full font-semibold truncate text-center">{name}</p>
    <p className="flex items-center gap-1 text-foreground/60">{sellPrice}원</p>
    <p className="flex items-center gap-1 text-foreground/60">
      수정일: {formatDateStr(updated_at)}
    </p>
  </div>
);
