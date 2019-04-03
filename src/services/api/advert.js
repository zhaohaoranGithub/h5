import * as apiService from '@/services/api.js';

/**
 * 获取广告
 * @return {Promise<*[]>}
 */
const advertListApi = async({position, app = 0}) => {
  const [result, data] = await apiService.post(api.ADVERT_LIST, {
    position,
    app
  });

  return [result, data];
};


export {
  advertListApi,
};