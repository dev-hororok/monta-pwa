import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface Props {
  setInitialTime: React.Dispatch<React.SetStateAction<number>>;
  initialTime: number;
}

const TimePicker = ({ initialTime, setInitialTime }: Props) => {
  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
        skipSnaps: true,
        startIndex: initialTime / 5 - 1,
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 24 }).map((_, index) => {
          const minutes = (index + 1) * 5;
          const isSelected = minutes === initialTime;
          return (
            <CarouselItem key={index} className={cn('basis-1/3')}>
              <div className="p-1">
                <Card
                  className={cn(
                    'cursor-pointer h-14 flex items-center justify-center',
                    isSelected && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => setInitialTime(minutes)}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{minutes}m</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default TimePicker;
