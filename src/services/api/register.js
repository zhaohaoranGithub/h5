import * as apiService from '../api';
import api from '@/consts/api';
/**
 *  会员注册
 * */
export const registerApi = async (params) => {
  const [result, data] = await apiService.post(api.USER_REGISTER, params);
  return [result, data];
};