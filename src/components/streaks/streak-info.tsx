import { IStudyStreak } from '@/models/streak.model';
import { Badge } from '@/components/ui/badge';

interface Props {
  streakInfo?: IStudyStreak;
}

const StreakInfo = ({ streakInfo }: Props) => {
  const palette = streakInfo?.palette;
  return (
    <div className="flex flex-col items-end justify-end gap-1 streak-container pb-4">
      <div>
        <div className="flex items-center gap-1 streak-container py-2">
          {!palette ? (
            <Badge variant={'outline'} className="">
              C
            </Badge>
          ) : null}
          {palette?.grade === 'Rare' ? (
            <Badge className="bg-blue-400 hover:bg-blue-300">R</Badge>
          ) : null}
          {palette?.grade === 'Epic' ? (
            <Badge className="bg-purple-400 hover:bg-purple-300">E</Badge>
          ) : null}
          {palette?.grade === 'Legendary' ? <Badge>L</Badge> : null}
          <div className="w-5 h-5 rounded-sm color-scale-1" />
          <div className="w-5 h-5 rounded-sm color-scale-2" />
          <div className="w-5 h-5 rounded-sm color-scale-3" />
          <div className="w-5 h-5 rounded-sm color-scale-4" />
        </div>
      </div>
    </div>
  );
};

export default StreakInfo;
