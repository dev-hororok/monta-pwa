import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useTimerOptionsStore } from '@/stores/timerOptionsStore';

const TimePicker = () => {
  const timerOptions = useTimerOptionsStore((state) => state.timerOptions);
  const setTimerOptions = useTimerOptionsStore(
    (state) => state.setTimerOptions
  );

  const updatePomodoroTime = (time: number) => {
    setTimerOptions({ ...timerOptions, pomodoroTime: time });
  };

  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
        skipSnaps: true,
        startIndex:
          timerOptions.pomodoroTime === 0.2
            ? 0
            : timerOptions.pomodoroTime / 5 - 1,
      }}
      className="w-full max-w-[368px] mx-auto"
    >
      <CarouselContent>
        {/* 테스트용 10초 */}
        <Card
          className={cn(
            'cursor-pointer h-12 flex items-center justify-center',
            timerOptions.pomodoroTime === 0.2 &&
              'bg-primary text-primary-foreground'
          )}
          onClick={() => updatePomodoroTime(0.2)}
        >
          <CardContent className="flex aspect-square items-center justify-center p-6 shrink-0">
            <span className="text-xl font-semibold">테스트용 </span>
          </CardContent>
        </Card>

        {Array.from({ length: 24 }).map((_, index) => {
          const minutes = (index + 1) * 5;
          const isSelected = minutes === timerOptions.pomodoroTime;
          return (
            <CarouselItem key={index} className={cn('basis-1/4')}>
              <div className="p-1">
                <Card
                  className={cn(
                    'cursor-pointer h-12 flex items-center justify-center',
                    isSelected && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => updatePomodoroTime(minutes)}
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
