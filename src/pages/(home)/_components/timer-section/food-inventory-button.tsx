import { Button } from '@/components/ui/button';
import { FoodInventoryDrawer } from './food-inventory-drawer';
import { CDN_IMAGES } from '@/constants/cdn-images';

export const FoodInventoryButton = () => {
  return (
    <FoodInventoryDrawer>
      <Button
        type="button"
        variant={'ghost'}
        className="rounded-3xl text-xl py-6 px-4"
        aria-label="food-inventory"
      >
        <img src={CDN_IMAGES.nest} alt="nest icon" className="size-12" />
      </Button>
    </FoodInventoryDrawer>
  );
};
