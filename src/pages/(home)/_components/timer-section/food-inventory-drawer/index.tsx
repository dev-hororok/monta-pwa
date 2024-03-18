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
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-mobile">
          <DrawerHeader>
            <DrawerTitle>보유중인 알</DrawerTitle>
            <DrawerDescription>
              최대 4개까지 보관할 수 있습니다. <br />
              (버릴 수 없어요. 끝까지 책임져주세요!)
            </DrawerDescription>
          </DrawerHeader>
          <FoodInventorySection />
          <DrawerFooter>
            <DrawerClose className="w-full">close</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
