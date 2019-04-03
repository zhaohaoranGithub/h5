import {
  appSetLogin,
  isApp
} from "@/utils/auth";
import Raven from 'raven-js';

export default {
  data() {
    return {
      rewardList: {
        amount: 0,
        list: [],
        total: undefined,
      },
      isLogin: false,

    };
  },
  created() {
    this.isAppsLogin();
  },
  methods: {

    _returnStatusText(value,type) {
      for (let item of ( type === 'sport-recharge' ? consts.SPORT_RECHARGE_STATUS : consts.ACTIVITY_STATUS_LIST)) {
          if (item.status === value) return item.value;
      }
  },
  _showClient(array) {
      if (!array) return;
      let str = '';
      array = eval(array);
      if (_.size(array) === _.size(consts.APPLY_PLATFORMLIST)) {

          return '全平台通用';
      } else {
          _.forEach(consts.APPLY_PLATFORMLIST, (value) => {
              if (_.size(array) === _.size(consts.APPLY_PLATFORMLIST)) return;
              array.push('');
          });


          _.forEach(consts.APPLY_PLATFORMLIST, (item, keys) => {
              _.find(consts.APPLY_PLATFORMLIST, (o) => {
                  if (o.id === array[keys]) {
                      str += (o.games + ',');
                  }
              });
          });



          return str.substring(0, str.length - 1);
      }
  },


  isAppsLogin() {
    const {
      token
    } = this.$route.query;
    (token &&
      token !== "" &&
      token !== "null") ? this.isLogin = true: this.isLogin = false;


  },
    _receive(action = 'save') {
      this.doSave({
        action: action
      });
    }

  },
  watch: {
    '$route': {
      handler() {
        const {
          token,
          uid,
          os_type,
          device_id,
          version,
        } = this.$route.query;
        if (token) {
          this.isLogin = true;
        }
        if (token && uid && os_type && device_id && version) {

          this.$store.commit(types.SET_TOKEN,token);
          appSetLogin({
            token: decodeURIComponent(token || ''),
            uid: decodeURIComponent(uid),
            os_type: decodeURIComponent(os_type),
            device_id: decodeURIComponent(device_id),
            version: decodeURIComponent(version),
          });

        }


      },
      immediate: true,
    }
  }
};
