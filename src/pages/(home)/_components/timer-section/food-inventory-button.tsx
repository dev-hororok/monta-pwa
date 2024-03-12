import { Button } from '@/components/ui/button';
import { FoodInventoryDrawer } from './food-inventory-drawer';

export const FoodInventoryButton = () => {
  return (
    <FoodInventoryDrawer>
      <Button variant={'ghost'} className="rounded-3xl py-6 w-16 text-xl">
        <img src="/egg.png" className="size-8" />
      </Button>
    </FoodInventoryDrawer>
  );
};
