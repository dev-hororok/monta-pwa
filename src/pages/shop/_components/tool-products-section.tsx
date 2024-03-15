import { useShopConsumableItemsQuery } from '@/services/queries/shop-queries';
import { ProductCard } from './product-card';
import { PurchaseItemDialog } from './purchase-item-dialog';
import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { useRequireLogin } from '@/hooks/use-require-login';

export const ToolProductsSection = () => {
  const { data: member } = useCurrentMemberQuery();
  const { openRequireLoginModal } = useRequireLogin();
  const {
    data: items,
    isPending: itemsIsPending,
    isError: itemsIsError,
  } = useShopConsumableItemsQuery();

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
