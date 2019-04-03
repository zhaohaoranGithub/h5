import * as apiService from '@/services/api.js';

/**
 * 系统公告列表
 * @param page
 * @param size
 * @returns {Promise<*[]>}
 */
const systemNoticeListApi = async({
                                    page = 1,
                                     size = 100
                                   } = {
  page: 1,
  size: 100
}) => {

  const [result,data] = await apiService.post(api.SYSTEM_NOTICE_LIST, {
    page,
    size,
  });

  return [result,data];
};

/**
 * 系统公告列表
 * @param noticeId
 * @returns {Promise<*[]>}
 */
const systemNoticeDetailApi = async({id}) => {

  const [result,data] = await apiService.post(api.SYSTEM_NOTICE_DETAIL, {
    noticeId: id
  });

  return [result,data];
};

/**
 * 阅读系统公告
 * @param id
 * @returns {Promise<*[]>}
 */
const systemNoticeReadApi = async({id}) => {

  const [result,data] = await apiService.post(api.SYSTEM_NOTICE_READ, {
    id
  });

  return [result,data];
};

/**
 * 未读系统公告总和
 * @returns {Promise<*[]>}
 */
const systemNoticeUnreadCountApi = async() => {

  const [result,data] = await apiService.post(api.SYSTEM_NOTICE_COUNT);

  return [result,data];
};


/**
 * 系统消息列表
 * @param page
 * @param size
 * @returns {Promise<*[]>}
 */
const userNoticeListApi = async({
                                    page = 1,
                                    size = 10
                                  }) => {

  const [result,data] = await apiService.post(api.USER_NOTICE_LIST, {
    page,
    size,
  });

  return [result,data];
};

/**
 * 获取新系统消息
 * @returns {Promise<*[]>}
 */
const userNoticeNewApi = async() => {

  const [result,data] = await apiService.post(api.USER_NOTICE_NEW);

  return [result,data];
};

const readAllApi = async() => {
  const [result,data] = await apiService.post(api.SYSTEM_NOTICE_ALL_READ);

  return [result,data];
};


export {
  systemNoticeListApi,
  systemNoticeDetailApi,
  systemNoticeReadApi,
  systemNoticeUnreadCountApi,
  userNoticeListApi,
  userNoticeNewApi,
  readAllApi,
};
