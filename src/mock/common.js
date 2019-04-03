import Mock from 'mockjs';

export default {
  success: () => ({
    code: 1,
    data: 'success'
  }),
  failure: () => ({
    code: 500,
    data: {},
    message: '随意failure一下'
  }),
  successOrFailure: config => Mock.mock({
    'code|1': [1, 1, 1, 1, 1, 1, 1, 404, 505],
    data: 'success',
    message: '随意failure一下'
  })
};
