import { API_BASE_URL } from '~/utils/constants/global';
import { GET_CALL_Token, POST_CALL_Token } from '~/utils/helper/api';

export const getAllLeads = async (token: string) => {
  return await GET_CALL_Token(`${API_BASE_URL}/leads-data/all-leads`, token);
};

export const createLead = async (body: any, token: string) => {
  return await POST_CALL_Token(`${API_BASE_URL}/leads-data/create-lead`, body, token);
};
