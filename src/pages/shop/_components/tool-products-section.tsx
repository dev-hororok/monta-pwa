import { useShopConsumableItemsQuery } from '@/services/queries/shop-queries';
import { ProductCard } from './product-card';
import { PurchaseItemDialog } from './purchase-item-dialog';
import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { useRequireLogin } from '@/hooks/use-require-login';
import { NetworkError } from '@/components/network-error';

export const ToolProductsSection = () => {
  const { data: member } = useCurrentMemberQuery();
  const { openRequireLoginModal } = useRequireLogin();
  const {
    data: items,
    isLoading: itemsIsLoading,
    isError: itemsIsError,
    refetch,
  } = useShopConsumableItemsQuery();

  if (itemsIsLoading) {
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
    return <NetworkError onRefresh={() => refetch()} className="py-8" />;
  }

  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        {items && items.length === 0 ? <EmptyToolProductsMessage /> : null}
        {items &&
          items.map((item, idx) => {
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

const EmptyToolProductsMessage = () => {
  return (
    <div className="flex-center flex-col py-4 gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-eggs size-8"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M13 22c-3 0 -4.868 -2.118 -5 -5c0 -3 2 -5 5 -5c4 0 8.01 2.5 8 5c0 2.5 -4 5 -8 5z" />
        <path d="M8 18c-3.03 -.196 -5 -2.309 -5 -5.38c0 -4.307 2.75 -8.625 5.5 -8.62c2.614 0 5.248 3.915 5.5 8" />
      </svg>
      <p className="text-sm">파는 물건이 없닭!</p>
    </div>
  );
};
