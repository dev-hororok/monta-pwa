import { nestHttpRequest } from '../common/httpRequest';
import { ApiSuccessResponse } from '../interface/apiResponse.type';
import { IMember } from '@/models/member.model';
import { handleApiError } from '../common/apiErrorHandler';
import { ServiceResponse } from '../interface/serviceResponse.type';

class MemberService {
  async getCurrentMember(): Promise<ServiceResponse<IMember>> {
    try {
      const response = await nestHttpRequest.get<
        ApiSuccessResponse<{ member: IMember }>
      >('/timer-api/members/me');

      return {
        success: true,
        data: response.data.data.member,
      };
    } catch (error) {
      return handleApiError(error);
    }
  }
}

export default new MemberService();
