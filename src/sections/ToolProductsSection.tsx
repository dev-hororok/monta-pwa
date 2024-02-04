import { useCurrentMemberQuery } from '@/apis/queries/memberQueries';
import { useShopConsumableItemsQuery } from '@/apis/queries/shopQueries';
import { ProductCard } from '@/components/cards/ProductCard';
import { PurchaseDrawer } from '@/components/shop/PurchaseDrawer';

export const ToolProductsSection = () => {
  const {
    data: member,
    isPending: memberIdPending,
    isError: memberIsError,
  } = useCurrentMemberQuery();
  const {
    data: items,
    isPending: itemsIsPending,
    isError: itemsIsError,
  } = useShopConsumableItemsQuery();

  if (itemsIsPending || memberIdPending) {
    return <div>Loading...</div>;
  }

  if (itemsIsError || memberIsError) {
    return <div>Error</div>;
  }

  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, idx) => {
          return (
            <PurchaseDrawer key={idx} item={item} member={member}>
              <div>
                <ProductCard
                  key={idx}
                  imgSrc={item.image_url}
                  alt={item.name}
                  price={item.cost}
                  name={item.name}
                  description={item.description}
                />
              </div>
            </PurchaseDrawer>
          );
        })}
      </div>
    </section>
  );
};
