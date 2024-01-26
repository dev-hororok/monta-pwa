import { nestHttpRequest } from '@/apis/common/httpRequest';
import { ApiSuccessResponse } from '@/apis/interface/apiResponse.type';
import { IMember } from '@/models/member.model';
import { useQuery } from '@tanstack/react-query';

export const MEMBER_QUERY_KEY = '/members/me';

const fetchCurrentMember = async () => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ member: IMember }>
  >('/timer-api/members/me');
  return response.data.data.member;
};

export const useCurrentMemberQuery = () => {
  return useQuery({
    queryKey: [MEMBER_QUERY_KEY],
    queryFn: fetchCurrentMember,
    staleTime: 10 * 60 * 1000,
  });
};
