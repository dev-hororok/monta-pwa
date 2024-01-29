import { EggAddCard } from '@/components/cards/EggAddCard';
import { EggCard } from '@/components/cards/EggCard';
import { dummyEggInventory } from '@/mocks/eggInventoryMock';
import { useEggInventoryQuery } from '@/queries/memberQueries';

interface Props {
  memberId: string;
}

export const EggInventorySection = ({ memberId }: Props) => {
  const { data: eggInventory, isPending } = useEggInventoryQuery(memberId);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className="px-4">
      <p className="text-center text-sm font-bold pb-4">재료 (최대 4개)</p>
      <div className="grid grid-cols-4 gap-1">
        {dummyEggInventory ? (
          <>
            {dummyEggInventory.map((eggInventory, idx) => {
              return (
                <EggCard
                  key={idx}
                  imgSrc={eggInventory.egg.image_url}
                  restSeconds={eggInventory.progress}
                />
              );
            })}
            {dummyEggInventory.length < 4 ? <EggAddCard /> : null}
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
