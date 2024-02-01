import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import useBoundStore from '@/stores/useBoundStore';

const TimePicker = () => {
  const initialTime = useBoundStore((state) => state.initialTime);
  const setInitialTime = useBoundStore((state) => state.setInitialTime);
  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
        skipSnaps: true,
        startIndex: initialTime / 5 - 1,
      }}
      className="w-full max-w-[368px] mx-auto"
    >
      <CarouselContent>
        {Array.from({ length: 24 }).map((_, index) => {
          const minutes = (index + 1) * 5;
          const isSelected = minutes === initialTime;
          return (
            <CarouselItem key={index} className={cn('basis-1/4')}>
              <div className="p-1">
                <Card
                  className={cn(
                    'cursor-pointer h-12 flex items-center justify-center',
                    isSelected && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => setInitialTime(minutes)}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-xl font-semibold">{minutes}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default TimePicker;
