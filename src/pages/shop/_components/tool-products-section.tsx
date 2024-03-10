import { useShopConsumableItemsQuery } from '@/apis/queries/shop-queries';
import { ProductCard } from './product-card';
import { PurchaseItemDialog } from './purchase-item-dialog';
import type { IMember } from '@/models/member.model';

interface ToolProductsSectionProps {
  member: IMember;
}

export const ToolProductsSection = ({ member }: ToolProductsSectionProps) => {
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
          return (
            <PurchaseItemDialog key={idx} item={item} member={member}>
              <ProductCard item={item} />
            </PurchaseItemDialog>
          );
        })}
      </div>
    </section>
  );
};
