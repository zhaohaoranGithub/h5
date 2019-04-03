import Mock from 'mockjs';

const List = [],
  count = 15;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id:'@increment(1, 100)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    bankList:[
      ..._.times(12,()=>({
        'id':111,
        'name':1111
      }))],
    'paymentType|1': [1,2,3],
    'paymentName|1': _.map(consts.RECHARGE_TYPE_NAMES, 'title'),
  }));

}

export default {
  [api.RECHARGE_LIST]: config => {
    const {id} = config;
    return {
      data: {
        paymentList:List
      },
      code: 1,
    };
  },
};
