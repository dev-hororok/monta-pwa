import {
  DEFAULT_ISITOR_IMAGE_URL,
  DEFAULT_MEMBER_IMAGE_URL,
} from '@/constants/constants';
import { EditNicknameDialog } from './edit-nickname-dialog';
import { EditProfileImageDialog } from './edit-profile-img-dialog';
import { EditStatusMessageDialog } from './edit-status-message-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { IMember } from '@/types/models/member.model';
import { useRequireLogin } from '@/hooks/use-require-login';

export const ProfileSection = () => {
  const { data: member } = useCurrentMemberQuery();
  const { openRequireLoginModal } = useRequireLogin();
  return (
    <section className="flex-center flex-col gap-1 py-4">
      <EditProfileSection
        member={member}
        onRequireLoginClick={openRequireLoginModal}
      />
      <EditNicknameSection
        member={member}
        onRequireLoginClick={openRequireLoginModal}
      />
      <EditStatusMessageSection
        member={member}
        onRequireLoginClick={openRequireLoginModal}
      />
    </section>
  );
};

interface EditComponentsProps {
  member?: IMember;
  onRequireLoginClick: () => void;
}

const EditProfileSection = ({
  member,
  onRequireLoginClick,
}: EditComponentsProps) => {
  return member ? (
    <EditProfileImageDialog member={member}>
      <Avatar className="w-28 h-28 hover:bg-accent cursor-pointer">
        <AvatarImage
          src={member.image_url ? member.image_url : DEFAULT_MEMBER_IMAGE_URL}
        />
        <AvatarFallback>{member.nickname}</AvatarFallback>
      </Avatar>
    </EditProfileImageDialog>
  ) : (
    <Avatar
      onClick={onRequireLoginClick}
      className="w-28 h-28 hover:bg-accent cursor-pointer"
    >
      <AvatarImage src={DEFAULT_ISITOR_IMAGE_URL} />
    </Avatar>
  );
};

const EditNicknameSection = ({
  member,
  onRequireLoginClick,
}: EditComponentsProps) => {
  return member ? (
    <EditNicknameDialog member={member}>
      <Button type="button" variant={'ghost'}>
        {member.nickname}
      </Button>
    </EditNicknameDialog>
  ) : (
    <Button onClick={onRequireLoginClick} type="button" variant={'ghost'}>
      못생겼닭
    </Button>
  );
};

const EditStatusMessageSection = ({
  member,
  onRequireLoginClick,
}: EditComponentsProps) => {
  return member ? (
    <EditStatusMessageDialog member={member}>
      <Button
        type="button"
        variant={'ghost'}
        className="font-normal text-sm text-foreground/70"
      >
        {member?.status_message
          ? member.status_message
          : '상태 메시지를 입력해주세요.'}
      </Button>
    </EditStatusMessageDialog>
  ) : (
    <Button
      onClick={onRequireLoginClick}
      type="button"
      variant={'ghost'}
      className="font-normal text-sm text-foreground/70"
    >
      로그인을 해주세요!
    </Button>
  );
};
