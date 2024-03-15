import { Button } from '@/components/ui/button';
import { FoodInventoryDrawer } from './food-inventory-drawer';

export const FoodInventoryButton = () => {
  return (
    <FoodInventoryDrawer>
      <Button
        type="button"
        variant={'ghost'}
        className="rounded-3xl text-xl py-6 px-6"
        aria-label="food-inventory"
      >
        <img src="/egg.png" alt="bag" className="size-8" />
      </Button>
    </FoodInventoryDrawer>
  );
};
