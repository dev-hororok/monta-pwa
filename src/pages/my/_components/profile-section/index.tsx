import { DEFAULT_MEMBER_IMAGE_URL } from '@/constants/constants';
import { EditNicknameDialog } from './edit-nickname-dialog';
import { EditProfileImageDialog } from './edit-profile-img-dialog';
import { EditStatusMessageDialog } from './edit-status-message-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { IMember } from '@/types/models/member.model';

interface ProfileSectionProps {
  member: IMember;
}

export const ProfileSection = ({ member }: ProfileSectionProps) => {
  return (
    <section className="flex-center flex-col gap-1 py-4">
      <EditProfileImageDialog member={member}>
        <Avatar className="w-28 h-28 hover:bg-accent cursor-pointer">
          <AvatarImage
            src={member.image_url ? member.image_url : DEFAULT_MEMBER_IMAGE_URL}
          />
          <AvatarFallback>{member.nickname}</AvatarFallback>
        </Avatar>
      </EditProfileImageDialog>

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
    </section>
  );
};
