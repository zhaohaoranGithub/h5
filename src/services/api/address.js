import * as apiService from '@/services/api.js';

/**
 * 创建收货地址
 * @return {Promise<*[]>}
 * @param name 收货人姓名
 * @param mobile 收货手机号
 * @param cityId 城市ID
 * @param street 详细地址
 * @param areaId
 * @param status
 */
const addressAddApi = async({name, mobile, cityId, areaId, street, status = 0}) => {
  const [result, data] = await apiService.post(api.ADDRESS_ADD, {
    name, mobile, cityId, areaId, street, status
  });

  return [result, data];
};

/**
 * 获取省份列表
 * @return {Promise<*[]>}
 */
const addressProvinceApi = async() => {
  const [result, data] = await apiService.post(api.ADDRESS_PROVINCE_LIST);

  return [result, data];
};

/**
 * 获取城市列表
 * @return {Promise<*[]>}
 */
const addressCityListApi = async(provinceId) => {
  const [result, data] = await apiService.post(api.ADDRESS_CITY_LIST, {
    provinceId
  });

  return [result, data];
};

/**
 * 获取地区列表
 * @return {Promise<*[]>}
 */
const addressAreaListApi = async(cityId) => {
  const [result, data] = await apiService.post(api.ADDRESS_AREA_LIST, {
    cityId
  });

  return [result, data];
};

/**
 * 修改默认收货地址
 * @return {Promise<*[]>}
 * @param id
 */
const addressDefaultSetApi = async(id) => {
  const [result, data] = await apiService.post(api.ADDRESS_DEFAULT_SET, {
    id
  });

  return [result, data];
};
/**
 * 删除收货地址
 * @return {Promise<*[]>}
 * @param id
 */
const addressDeleteApi = async(id) => {
  const [result, data] = await apiService.post(api.ADDRESS_DELETE, {
    id
  });

  return [result, data];
};
/**
 * 获取我的收货地址列表
 * @return {Promise<*[]>}
 */
const addressListApi = async() => {
  const [result, data] = await apiService.post(api.ADDRESS_LIST);

  return [result, data];
};

/**
 * 修改收货地址
 * @return {Promise<*[]>}
 */
const addressUpdateApi = async({id, name, mobile, cityId, areaId, street, status = 0}) => {
  const [result, data] = await apiService.post(api.ADDRESS_UPDATE, {
    id, name, mobile, cityId, areaId, street, status
  });

  return [result, data];
};

export {
  addressAddApi,
  addressCityListApi,
  addressDefaultSetApi,
  addressDeleteApi,
  addressListApi,
  addressAreaListApi,
  addressProvinceApi,
  addressUpdateApi,
};

