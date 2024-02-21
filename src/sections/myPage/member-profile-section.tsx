import { EditNicknameDialog } from '@/components/dialogs/edit-nickname-dialog';
import { EditProfileImageDialog } from '@/components/dialogs/edit-profile-img-dialog';
import { EditStatusMessageDialog } from '@/components/dialogs/edit-status-message-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { IMember } from '@/models/member.model';

interface Props {
  member: IMember;
}

const MemberProfileSection = ({ member }: Props) => {
  return (
    <section className="flex flex-col items-center gap-2 py-4">
      <EditProfileImageDialog member={member}>
        <Avatar className="w-28 h-28 hover:bg-accent cursor-pointer">
          <AvatarImage src={member.image_url} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </EditProfileImageDialog>

      <div className="flex flex-col items-center">
        <EditNicknameDialog member={member}>
          <Button type="button" variant={'ghost'}>
            {member.nickname}
          </Button>
        </EditNicknameDialog>
        <EditStatusMessageDialog member={member}>
          <Button
            type="button"
            variant={'ghost'}
            className="font-normal text-sm text-foreground/70"
          >
            {member.status_message
              ? member.status_message
              : '상태 메시지를 입력해주세요.'}
          </Button>
        </EditStatusMessageDialog>
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

export default MemberProfileSection;
