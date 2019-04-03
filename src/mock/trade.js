import Mock from 'mockjs';

const List = [],
  count = 15;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id:'@increment(1, 100)',
    time: +Mock.Random.date('T'),
    orderNo: '@int(0,19999)',
    trade_type:'@int(1,10)',
    sub_type:'@int(1,10)',
    money:'@int(1,10)',
    win_lose:'@int(1,10)',
    balance:'@int(1,10)',
    'status|1': _.map(consts.RECHARGE_TYPE_NAMES, 'title'),
  }));

}

export default {
  [api.USER_TRADE_LIST]: config => {
    const {id} = config;
    return {
      data: {
        list:List,
        total:List.length
      },
      code: 1,
    };
  },
};
