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
        startIndex: initialTime === 10 ? 0 : initialTime / 60 / 5 - 1,
      }}
      className="w-full max-w-[368px] mx-auto"
    >
      <CarouselContent>
        {/* 테스트용 10초 */}
        <Card
          className={cn(
            'cursor-pointer h-12 flex items-center justify-center',
            initialTime === 10 && 'bg-primary text-primary-foreground'
          )}
          onClick={() => setInitialTime(10)}
        >
          <CardContent className="flex aspect-square items-center justify-center p-6 shrink-0">
            <span className="text-xl font-semibold">테스트용 </span>
          </CardContent>
        </Card>

        {Array.from({ length: 24 }).map((_, index) => {
          const minutes = (index + 1) * 5;
          const isSelected = minutes * 60 === initialTime;
          return (
            <CarouselItem key={index} className={cn('basis-1/4')}>
              <div className="p-1">
                <Card
                  className={cn(
                    'cursor-pointer h-12 flex items-center justify-center',
                    isSelected && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => setInitialTime(minutes * 60)}
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
