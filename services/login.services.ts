import { loginUser } from '~/types/global';
import { API_BASE_URL } from '~/utils/constants/global';
import { POST_CALL } from '~/utils/helper/api';

export const signInUser = async (payload: loginUser) => {
  return await POST_CALL(`${API_BASE_URL}/auth/signin`, payload);
};
