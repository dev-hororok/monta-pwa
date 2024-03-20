import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IAdminCharacter } from '@/services/admin/types/characters.model';
import { formatDateStr } from '@/lib/date-format';

interface AdminCharacterCardProps {
  character: IAdminCharacter;
}

export const AdminCharacterCard = ({ character }: AdminCharacterCardProps) => {
  const {
    character_id,
    grade,
    image_url,
    name,
    sell_price,
    updated_at,
    description,
  } = character;

  return (
    <div
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-auto p-2 flex flex-col items-center justify-center text-xs shadow-sm cursor-pointer'
      )}
    >
      <p className="text-base">id: {character_id}</p>
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
        description={description}
      />
    </div>
  );
};

interface CharacterInfoProps {
  name: string;
  sellPrice: number;
  description: string;
  updated_at: Date | string;
}

const CharacterInfo = ({
  name,
  sellPrice,
  description,
  updated_at,
}: CharacterInfoProps) => (
  <div className="w-full flex flex-col items-center justify-center gap-1.5">
    <p className="w-full font-semibold truncate text-center">{name}</p>
    <p className="text-foreground/60">{sellPrice}원</p>
    <p className="w-full text-foreground/60 truncate">{description}</p>
    <p className="text-foreground/60">수정일: {formatDateStr(updated_at)}</p>
  </div>
);
