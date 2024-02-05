import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IMember } from '@/models/member.model';

interface Props {
  member: IMember;
}

export const MemberProfileSection = ({ member }: Props) => {
  return (
    <section className="flex flex-col items-center gap-2 py-4">
      <Avatar className="w-20 h-20">
        <AvatarImage src={member.image_url} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center">
        <Button type="button" variant={'ghost'}>
          {member.nickname}
        </Button>
        <Button
          type="button"
          variant={'ghost'}
          className="font-normal text-sm text-foreground/70"
        >
          상태 메세지
        </Button>
      </div>

      <div className="w-full grid grid-cols-3 divide-x pt-2">
        <div
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex flex-col items-center gap-2 h-auto cursor-pointer text-xs'
          )}
        >
          <p className="font-semibold">요리 개수</p>
          <p className="font-normal">0</p>
        </div>
        <div
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex flex-col items-center gap-2 h-auto cursor-pointer text-xs'
          )}
        >
          <div>
            <span className="font-semibold">집중 시간 </span>
            <span className="font-light text-foreground/70">(총)</span>
          </div>
          <p className="font-normal">0</p>
        </div>
        <div
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex flex-col items-center gap-2 h-auto cursor-pointer text-xs'
          )}
        >
          <div>
            <span className="font-semibold">집중 시간 </span>
            <span className="font-light text-foreground/70">(오늘)</span>
          </div>
          <p className="font-normal">0</p>
        </div>
      </div>
    </section>
  );
};
