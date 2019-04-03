// 全部
const ALL = -1;

//缓存名
const CACHE_USER_INFO = 'h5-proxy-user-info';
const CACHE_TOKEN = 'h5-token';
const CACHE_UID = 'h5-uid';
const CACHE_TELEPHONE = 'h5-telephone';
const CACHE_OS_TYPE = 'os_type';
const CACHE_USERNAME = 'h5-name';
const CACHE_DEVICE_ID = 'h5-device-id';
const CACHE_VERSION = 'h5-version';
const CACHE_CLOSE_TODAY_NOTICE = 'h5-close-today-notice';
const CACHE_CLOSE_TODAY_DIALOG = 'h5-close-today-dialog';

//手机短信验证码倒计时
const COUNT_DOWN_TIME = 60;

const PROXY_PREV = '/gl/report/station';

const PROXY_ADDRESS = '//pxdd';
// const PROXY_ADDRESS = 'mrball.com.cn';

const LOGD_APPID = 2;
const LOGD_APP_SECRET = '1bec4b2eaa13aa7d';


//电子游戏子类型-1全部，1电动老虎机，2经典老虎机，3刮刮乐，4棋牌游戏，5街机游戏

const DIGITAL_TYPE = [{
    title: '全部游戏',
    value: 0,
  },
  {
    title: '电动老虎机',
    value: 1,
  },
  {
    title: '经典老虎机',
    value: 2,
  },
  {
    title: '刮刮乐',
    value: 3,
  },
  {
    title: '棋牌游戏',
    value: 4,
  },
  {
    title: '街机游戏',
    value: 5,
  },
];

//银行id
// 1 招商银行
// 2 工商银行
// 3 建设银行
// 4 农业银行
// 5 中国银行
// 6 交通银行
// 7 广发银行
// 8 光大银行
// 9 浦发银行
// 10 民生银行
// 11 平安银行
// 12 兴业银行
// 13 中信银行
// 14 邮政银行
// 15 华夏银行

const BANK_ZHAOSHANG = 1;
const BANK_GONGSHANG = 2;
const BANK_JIANSHE = 3;
const BANK_NONGYE = 4;
const BANK_ZHONGGUO = 5;
const BANK_JIAOTONG = 6;
const BANK_GUANGFA = 7;
const BANK_GUANGDA = 8;
const BANK_PUFA = 9;
const BANK_MINSHENG = 10;
const BANK_PINGAN = 11;
const BANK_XINGYE = 12;
const BANK_ZHONGXIN = 13;
const BANK_YOUZHENG = 14;
const BANK_HUAXIA = 15;

const BANK_LIST = [{
    title: '招商银行',
    name: 'zhaoshang',
    value: BANK_ZHAOSHANG,
    pic: require('@/assets/banks/zhaoshang-small.png'),
  },
  {
    title: '工商银行',
    name: 'gongshang',
    value: BANK_GONGSHANG,
    pic: require('@/assets/banks/gongshang-small.png'),
  },
  {
    title: '建设银行',
    name: 'jianshe',
    value: BANK_JIANSHE,
    pic: require('@/assets/banks/jianshe-small.png'),
  },
  {
    title: '农业银行',
    name: 'nongye',
    value: BANK_NONGYE,
    pic: require('@/assets/banks/nongye-small.png'),
  },
  {
    title: '中国银行',
    name: 'zhongguo',
    value: BANK_ZHONGGUO,
    pic: require('@/assets/banks/zhongguo-small.png'),
  },
  {
    title: '交通银行',
    name: 'jiaotong',
    value: BANK_JIAOTONG,
    pic: require('@/assets/banks/jiaotong-small.png'),
  },
  {
    title: '广发银行',
    name: 'guangfa',
    value: BANK_GUANGFA,
    pic: require('@/assets/banks/guangfa-small.png'),
  },
  {
    title: '光大银行',
    name: 'guangda',
    value: BANK_GUANGDA,
    pic: require('@/assets/banks/guangda-small.png'),
  },
  {
    title: '浦发银行',
    name: 'pufa',
    value: BANK_PUFA,
    pic: require('@/assets/banks/pufa-small.png'),
  },
  {
    title: '民生银行',
    name: 'minsheng',
    value: BANK_MINSHENG,
    pic: require('@/assets/banks/minsheng-small.png'),
  },
  {
    title: '平安银行',
    name: 'pingan',
    value: BANK_PINGAN,
    pic: require('@/assets/banks/pingan-small.png'),
  },
  {
    title: '兴业银行',
    name: 'xingye',
    value: BANK_XINGYE,
    pic: require('@/assets/banks/xinye-small.png'),
  },
  {
    title: '中信银行',
    name: 'zhongxin',
    value: BANK_ZHONGXIN,
    pic: require('@/assets/banks/zhongxin-small.png'),
  },
  {
    title: '邮政银行',
    name: 'youzheng',
    value: BANK_YOUZHENG,
    pic: require('@/assets/banks/youzheng-small.png'),
  },
  {
    title: '华夏银行',
    name: 'huaxia',
    value: BANK_HUAXIA,
    pic: require('@/assets/banks/huaxia-small.png'),
  },
];

const NOTICE_CHARGE = 1;
const NOTICE_WITHDRAW = 2;
const NOTICE_UP_AMOUNT_SUCCESS = 11;
const NOTICE_TRANSFER_FAILED = 12;


//1存款，2提现，3转账，4红利，5返水，6提现退回，8上级转入，10 其他，加币13,14
//6人工加币，7人工减币，8上级转入，9佣金

const TRADE_TYPE = [{
    title: '全部',
    value: ALL,
  },
  {
    title: '充值',
    value: 1,
  },
  {
    title: '提现',
    value: 2,
  },
  {
    title: '转账',
    value: 3,
  },
  {
    title: '红利',
    value: 4,
  },
  {
    title: '返水',
    value: 5,
  },
  {
    title: '提现退回',
    value: 6,
  },
  {
    title: '上级转入',
    value: 8,
  },
  {
    title: '减币',
    value: 10,
  },
  {
    title: '加币',
    value: 13,
  },
  {
    title: '加币',
    value: 14,
  },
];

//-1全部，0处理中，1成功，2失败

const TRADE_STATUS_SUCCESS = 1;
const TRADE_STATUS_FAILURE = 2;
const TRADE_STATUS_PROCESSING = 0;

const TRADE_STATUS = [{
    title: '全部',
    value: ALL
  },
  {
    title: '成功',
    value: TRADE_STATUS_SUCCESS,
    label: 'check',
    type: 'primary',
  },
  {
    title: '失败',
    value: TRADE_STATUS_FAILURE,
    label: 'close',
    type: 'danger',
  },
  {
    title: '处理中',
    value: TRADE_STATUS_PROCESSING,
    label: 'processing',
    type: 'warning',
  },
];

//0未结算，1已结算，2已取消
const BET_STATUS = [{
    title: '未结算',
    value: 0,
    label: 'clock',
    type: 'fail',
  },
  {
    title: '已结算',
    value: 1,
    label: 'checked',
    type: 'success',
  },
  {
    title: '已取消',
    value: 2,
    label: 'clear',
    type: 'fail',
  },
  {
    title: '无效订单',
    value: 3,
    label: 'clear',
    type: 'fail',
  },
];
const TICKET_STATUS = [
  {
    title: '未开奖',
    value: 0,
    label: 'clock',
    type: 'fail',
  },
  {
    title: '已中奖',
    value: 1,
    label: 'checked',
    type: 'success',
  },
  {
    title: '未中奖',
    value: 2,
    label: 'clear',
    type: 'fail',
  },
  {
    title: '系统撤单',
    value: 3,
    label: 'clear',
    type: 'fail',
  },
  {
    title: '主动撤单',
    value: 4,
    label: 'clear',
    type: 'fail',
  },
  {
    title: '系统撤销',
    value: 5,
    label: 'clear',
    type: 'fail',
  },
];
const TODAY = 1;
const YESTERDAY = 2;
const THIS_WEEK = 3;
const LAST_WEEK = 4;
const THIS_MONTH = 5;
const LAST_MONTH = 6;

const TIME_PERIOD = [{
    title: '今天',
    value: TODAY,
    start: [0, 'day'],
    end: [0, 'day'],
  },
  {
    title: '昨天',
    value: YESTERDAY,
    start: [-1, 'day'],
    end: [-1, 'day'],
  },
  {
    title: '本周',
    value: THIS_WEEK,
    start: [0, 'week'],
    end: [0, 'week'],
  },
  {
    title: '上周',
    value: LAST_WEEK,
    start: [-1, 'week'],
    end: [-1, 'week'],
  },
  {
    title: '本月',
    value: THIS_MONTH,
    start: [0, 'month'],
    end: [0, 'day'],
  },
  {
    title: '上月',
    value: LAST_MONTH,
    start: [-1, 'month'],
    end: [-1, 'month'],
  },
];

//提现保护：0保护，1不保护，2资金锁定

const WITHDRAW_PROTECT_OPEN = 0;
const WITHDRAW_PROTECT_CLOSE = 1;


//验证码类别
//mobile_bind绑定手机，mobile_unbind解绑手机，card_del删除银行卡，set_pass修改密码，cash_security提现安全，login_security登录安全，cash提现
const CODE_LOGIN = 'mobile_login';
const CODE_MOBILE_BIND = 'mobile_bind';
const CODE_MOBILE_UNBIND = 'mobile_unbind';
const CODE_CARD_DEL = 'card_del';
const CODE_SET_PASS = 'set_pass';
const CODE_CASH_SECURITY = 'cash_security';
const CODE_LOGIN_SECURITY = 'login_security';
const CODE_CASH = 'cash';
const CODE_EMAIL_BIND = 'email_bind';
const CODE_EMAIL_UNBIND = 'email_unbind';

//安全定制
const SECURITY_WITHDARW = 0;
const SECURITY_LOGIN = 1;
const SECURITY_OPEN = 0;
const SECURITY_CLOSE = 1;

//全局菜单配置

const MENU_LIST = [{
    label: '贝博体育',
    name: 'sports',
    menu: {
      bg: 'white',
    },
    dropMenuName: 'sports'
  },
  {
    label: '真人娱乐',
    name: 'real',
    menu: {
      bg: 'white',
    },
    dropMenuName: 'reality'
  },
  {
    label: '彩票投注',
    name: 'ticket',
    menu: {
      bg: 'white',
    },
    dropMenuName: 'ticket'
  },
  {
    label: '优惠活动',
    name: 'activity',
    menu: {
      bg: 'white',
    },
    dropMenuName: 'activity'
  },
  {
    label: '捕鱼游戏',
    name: 'fish',
    menu: {
      bg: 'white',
    },
    dropMenuName: 'fish'
  },
  {
    label: '电子游戏',
    name: 'digital',
    menu: {
      bg: 'white',
    },
    dropMenuName: 'digital'
  },
];


//性别
const SEX = [{
    title: '男',
    value: 1,
  },
  {
    title: '女',
    value: 2,
  }
];


//游戏维护状态
const MAINTAIN_STATUS_OPEN = 0;
const MAINTAIN_STATUS_CLOSED = 1;
const MAINTAIN_STATUS_MAINTAINING = 2;

const MAINTAIN_STATUS = [{
    title: '正常',
    value: MAINTAIN_STATUS_OPEN,
  },
  {
    title: '关闭中',
    value: MAINTAIN_STATUS_CLOSED,
  },
  {
    title: '维护中',
    value: MAINTAIN_STATUS_MAINTAINING,
  }
];

//活动类型：-1全部，0真人活动,1体育活动，2彩票活动，3电子活动（老虎机），4街机游戏,，101返水活动

const ACTIVITY_TODAY = -1;

const ACTIVITY_REAL = 1;
const ACTIVITY_SPORT = 2;
const ACTIVITY_TICKET = 0;
const ACTIVITY_DIGITAL = 3;
const ACTIVITY_ARCAEDE = 101;
const ACTIVITY_OTHER = 102;

const ACTIVITY_TYPE = [{
    title: '真人优惠',
    value: ACTIVITY_REAL
  },
  {
    title: '体育优惠',
    value: ACTIVITY_SPORT
  },
  {
    title: '彩票优惠',
    value: ACTIVITY_TICKET
  },
  {
    title: '电子游戏优惠',
    value: ACTIVITY_DIGITAL
  },
  {
    title: '返水优惠',
    value: ACTIVITY_ARCAEDE
  },
  {
    title: '其他优惠',
    value: ACTIVITY_OTHER
  },
];

//活动未开始
const ACTIVITY_PENDING = 0;
//活动进行中
const ACTIVITY_PROCESSING = 1;
//活动已完成
const ACTIVITY_FINISH = 2;

//公告阅读
const ANNOUNCEMENT_UNREAD = 0;
const ANNOUNCEMENT_READ = 1;

//首页弹窗类型
const DIALOG_NORMAL = 0;
const DIALOG_BANK_CHANGE = 1;

//弹窗大小
const DIALOG_SIZE_NORMAL = '5.1rem';
const DIALOG_SIZE_MEDIUM = '6.25rem';
const DIALOG_SIZE_TRANSFER = '9rem';
const DIALOG_SIZE_LARGE = '10rem';

//1 首页-banner 2 真人落地页-banner 3 彩票落地页-banner 4 老虎机-落地页-banner 5 捕鱼落地页-banner 6 优惠活动落地页-banner 7 充值页优惠图
const AD_HOME = 1;
const AD_REAL = 2;
const AD_TICKET = 3;
const AD_DIGITAL = 4;
const AD_FISH = 5;
const AD_ACTIVITY = 6;
const AD_FINANCE = 7;


//=======================
//从后台转移来的常量

const DEVICE_TYPE = [{
    title: '全部',
    value: ALL
  },
  {
    title: 'PC',
    value: 1
  },
  {
    title: 'IOS',
    value: 2
  },
  {
    title: '安卓',
    value: 3
  },
  {
    title: 'H5',
    value: 4
  },
];

const PAYMENT_STATUS = [{
    title: '全部',
    value: ALL
  },
  {
    title: '支付成功',
    value: 1
  },
  {
    title: '支付失败',
    value: 2
  },
  {
    title: '支付中',
    value: 3
  },
];

const PAYEE_BANKS = [{
    title: '工商银行',
    value: 1
  },
  {
    title: '招生银行',
    value: 2
  },
  {
    title: '农业银行',
    value: 3
  },
  {
    title: '建设银行',
    value: 4
  },
  {
    title: '中国银行',
    value: 5
  },
  {
    title: '交通银行',
    value: 6
  },
  {
    title: '广发银行',
    value: 7
  },
  {
    title: '光大银行',
    value: 8
  },
  {
    title: '浦发银行',
    value: 9
  },
  {
    title: '民生银行',
    value: 10
  },
  {
    title: '平安银行',
    value: 11
  },
  {
    title: '兴业银行',
    value: 12
  },
  {
    title: '中信银行',
    value: 13
  },
  {
    title: '邮政银行',
    value: 14
  },
  {
    title: '华夏银行',
    value: 15
  },
  {
    title: '支付宝二维码',
    value: 16
  },
];

// 充值名称显示

const PAY_WANGYIN = 1; // 银联支付
const PAY_ZHIFUBAO = 2; // 支付宝支付
const PAY_WEIXIN = 3; // 微信支付
const PAY_CREDIT_CARD = 22; // 信用卡支付
const PAY_QUICK_PAY = 24; // 快捷支付
const PAY_SCAN_PAY = 12; // 扫码支付
const PAY_QQ_SCAN_PAY = 13; // QQ扫码支付
const PAY_UNION_SCAN_PAY = 5; // 银联扫码支付
const PAY_JD_SCAN_PAY = 15; // 京东扫码支付
const PAY_BANKCARD_ZHUANZ = 7; // 银行卡转账
const PAY_ZHIFUBAO_ZHUANZ = 8; // 支付宝转账
const PAY_WEIXIN_ZHUANZ = 9; // 微信转账

const PAYMENT_LIST = [{
    title: '银联支付',
    value: PAY_WANGYIN,
    pic: require('@/assets/payments/wangyin.png'),
  },
  {
    title: '支付宝支付',
    value: PAY_ZHIFUBAO,
    pic: require('@/assets/payments/alipay.png'),
  },
  {
    title: '微信支付',
    value: PAY_WEIXIN,
    pic: require('@/assets/payments/wechat.png'),
  },
  {
    title: '信用卡支付',
    value: PAY_CREDIT_CARD,
    pic: require('@/assets/payments/visa.png'),
  },
  {
    title: '快捷支付',
    value: PAY_QUICK_PAY,
    pic: require('@/assets/payments/kuaijie.png'),
  },
  {
    title: '扫码支付',
    value: PAY_SCAN_PAY,
    pic: require('@/assets/payments/scan.png'),
  },
  {
    title: 'QQ扫码支付',
    value: PAY_QQ_SCAN_PAY,
    pic: require('@/assets/payments/qqScan.png'),
  },
  {
    title: '银联扫码支付',
    value: PAY_UNION_SCAN_PAY,
    pic: require('@/assets/payments/bankscan.png'),
  },
  {
    title: '京东扫码支付',
    value: PAY_JD_SCAN_PAY,
    pic: require('@/assets/payments/jdscan.png'),
  },
  {
    title: '支付宝转账',
    value: PAY_ZHIFUBAO_ZHUANZ,
    pic: require('@/assets/payments/aliTransfer.png'),
  },
  {
    title: '银行卡转账',
    value: PAY_BANKCARD_ZHUANZ,
    pic: require('@/assets/payments/bankTrans.png'),
  },
  {
    title: '微信转账',
    value: PAY_WEIXIN_ZHUANZ,
    pic: require('@/assets/payments/wechatTrans.png'),
  },
];


const NOTICE_STATUS = [{
    title: '无',
    value: 0
  },
  {
    title: '全部',
    value: ALL
  },
  {
    title: '进行中',
    value: 1
  },
  {
    title: '已过期',
    value: 2
  },
];

const NOTICE_TYPE = [{
    title: '全部',
    value: ALL
  },
  {
    title: '常规消息',
    value: 1
  },
  {
    title: '换银行卡消息',
    value: 2
  },
];


//游戏 game id
const AG_REAL = 1;
const AG_FISH = 2;
//118体育
const GAME_SPORTS = 3;
//pt电子
const PT = 4;
//ebet真人
const EBET_REAL = 5;
//LB彩票
const TICKET = 8;
//棋牌开源
const POKER = 9;

//欢乐棋牌
const JOY_POKER = 10;

const CHANNEL_AG = 1;
const CHANNEL_EBET = 2;
const CHANNEL_PT = 4;
const CHANNEL_188 = 7;
const CHANNEL_TICKET = 8;
const CHANNEL_POKER = 10;

/**
 * 平台设定
 */
const PLATFORM_TYPE = [{
    title: 'AG真人',
    label: 'AG真人',
    channelId: CHANNEL_AG,
    value: AG_REAL,
  },
  {
    title: 'EBET真人',
    label: 'EBET真人',
    channelId: CHANNEL_EBET,
    value: EBET_REAL
  },
  {
    title: 'AG捕鱼',
    label: 'AG捕鱼',
    channelId: CHANNEL_AG,
    value: AG_FISH
  },
  {
    title: '贝博体育',
    label: '贝博体育',
    channelId: CHANNEL_188,
    value: GAME_SPORTS
  },
  {
    title: 'PT电子',
    label: 'PT电子',
    channelId: CHANNEL_PT,
    value: PT,
  },
  {
    title: 'LB彩票',
    label: 'LB彩票',
    channelId: CHANNEL_TICKET,
    value: TICKET,
  },
  {
    title: '欢乐棋牌',
    label: '欢乐棋牌',
    channelId: CHANNEL_POKER,
    value: JOY_POKER,
  },
];


// 游戏钱包

const GAME_BALANCES = [{
    label: 'AG',
    channelName: 'AG',
    channelId: 1,
    balance: 0,
  },
  {
    label: 'EBET',
    channelName: 'EBET',
    channelId: 2,
    balance: 0,
  },
  {
    label: 'PT',
    channelName: 'PT',
    channelId: 4,
    balance: 0,
  },
  {
    label: 'SPORTS',
    channelName: '贝博体育',
    channelId: 7,
    balance: 0,
  },
  {
    label: 'LB',
    channelName: 'LB彩票',
    channelId: CHANNEL_TICKET,
    balance: 0,
  },
  {
    label: 'HL',
    channelName: '欢乐棋牌',
    channelId: CHANNEL_POKER,
    balance: 0,
  },
];
// const GAME_BALANCES = [{
//     label: 'AG',
//     channelName: 'AG电子游戏',
//     channelId: 1,
//     balance: 0,
//     pic: require('@/assets/platforms/transfer-ag.png'),
//     decor: require('@/assets/platforms/transfer-ag-decor.png'),
//   },
//   {
//     label: 'EBET',
//     channelName: 'EBET真人',
//     channelId: 2,
//     balance: 0,
//     // pic: require('@/assets/platforms/transfer-eBet.png'),
//     // decor: require('@/assets/platforms/transfer-eBet-decor.png'),
//   },
//   {
//     label: 'PT',
//     channelName: 'PT电子游戏',
//     channelId: 4,
//     balance: 0,
//     // pic: require('@/assets/platforms/transfer-pt.png'),
//     // decor: require('@/assets/platforms/transfer-pt-decor.png'),
//   },
//   {
//     label: 'SPORTS',
//     channelName: '体育钱包',
//     channelId: 7,
//     balance: 0,
//     // pic: require('@/assets/platforms/transfer-sports.png'),
//     // decor: require('@/assets/platforms/transfer-sports-decor.png'),
//   },
//   {
//     label: 'LB',
//     channelName: 'LB彩票',
//     channelId: CHANNEL_TICKET,
//     balance: 0,
//     // pic: require('@/assets/platforms/transfer-sports.png'),
//     // decor: require('@/assets/platforms/transfer-sports-decor.png'),
//   },
//   {
//     label: 'Happy',
//     channelName: '欢乐棋牌',
//     channelId: CHANNEL_POKER,
//     balance: 0,
//     // pic: require('@/assets/platforms/transfer-sports.png'),
//     // decor: require('@/assets/platforms/transfer-sports-decor.png'),
//   },
// ];

const OFFER_ID = [{
  title: '返水活动',
  value: 1
}, ];

const WITHDRAW_AUDIT = -3; //风险待审核

const WITHDRAW_SUCCESS_PENDING = 6; // 申请强制成功中
const WITHDRAW_PROCESSING = 0; // 风险审核通过，待出款
const WITHDRAWN_RETURN_REQUEST = 3; // 申请退回
const WITHDRAWN_WAIT = 7; //待处理

const WITHDRAWN_SUCCESS = 1; // 已出款/提现成功
const WITHDRAWN_FORCE_SUCCESS = 8; //已经强制成功

const WITHDRAW_AUDIT_REJECT = -2; //风险审核拒绝
const WITHDRAW_REJECT = 5; //不处理，资金不退回
const WITHDRAW_RETURN = 4; //拒绝提现，资金已退回
const WITHDRAWN_FAILED = 2; // 拒绝出款/提现失败
const WITHDRAWN_FORCE_FAILURE = 9; //拒绝强制成功


//风控审核
const WITHDRAW_STATUS_AUDIT_ING = [
  WITHDRAW_AUDIT
];

//出款中
const WITHDRAW_STATUS_PAYMENT_OUT_ING = [
  WITHDRAW_SUCCESS_PENDING,
  WITHDRAW_PROCESSING,
  WITHDRAWN_WAIT,
  WITHDRAWN_RETURN_REQUEST,
];

//出款成功
const WITHDRAW_STATUS_SUCCESS = [
  WITHDRAWN_SUCCESS,
  WITHDRAWN_FORCE_SUCCESS,
];
//出款失败
const WITHDRAW_STATUS_FAILURE = [
  WITHDRAW_AUDIT_REJECT,
  WITHDRAW_REJECT,
  WITHDRAW_RETURN,
  WITHDRAWN_FAILED,
  WITHDRAWN_FORCE_FAILURE,
];

const WITHDRAW_EXCEPTION_STATUS = [{
    title: '全部',
    value: ALL
  },
  {
    title: '待处理',
    value: 1
  },
  {
    title: '已处理',
    value: 2
  },
  {
    title: '已拒绝',
    value: 3
  },
];

const OFFER_STATUS = [{
    title: '全部',
    value: ALL
  },
  {
    title: '进行中',
    value: 1
  },
  {
    title: '已过期',
    value: 2
  },
];

const AD_STATUS = [{
    title: '全部',
    value: ALL
  },
  {
    title: '进行中',
    value: 1
  },
  {
    title: '已过期',
    value: 2
  },
];

const REPORT_AGENCY_TYPE = [{
    title: '全部',
    value: ALL
  },
  {
    title: '下级会员',
    value: 1
  },
  {
    title: '下级代理',
    value: 2
  },
];

const PLAYER_MONEY_TYPE = [{
    title: '全部',
    value: ALL
  },
  {
    title: '充值额',
    value: 1
  },
  {
    title: '提现额',
    value: 2
  },
  {
    title: '充值手续费',
    value: 3
  },
  {
    title: '提现手续费',
    value: 4
  },
  {
    title: '人工加币',
    value: 5
  },
  {
    title: '人工减币',
    value: 6
  },
  {
    title: '红利',
    value: 7
  },
  {
    title: '返水额',
    value: 8
  },
];

const TRANSACTION_TYPE = [{
    title: '全部',
    value: ALL
  },
  {
    title: '转账',
    value: 1
  },
  {
    title: '红利',
    value: 2
  },
  {
    title: '存款',
    value: 3
  },
  {
    title: '提现',
    value: 4
  },
  {
    title: '返水',
    value: 5
  },
  {
    title: '资金调整',
    value: 6
  },
];

const TRANSFER_STATUS = [{
    title: '全部',
    value: ALL
  },
  {
    title: '转账成功',
    value: 1
  },
  {
    title: '转账失败',
    value: 2
  },
  {
    title: '转账中',
    value: 3
  },
];

const BANK_STATUS = [{
    title: '全部',
    value: ALL
  },
  {
    title: '使用中',
    value: 1
  },
  {
    title: '已删除',
    value: 2
  },
];

const SPECIAL_ENJOY_STATUS = [{
    title: '已专享',
    value: 1
  },
  {
    title: '已取消',
    value: 2
  },
];

const DIGITAL_GAME_TYPE = [{
    title: '电动老虎机',
    value: 1
  },
  {
    title: '经典老虎机',
    value: 2
  },
  {
    title: '刮刮乐',
    value: 3
  },
  {
    title: '棋牌游戏',
    value: 4
  },
  {
    title: '街机游戏',
    value: 5
  },
];

const COMMISSION_INVITE_STATUS = [{
    title: '全部',
    value: ALL
  },
  {
    title: '已达标',
    value: 1
  },
  {
    title: '未达标',
    value: 2
  },
];

//第三方体育常量
// #足球比赛状态 0:未开,1:上半场,2:中场,3:下半场,4,加时，-11:待定,-12:腰斩,-13:中断,-14:推迟,-1:完场，-10取消
const FOOTBALL_MATCH_STATUS = [{
    title: '比赛暂未开始',
    value: 0,
  },
  {
    title: '上半场',
    value: 1,
  },
  {
    title: '中场休息',
    value: 2,
  },
  {
    title: '下半场',
    value: 3,
  },
  {
    title: '比赛加时',
    value: 4,
  },
  {
    title: '点球决胜',
    value: 5,
  },
  {
    title: '比赛待定',
    value: -11,
  },
  {
    title: '比赛腰斩',
    value: -12,
  },
  {
    title: '比赛中断',
    value: -13,
  },
  {
    title: '比赛推迟',
    value: -14,
  },
  {
    title: '比赛完场',
    value: -1,
  },
  {
    title: '比赛取消',
    value: -10,
  },
];

// 篮球 0:未开赛，1:一节，2:二节，3:三节，4:四节，5:1'OT，6:2'OT，7:3'OT，-1:完场, -2:待定，-3:中断，-4:取消，-5:推迟，50中场
const BASKETBALL_MATCH_STATUS = [{
    title: '比赛暂未开始',
    value: 0,
  },
  {
    title: '第一节',
    value: 1,
  },
  {
    title: '第二节',
    value: 2,
  },
  {
    title: '第三节',
    value: 3,
  },
  {
    title: '第四节',
    value: 4,
  },
  {
    title: '加时-1',
    value: 5,
  },
  {
    title: '加时-2',
    value: 6,
  },
  {
    title: '加时-3',
    value: 7,
  },
  {
    title: '中场',
    value: 50,
  },
  {
    title: '比赛待定',
    value: -2,
  },
  {
    title: '比赛中断',
    value: -3,
  },
  {
    title: '比赛推迟',
    value: -5,
  },
  {
    title: '比赛完场',
    value: -1,
  },
  {
    title: '比赛取消',
    value: -4,
  },
];

const MATCH_PROCESSING = 3;
const MATCH_PENDING = 4;
const MATCH_END = 1;


// 3:直播中 4:直播未开始
const MATCH_TOTAL_STATUS = [{
    title: '直播中',
    value: MATCH_PROCESSING,
  },
  {
    title: '直播未开始',
    value: MATCH_PENDING,
  },
  {
    title: '直播结束',
    value: MATCH_END,
  },
];

const FOOTBALL = 1;
const BASKETBALL = 2;

const SPORTS_TYPE_LIST = [{
    title: '足球',
    value: FOOTBALL,
    icon: 'football',
    type: 'football',
  },
  {
    title: '篮球',
    value: BASKETBALL,
    icon: 'basketball',
    type: 'basketball'
  },
];

const SPORTS_TEC = [{
    title: '射门次数',
    value: 3
  },
  {
    title: '射正次数',
    value: 4
  },
  {
    title: '犯规次数',
    value: 5,
  },
  {
    title: '角球次数',
    value: 6,
  },
  {
    title: '任意球次数',
    value: 8,
  },
  {
    title: '越位次数',
    value: 9,
  },
  {
    title: '黄牌数',
    value: 11,
  },
  {
    title: '红牌数',
    value: 13,
  },
  {
    title: '控球时间',
    value: 14,
    type: 'percentage'
  },
  {
    title: '头球',
    value: 15,
  },
  {
    title: '救球',
    value: 16,
  },
  {
    title: '成功抢断',
    value: 19,
  },
  {
    title: '阻截',
    value: 20,
  },
  {
    title: '长传',
    value: 21,
  },
  {
    title: '短传',
    value: 22,
  },
  {
    title: '助攻',
    value: 23,
  },
  {
    title: '成功传中',
    value: 24,
  },
  {
    title: '射门不中',
    value: 34,
  },
  {
    title: '中柱',
    value: 35,
  },
  {
    title: '头球成功次数',
    value: 36,
  },
  {
    title: '射门被挡',
    value: 37,
  },
  {
    title: '铲球',
    value: 38,
  },
  {
    title: '过人次数',
    value: 39,
  },
  {
    title: '界外球',
    value: 40,
  },
  {
    title: '传球次数',
    value: 41,
  },
  {
    title: '传球成功率',
    value: 42,
    type: 'percentage'
  },
  {
    title: '进攻次数',
    value: 43,
  },
  {
    title: '危险进攻次数',
    value: 44,
  },
  {
    title: '半场角球',
    value: 45,
  },
  {
    title: '半场控球',
    value: 46,
  },
];



//活动领取状态
const ACTIVITY_STATUS_LIST = [{
    status: -1,
    value: '未达标'
  },
  {
    status: 0,
    value: '领取'
  },
  {
    status: 1,
    value: '已领取'
  },
  {
    status: 3,
    value: '进行中'
  },
  {
    status: 2,
    value: '已过期'
  },
];

//活动适用平台

const APPLY_PLATFORMLIST = [{
    id: 1,
    games: "AG真人"
  },
  {
    id: 2,
    games: "AG捕鱼"
  },
  {
    id: 3,
    games: "贝博体育"
  },
  {
    id: 4,
    games: "PT电子"
  },
  {
    id: 5,
    games: "EBET真人"
  },
  {
    id: 8,
    games: "双赢彩票"
  },
  {
    id: 9,
    games: "开元棋牌"
  },
];

// 进球
const FOOTBALL_EVENT_GOAL = 1;
// 红牌
const FOOTBALL_EVENT_RED_CARD = 2;
// 黄牌
const FOOTBALL_EVENT_YELLOW_CARD = 3;
// 点球
const FOOTBALL_EVENT_PENALTY_KICK = 7;
// 乌龙
const FOOTBALL_EVENT_OOLONG_BALL = 8;
// 两黄变红
const FOOTBALL_EVENT_CHANGE_RED = 9;
// 换人
const FOOTBALL_EVENT_CHANGE_MEMBER = 11;
// 射失点球
const FOOTBALL_EVENT_LOST_PENALTY_KICK = 13;

const FOOTBALL_EVENT_TYPE = [{
    title: '进球',
    value: FOOTBALL_EVENT_GOAL,
    icon: 'football-ball',
    className: 'is-goal',
  },
  {
    title: '红牌',
    value: FOOTBALL_EVENT_RED_CARD,
    icon: 'football-red-card',
    className: '',
  },
  {
    title: '黄牌',
    value: FOOTBALL_EVENT_YELLOW_CARD,
    icon: 'football-yellow-card',
    className: '',
  },
  {
    title: '点球',
    value: FOOTBALL_EVENT_PENALTY_KICK,
    icon: 'football-ball',
    className: 'is-penalty_kick',
  },
  {
    title: '乌龙',
    value: FOOTBALL_EVENT_OOLONG_BALL,
    icon: 'football-ball',
    className: 'is-oolong_ball',
  },
  {
    title: '两黄变红',
    value: FOOTBALL_EVENT_CHANGE_RED,
    icon: 'football-change-red',
    className: '',
  },
  {
    title: '换人',
    value: FOOTBALL_EVENT_CHANGE_MEMBER,
    icon: 'football-change',
    className: ''
  },
  {
    title: '射失点球',
    value: FOOTBALL_EVENT_LOST_PENALTY_KICK,
    icon: 'football-lost-penalty-kick',
    className: '',
  },
];


// 返水活动


const ACTIVITY_PLATFORM_INFO = '/gl/rebate/info';




//体育充值活动
const SPORT_RECHARGE_STATUS =[
  {
    value:"请完成首存活动",
    status:1,
  },
  {
    value:"未领取",
    status:2,
  },
  {
    value:"未达标",
    status:3,
  },
  {
    value:"进行中",
    status:4,
  },
  {
    value:"结算中",
    status:5,
  },
  {
    value:"已过期",
    status:6,
  },
  {
    value:"已领取",
    status:7,
  },
];




export default {
  SPORT_RECHARGE_STATUS,
  LOGD_APPID,
  LOGD_APP_SECRET,

  PROXY_ADDRESS,
  ALL,
  CACHE_USER_INFO,
  CACHE_TOKEN,
  CACHE_UID,
  CACHE_TELEPHONE,
  CACHE_USERNAME,
  CACHE_DEVICE_ID,
  CACHE_VERSION,
  CACHE_CLOSE_TODAY_NOTICE,
  CACHE_CLOSE_TODAY_DIALOG,
  CACHE_OS_TYPE,

  MENU_LIST,
  SEX,
  COUNT_DOWN_TIME,

  AG_REAL,
  AG_FISH,
  GAME_SPORTS,
  PT,
  EBET_REAL,
  TICKET,
  POKER,
  JOY_POKER,
  CHANNEL_POKER,

  CHANNEL_AG,
  CHANNEL_EBET,
  CHANNEL_PT,
  CHANNEL_188,
  CHANNEL_TICKET,

  DIGITAL_GAME_TYPE,
  DIGITAL_TYPE,

  CODE_LOGIN,
  CODE_MOBILE_BIND,
  CODE_MOBILE_UNBIND,
  CODE_CARD_DEL,
  CODE_SET_PASS,
  CODE_CASH_SECURITY,
  CODE_LOGIN_SECURITY,
  CODE_CASH,
  CODE_EMAIL_BIND,
  CODE_EMAIL_UNBIND,

  BANK_ZHAOSHANG,
  BANK_GONGSHANG,
  BANK_JIANSHE,
  BANK_NONGYE,
  BANK_ZHONGGUO,
  BANK_JIAOTONG,
  BANK_GUANGFA,
  BANK_GUANGDA,
  BANK_PUFA,
  BANK_MINSHENG,
  BANK_PINGAN,
  BANK_XINGYE,
  BANK_ZHONGXIN,
  BANK_YOUZHENG,
  BANK_HUAXIA,
  BANK_LIST,

  WITHDRAW_PROTECT_OPEN,
  WITHDRAW_PROTECT_CLOSE,

  SECURITY_WITHDARW,
  SECURITY_LOGIN,
  SECURITY_OPEN,
  SECURITY_CLOSE,

  TIME_PERIOD,

  TODAY,
  YESTERDAY,
  THIS_WEEK,
  LAST_WEEK,
  THIS_MONTH,
  LAST_MONTH,

  TRADE_STATUS_SUCCESS,
  TRADE_STATUS_FAILURE,
  TRADE_STATUS_PROCESSING,
  TRADE_STATUS,

  BET_STATUS,
  TICKET_STATUS,
  DEVICE_TYPE,
  NOTICE_CHARGE,
  NOTICE_UP_AMOUNT_SUCCESS,
  NOTICE_TRANSFER_FAILED,
  NOTICE_WITHDRAW,

  ACTIVITY_TODAY,
  ACTIVITY_REAL,
  ACTIVITY_SPORT,
  ACTIVITY_TICKET,
  ACTIVITY_DIGITAL,
  ACTIVITY_ARCAEDE,
  ACTIVITY_TYPE,

  ACTIVITY_PENDING,
  ACTIVITY_PROCESSING,
  ACTIVITY_FINISH,

  APPLY_PLATFORMLIST,
  ACTIVITY_STATUS_LIST,

  ANNOUNCEMENT_UNREAD,
  ANNOUNCEMENT_READ,

  DIALOG_NORMAL,
  DIALOG_SIZE_MEDIUM,
  DIALOG_SIZE_LARGE,
  DIALOG_SIZE_TRANSFER,

  DIALOG_BANK_CHANGE,

  AD_HOME,
  AD_REAL,
  AD_TICKET,
  AD_DIGITAL,
  AD_FISH,
  AD_ACTIVITY,
  AD_FINANCE,

  TRADE_TYPE,
  PAYMENT_STATUS,
  PAYEE_BANKS,
  NOTICE_STATUS,
  NOTICE_TYPE,
  PAYMENT_LIST,
  PAY_WANGYIN,
  PAY_ZHIFUBAO,
  PAY_WEIXIN,
  PAY_CREDIT_CARD,
  PAY_QUICK_PAY,
  PAY_SCAN_PAY,
  PAY_QQ_SCAN_PAY,
  PAY_UNION_SCAN_PAY,
  PAY_JD_SCAN_PAY,
  PAY_BANKCARD_ZHUANZ,
  PAY_ZHIFUBAO_ZHUANZ,
  PAY_WEIXIN_ZHUANZ,

  PLATFORM_TYPE,
  WITHDRAW_PROCESSING,
  WITHDRAW_AUDIT,
  WITHDRAW_AUDIT_REJECT,
  WITHDRAW_REJECT,
  WITHDRAW_RETURN,
  WITHDRAW_SUCCESS_PENDING,
  WITHDRAWN_SUCCESS,
  WITHDRAWN_FAILED,
  WITHDRAWN_RETURN_REQUEST,
  WITHDRAW_EXCEPTION_STATUS,

  WITHDRAW_STATUS_AUDIT_ING,
  WITHDRAW_STATUS_PAYMENT_OUT_ING,
  WITHDRAW_STATUS_SUCCESS,
  WITHDRAW_STATUS_FAILURE,

  PROXY_PREV,

  OFFER_ID,
  OFFER_STATUS,
  AD_STATUS,
  REPORT_AGENCY_TYPE,
  TRANSACTION_TYPE,
  PLAYER_MONEY_TYPE,
  TRANSFER_STATUS,
  BANK_STATUS,
  SPECIAL_ENJOY_STATUS,
  COMMISSION_INVITE_STATUS,
  GAME_BALANCES,
  MAINTAIN_STATUS,
  MAINTAIN_STATUS_OPEN,
  MAINTAIN_STATUS_CLOSED,
  MAINTAIN_STATUS_MAINTAINING,

  DIALOG_SIZE_NORMAL,

  FOOTBALL_MATCH_STATUS,
  BASKETBALL_MATCH_STATUS,
  MATCH_PROCESSING,
  MATCH_PENDING,
  MATCH_TOTAL_STATUS,
  SPORTS_TYPE_LIST,

  FOOTBALL,
  BASKETBALL,

  SPORTS_TEC,

  FOOTBALL_EVENT_GOAL,
  FOOTBALL_EVENT_RED_CARD,
  FOOTBALL_EVENT_YELLOW_CARD,
  FOOTBALL_EVENT_PENALTY_KICK,
  FOOTBALL_EVENT_OOLONG_BALL,
  FOOTBALL_EVENT_CHANGE_RED,
  FOOTBALL_EVENT_CHANGE_MEMBER,
  FOOTBALL_EVENT_LOST_PENALTY_KICK,
  FOOTBALL_EVENT_TYPE,






};
