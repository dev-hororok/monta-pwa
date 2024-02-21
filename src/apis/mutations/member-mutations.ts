import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMember } from '../services/member.api';
import { CURRENT_MEMBER_QUERY_KEY } from '../queries/member-queries';

export const useEditMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      body,
    }: {
      memberId: string;
      body: { nickname?: string; status_message?: string; image_url?: string };
    }) => {
      return editMember(memberId, body);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CURRENT_MEMBER_QUERY_KEY],
      });
    },
  });
};
