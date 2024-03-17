import { Button } from '@/components/ui/button';
import { FoodInventoryDrawer } from './food-inventory-drawer';

export const FoodInventoryButton = () => {
  return (
    <FoodInventoryDrawer>
      <Button
        type="button"
        variant={'ghost'}
        className="rounded-3xl text-xl py-6 px-4"
        aria-label="food-inventory"
      >
        <img
          src="https://d2quahb2ygxiv.cloudfront.net/c92b5b1ca2b81459a46ef.png"
          alt="bag"
          className="size-12"
        />
      </Button>
    </FoodInventoryDrawer>
  );
};
