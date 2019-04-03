// 冲转提
const RECHARGE_LIST = '/gl/recharge/payment/list';
const RECHARGE_STATUS = '/gl/recharge/status';
const RECHARGE_NOW = '/gl/recharge/submit';
const RECHARGE_TRANSFER = '/gl/recharge/transfer';
const RECHARGE_CANCEL = '/gl/recharge/cancel';
const GAME_BALANCE = '/gl/transfer/info';
const CHANNEL_BALANCE = '/gl/balance/balance';
const GAME_TRANSFER = '/gl/transfer/submit';
const WITHDRAW_SUBMIT = '/gl/withdraw/submit';
const WITHDRAW_CONFIGS = '/gl/withdraw/config';
const WITHDRAW_INFO = '/gl/withdraw/info';
const WITHDRAW_STATUS = '/gl/withdraw/last/status';

const TRANSFER_SYNC = '/gl/transfer/submitsync';


// 用户中心
const USER_LOGIN_USERNAME = '/gl/login/username';
const USER_LOGIN_MOBILE = '/gl/login/mobile';
const GET_USER_LOGIN_MOBILE = '/gl/login/code';
const USER_LOGOUT = '/gl/login/logout';

const USER_REGISTER_MOBILE_GET = '/gl/register/code';
const USER_REGISTER_MOBILE_CHECK = '/gl/register/code/validate';
const USER_REGISTER_MOBILE = '/gl/register/mobile';

const USER_NICKNAME_CHECK = '/gl/user/exist/nickname';
const USER_NICKNAME = '/gl/user/update/nickName';

const USER_REGISTER = '/gl/register/username';

const SAVE_USER_DETAIL = '/gl/user/update';
const SAVE_AGENCY_URL = '/gl/user/bindingProxy';
const SAVE_USER_AVATAR = '/gl/user/update/avatar';
const USER_DETAIL = '/gl/user/detail';


//头像选择


//收货地址相关

const ADDRESS_ADD = '/gl/adress/add';
const ADDRESS_DEFAULT_SET = '/gl/adress/def';
const ADDRESS_DELETE = '/gl/adress/delete';
const ADDRESS_LIST = '/gl/adress/list';
const ADDRESS_PROVINCE_LIST = '/gl/adress/province/list';
const ADDRESS_AREA_LIST = '/gl/adress/area/list';
const ADDRESS_CITY_LIST = '/gl/adress/city/list';
const ADDRESS_UPDATE = '/gl/adress/update';



const USER_FORGET_CODE = '/gl/forget/code';
const USER_FORGET_INFO = '/gl/forget/info';
const USER_FORGET_RESET_PASSWORD = '/gl/forget/reset/password';
const USER_FORGET_VALIDATE = '/gl/forget/validate';

const USER_TRADE_LIST = '/gl/user/trade/list';
const USER_MOBILE_VALIDATE = '/gl/user/mobile/validate';
const USER_MOBILE_CODE = '/gl/user/mobile/code';
const USER_UPDATE_PASSWORD = '/gl/user/update/password';
const USER_EMAIL_CODE = '/gl/user/email/code';
const USER_EMAIL_VALIDATE = '/gl/user/email/validate';
const USER_LOGIN_SECURITY = '/gl/user/exist/username';
const SEND_MOBILE_LOGIN_CODE = '/gl/login/code';

const USER_SECURITY_INFO = '/gl/user/security/info';
const USER_SECURITY_UPDATE = '/gl/user/security/update';
const USER_SECURITY_LIMIT = '/gl/user/security/update/limit';
const USER_TRANSACTION_LIST = '/gl/balance/history';
const USER_HEART_BEAT = '/gl/login/heartbeat';

//银行卡相关
const USER_BANK_CARD_LIST = '/gl/userbankcard/list';
const USER_BANK_CARD_BIND = '/gl/userbankcard/bindcard';
const USER_BANK_CARD_UPDATE = '/gl/userbankcard/update';
const USER_BANK_CARD_DELETE = '/gl/userbankcard/delete';
const BANK_VALIDATE = '/gl/userbankcard/validate';

//游戏
const GAME_LIST = '/game/list';
const GAME_SUB_LIST = '/game/listSubGames';
const GAME_JUMP = '/game/jump';
const HISTORY_GAME_BET = '/gl/report/station/proxy/gameBetList';
const HISTORY_GAMEBET_COUNT = '/game/historyGameBetCount';
const GAME_BET_BY_CHANNEL = `${consts.PROXY_PREV}/proxy/gameBetByChannel`;

const GAME_LIST_PRIZE = '/game/list/prize';

//赛事接口
const HOT_GAME_LIST = '/gl/odds/list/hot';
const HOT_SPORTS_GAME_LIST = '/gl/odds/list/rec';

//公告
const SYSTEM_NOTICE_LIST = '/gl/system/notice/list';
const SYSTEM_NOTICE_READ = '/gl/system/notice/read';
const SYSTEM_NOTICE_COUNT = '/gl/system/notice/count';
const SYSTEM_NOTICE_ALL_READ = '/gl/system/notice/allread';
const SYSTEM_NOTICE_DETAIL = '/gl/system/notice/detail';

const USER_NOTICE_LIST = '/gl/user/notice/list';
const USER_NOTICE_NEW = '/gl/user/notice/list/new';

const ACTIVITY_LIST = '/gl/activity/list';

//首页弹窗
const GLOBAL_DIALOG_LIST = '/gl/user/dialog/list';

// 广告
const ADVERT_LIST = '/gl/advert/list';

//线路检测
const SYSTEM_DOMAIN_LIST = '/gl/system/domain/list';

//第三方体育接口
const SPORTS_PRE = `https://push.${consts.PROXY_ADDRESS}:9102/api`;

const SPORTS_TODAY = `${SPORTS_PRE}/zq/today.json`;
const SPORTS_TECHNIC = `${SPORTS_PRE}/zq/technic.json`;
const SPORTS_SCSG = `${SPORTS_PRE}/zq/scsg.json`;
const SPORTS_BASKETBALL_SCSG = `${SPORTS_PRE}/score/lq/schedule`;
const SPORTS_LINEUP = `${SPORTS_PRE}/score/zq/lineup`;
const SPORTS_INJURY = `${SPORTS_PRE}/score/zq/injury.json`;

//第三方体育接口转内部
const SPORTS_MATCH_LIST = '/gl/match/list';

//体育动画
const SPORTS_LIVE = `//${consts.PROXY_ADDRESS}/spscores/`;
// const SPORTS_LIVE = `//${consts.PROXY_ADDRESS}:${window.document.location.protocol === 'https:' ? '9100' : '9101'}/spscores/`;
//体育视频
const SPORTS_VIDEO = 'http://ht.bdxhj.com/api/api2.php';

//活动
//首页活动列表
const ALL_ACTIVITY_LIST = '/gl/activity/dashboard/activity';

//体育闯关活动
const ACTIVITY_SPORTS_INFO = '/gl/sport/go/info';
const ACTIVITY_SPORTS_AWARD = '/gl/sport/go/award';
const ACTIVITY_SPORTS_LIST = '/gl/sport/go/list';
//首充活动
const ACTIVITY_RECHARGE_AWARD = '/gl/first/recharge/award';
const ACTIVITY_RECHARGE_INFO = '/gl/first/recharge/info';
// 返水活动
const ACTIVITY_PLATFORM_INFO = '/gl/rebate/info';

/*真人连赢活动 */

//领取活动奖励
const ACTIVITY_WIN_AWARD = '/gl/real/win/award';
//查询活动信息
const ACTIVITY_WIN_INFO = '/gl/real/win/info';
//查询领奖记录
const ACTIVITY_WIN_LIST = '/gl/real/win/list';

/*老虎机救援活动 */

//领取活动奖励
const ACTIVITY_RESCUE_AWARD = '/gl/tiger/rescue/award';
//查询活动信息
const ACTIVITY_RESCUE_INFO = '/gl/tiger/rescue/info';
//查询领奖记录
const ACTIVITY_RESCUE_LIST = '/gl/tiger/rescue/list';

const LOGD = `//logd`;



//真人闯关活动
const ACTIVITY_REAL_OVERCOME_LIST = '/gl/game/real/overcome/info';

const ACTIVITY_REAL_OVERCOME_AWARD = '/gl/game/real/overcome/award';


//红包雨

const ACTIVITY_RED_PACKET_INFO = '/gl/bonus/info';
const ACTIVITY_RED_PACKET_RECEIVE = '/gl/bonus/receive';
const ACTIVITY_RED_PACKET_CONFIG = '/gl/bonus/config';

//体育充值活动
const ACTIVITY_SPORT_RECHARGE_RETURN_LIST = '/gl/sport/return/list';
const ACTIVITY_SPORT_RECHARGE_RETURN_INFO = '/gl/sport/return/info';
// 用户领取彩金
const ACTIVITY_SPORT_RECHARGE_GET_AWARD = "/gl/sport/return/award";

//砸金蛋活动
const ACTIVITY_GOLDEN_INFO = '/gl/activity/golden/info';
const ACTIVITY_GOLDEN_HISTORY_LIST = '/gl/activity/golden/history/list';
const ACTIVITY_GOLDEN_USER_HISTORY_LIST = '/gl/activity/golden/user/history/list';
const ACTIVITY_GOLDEN_GET_AWARD = '/gl/activity/golden/award';




export default {
  ACTIVITY_SPORT_RECHARGE_RETURN_LIST,
  ACTIVITY_SPORT_RECHARGE_RETURN_INFO,
  ACTIVITY_SPORT_RECHARGE_GET_AWARD,
  RECHARGE_LIST,
  RECHARGE_STATUS,
  RECHARGE_NOW,
  RECHARGE_TRANSFER,
  RECHARGE_CANCEL,
  GAME_BALANCE,
  GAME_TRANSFER,
  CHANNEL_BALANCE,
  SAVE_USER_DETAIL,
  SAVE_AGENCY_URL,
  SAVE_USER_AVATAR,
  USER_LOGIN_USERNAME,
  USER_LOGIN_MOBILE,
  WITHDRAW_STATUS,
  GET_USER_LOGIN_MOBILE,
  USER_LOGOUT,
  USER_DETAIL,
  TRANSFER_SYNC,
  GAME_BET_BY_CHANNEL,

  USER_FORGET_CODE,
  USER_FORGET_INFO,
  USER_FORGET_RESET_PASSWORD,
  USER_FORGET_VALIDATE,

  USER_REGISTER_MOBILE_GET,
  USER_REGISTER_MOBILE_CHECK,
  USER_REGISTER_MOBILE,
  USER_NICKNAME_CHECK,
  USER_NICKNAME,

  USER_REGISTER,
  USER_TRADE_LIST,
  USER_MOBILE_VALIDATE,
  USER_MOBILE_CODE,
  SEND_MOBILE_LOGIN_CODE,
  USER_UPDATE_PASSWORD,
  USER_EMAIL_CODE,
  USER_EMAIL_VALIDATE,
  USER_LOGIN_SECURITY,
  USER_BANK_CARD_LIST,
  USER_BANK_CARD_BIND,
  USER_BANK_CARD_UPDATE,
  USER_SECURITY_INFO,
  USER_SECURITY_UPDATE,
  USER_BANK_CARD_DELETE,
  USER_SECURITY_LIMIT,
  USER_TRANSACTION_LIST,
  USER_HEART_BEAT,
  ACTIVITY_LIST,
  BANK_VALIDATE,
  GLOBAL_DIALOG_LIST,

  ADDRESS_ADD,
  ADDRESS_CITY_LIST,
  ADDRESS_DEFAULT_SET,
  ADDRESS_DELETE,
  ADDRESS_LIST,
  ADDRESS_PROVINCE_LIST,
  ADDRESS_AREA_LIST,
  ADDRESS_UPDATE,

  HOT_GAME_LIST,
  HOT_SPORTS_GAME_LIST,

  GAME_LIST,
  GAME_SUB_LIST,
  GAME_JUMP,
  WITHDRAW_CONFIGS,
  WITHDRAW_INFO,
  WITHDRAW_SUBMIT,
  HISTORY_GAME_BET,
  HISTORY_GAMEBET_COUNT,
  GAME_LIST_PRIZE,

  SYSTEM_NOTICE_LIST,
  SYSTEM_NOTICE_DETAIL,
  SYSTEM_NOTICE_READ,
  SYSTEM_NOTICE_COUNT,
  SYSTEM_NOTICE_ALL_READ,

  USER_NOTICE_LIST,
  USER_NOTICE_NEW,
  ADVERT_LIST,

  SYSTEM_DOMAIN_LIST,
  SPORTS_VIDEO,
  SPORTS_PRE,
  SPORTS_LIVE,
  SPORTS_TODAY,
  SPORTS_TECHNIC,
  SPORTS_SCSG,
  SPORTS_BASKETBALL_SCSG,
  SPORTS_LINEUP,
  SPORTS_INJURY,
  SPORTS_MATCH_LIST,


  LOGD,



  ACTIVITY_SPORTS_INFO,
  ACTIVITY_SPORTS_AWARD,
  ACTIVITY_SPORTS_LIST,

  ACTIVITY_RECHARGE_AWARD,
  ACTIVITY_RECHARGE_INFO,

  ACTIVITY_WIN_AWARD,
  ACTIVITY_WIN_INFO,
  ACTIVITY_WIN_LIST,

  ACTIVITY_RESCUE_AWARD,
  ACTIVITY_RESCUE_INFO,
  ACTIVITY_RESCUE_LIST,


  ACTIVITY_PLATFORM_INFO,

  ALL_ACTIVITY_LIST,

  ACTIVITY_REAL_OVERCOME_LIST,
  ACTIVITY_REAL_OVERCOME_AWARD,

  ACTIVITY_RED_PACKET_INFO,
  ACTIVITY_RED_PACKET_RECEIVE,
  ACTIVITY_RED_PACKET_CONFIG,

  ACTIVITY_GOLDEN_INFO,
  ACTIVITY_GOLDEN_HISTORY_LIST,
  ACTIVITY_GOLDEN_USER_HISTORY_LIST,
  ACTIVITY_GOLDEN_GET_AWARD,
};
