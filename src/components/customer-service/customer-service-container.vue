<template>
  <span></span>
</template>

<script>

  let init = true;
  let LC_API = null;

  import {getLogin} from '@/utils/auth';

  export default {
    name: "customer-service-container",
    props:{},

    data() {
      return {
        platform: '贝博PC',

        license: '10274767',
        group: process.env.NODE_ENV === 'production' ? 2 : 3,
        chatBetweenGroups: false,

        onChatLoaded: _.noop,
        // onBeforeLoad: _.noop,
        onChatWindowOpened: _.noop,
        // onChatWindowMinimized: _.noop,
        onChatWindowHidden: _.noop,
        onChatStateChanged: _.noop,
        // onChatStarted: _.noop,
        // onChatEnded: _.noop,
        onMessage: _.noop,
        onTicketCreated: _.noop,
        onPrechatSurveySubmitted: _.noop,
        onPostchatSurveySubmitted: _.noop,
        onRatingSubmitted: _.noop,
        onRatingCommentSubmitted: _.noop,


        livechatChatStarted: false,
      };
    },
  //
  //   window.__lc.group = 3;
  // window.__lc.visitor = {name: '贝博pc polo', email: 'john@example.com'};
  // window.__lc.params = [
  //   { name: 'Login', value: 'joe_public' },
  //   { name: 'Account ID', value: 'ABCD1234' }
  // ];

    computed: {
      ...mapGetters([
        'username',
        'nickName',
        'userId',
        'isLogin'
      ]),
      ...mapState({
        route: state => state.route
      }),

      currentInfo() {
        return {
          username: this.username,
          nickName: this.nickName,
          userId: this.userId,
          isLogin: this.isLogin,
          routeName: this.route.name
        };
      },
    },

    watch: {
      currentInfo: {
        handler(info) {
          if (_.isEmpty(info) || !this.livechatChatStarted) {
            return;
          }

          this.updateCustomInfo(this.currentInfo);
        },
        deep: true,
        immediate: true
      }
    },

    methods:{
      open() {
        window.LC_API.open_chat_window();
        this.updateCustomInfo(this.currentInfo);
      },

      updateCustomInfo(info) {
        let customVariables = [
          {
            name: '访问端',
            value: this.platform
          },
          {
            name: '当前账户名',
            value: info.username
          },
          {
            name: '当前昵称',
            value: info.nickName
          },
          {
            name: '当前用户id',
            value: info.isLogin ? info.userId : ''
          },
          {
            name: '是否登录',
            value: info.isLogin ? '登录中' : '未登录'
          },
          {
            name: '当前页面地址',
            value: window.document.location.href
          }
        ];

        // console.log(customVariables);
        // LC_API.set_custom_variables && LC_API.set_custom_variables(customVariables);
        LC_API.update_custom_variables && LC_API.update_custom_variables(customVariables);
      },

      loadLiveChatApi() {
        if (!window.LC_API && init) {

          init = false;

          window.__lc = window.__lc || {};
          window.__lc.license = this.license;
          window.__lc.group = this.group;
          window.__lc.chat_between_groups = this.chatBetweenGroups;
          window.__lc.params = this.params;

          let userInfo = getLogin();
          if (userInfo.token) {
            window.__lc.visitor = {
              name: userInfo.username,
              email: ''
            };
          }
          const lc = document.createElement('script');
          lc.type = 'text/javascript';
          lc.async = true;
          lc.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
          const s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(lc, s);
          lc.addEventListener('load', this.chatLoaded.bind(this));
          lc.addEventListener('error', this.chatNotLoaded.bind(this));
        }
      },
      onBeforeLoad() {
        if (LC_API.visitor_engaged() === false && this.livechatChatStarted === false) {
          LC_API.hide_chat_window();
        }
      },

      onChatStarted() {
        this.livechatChatStarted = true;
      },

      onChatEnded() {
        this.livechatChatStarted = false;
      },

      onChatWindowMinimized() {
        if (!this.livechatChatStarted) {
          LC_API.hide_chat_window();
        }
      },

      onAfterLoad() {
      },

      chatLoaded() {
        if (window.LC_API) {
          this.setCallbacks.bind(this)();
          if (typeof this.onChatLoaded === 'function') {
            this.onChatLoaded(window.LC_API);
            LC_API = window.LC_API;
          }
        }
      },
      chatNotLoaded() {
        if (typeof this.onErrorLoading === 'function') {
          this.onErrorLoading();
        }
      },
      setCallbacks() {
        if (typeof this.onBeforeLoad === 'function')
          window.LC_API.on_before_load = this.onBeforeLoad.bind(this);

        if (typeof this.onAfterLoad === 'function')
          window.LC_API.on_after_load = this.onAfterLoad.bind(this);

        if (typeof this.onChatWindowOpened === 'function')
          window.LC_API.on_chat_window_opened = this.onChatWindowOpened.bind(this);

        if (typeof this.onChatWindowMinimized === 'function')
          window.LC_API.on_chat_window_minimized = this.onChatWindowMinimized.bind(this);

        if (typeof this.onChatWindowHidden === 'function')
          window.LC_API.on_chat_window_hidden = this.onChatWindowHidden.bind(this);

        if (typeof this.onChatStateChanged === 'function')
          window.LC_API.on_chat_state_changed = this.onChatStateChanged.bind(this);

        if (typeof this.onChatStarted === 'function')
          window.LC_API.on_chat_started = this.onChatStarted.bind(this);

        if (typeof this.onChatEnded === 'function')
          window.LC_API.on_chat_ended = this.onChatEnded.bind(this);

        if (typeof this.onMessage === 'function')
          window.LC_API.on_message = this.onMessage.bind(this);

        if (typeof this.onTicketCreated === 'function')
          window.LC_API.on_ticket_created = this.onTicketCreated.bind(this);

        if (typeof this.onPrechatSurveySubmitted === 'function')
          window.LC_API.on_prechat_survey_submitted = this.onPrechatSurveySubmitted.bind(this);

        if (typeof this.onRatingSubmitted === 'function')
          window.LC_API.on_rating_submitted = this.onRatingSubmitted.bind(this);

        if (typeof this.onRatingCommentSubmitted === 'function')
          window.LC_API.on_rating_comment_submitted = this.onRatingCommentSubmitted.bind(this);
      }
    },

    mounted() {
      this.loadLiveChatApi();

      this.$global.bus.$on('open', this.open);
    }
  };
</script>

<style lang="scss">
</style>
