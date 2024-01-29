import { CharacterItemCard } from '@/components/cards/CharacterCard';
import { dummyCharacterInventory } from '@/mocks/characterIncentoryMock';
import { useCharacterInventoryQuery } from '@/queries/memberQueries';
import { SunIcon } from '@radix-ui/react-icons';

interface Props {
  memberId: string;
}

export const CharacterInventorySection = ({ memberId }: Props) => {
  const { data: characterInventory, isPending } =
    useCharacterInventoryQuery(memberId);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <section>
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <p className="font-semibold">캐릭터</p>
          <div className="flex items-center gap-1 text-xs">
            <SunIcon className="w-3 h-3" />
            {dummyCharacterInventory.reduce(
              (acc, cur) => acc + cur.character.sell_price,
              0
            )}
          </div>
        </div>
        <p className="font-semibold text-sm text-muted-foreground">
          {dummyCharacterInventory.length} 개
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {dummyCharacterInventory.map((item, idx) => {
          return (
            <CharacterItemCard
              key={idx}
              imgSrc={item.character.image_url}
              alt={item.character.name}
              price={item.character.sell_price}
              name={item.character.name}
              grade={item.character.grade}
            />
          );
        })}
      </div>
    </section>
  );
};
