import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { FoodInventorySection } from './food-inventory';
import React from 'react';

interface FoodInventoryDrawerProps {
  children: React.ReactNode;
}

export const FoodInventoryDrawer = ({ children }: FoodInventoryDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-mobile">
          <DrawerHeader>
            <DrawerTitle>재료</DrawerTitle>
            <DrawerDescription>
              최대 4개까지 보관할 수 있습니다.
            </DrawerDescription>
          </DrawerHeader>
          <FoodInventorySection />
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
