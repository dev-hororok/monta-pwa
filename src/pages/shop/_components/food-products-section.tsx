import { useShopFoodItemsQuery } from '@/services/queries/shop-queries';
import { ProductCard } from './product-card';
import { PurchaseItemDialog } from './purchase-item-dialog';
import { useRequireLogin } from '@/hooks/use-require-login';
import { useCurrentMemberQuery } from '@/services/queries/member-queries';

export const FoodProductsSection = () => {
  const { data: member } = useCurrentMemberQuery();
  const { openRequireLoginModal } = useRequireLogin();
  const {
    data: items,
    isPending: itemsIsPending,
    isError: itemsIsError,
  } = useShopFoodItemsQuery();

  if (itemsIsPending) {
    return (
      <div className="grid grid-cols-3 gap-2">
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
      </div>
    );
  }

  if (itemsIsError) {
    return <div>Error</div>;
  }

  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, idx) => {
          return member ? (
            <PurchaseItemDialog key={idx} item={item} member={member}>
              <ProductCard item={item} />
            </PurchaseItemDialog>
          ) : (
            <div key={idx} onClick={openRequireLoginModal}>
              <ProductCard item={item} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
