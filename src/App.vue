<template>
  <div class="app">
    <app-header v-if="header"></app-header>
    <red-packet ref="redPacket" @btnBack="btnBack"></red-packet>
    <redPacket-alert v-if="redPacketShow" :text="text" :cancleBtn="cancleBtn" :confirmBtn="confirmBtn" @cancleClick="cancleClick" @confirmClick="confirmClick" @closeReadPack="closeReadPack" @btnBack="btnBack"></redPacket-alert>
    <transition :mode="isOutIn ? 'out-in' : ''" name="slide-fade">
      <router-view></router-view>
    </transition>
    <app-footer v-if='!isLogin&&footer'></app-footer>
    <customer-service v-if="isLogin"></customer-service>
    <customer-service-container v-if="isLogin"></customer-service-container>
  </div>

</template>

<script>
  import * as ws from "@/consts/ws";
  import AppHeader from "@/views/app-header";
  import AppFooter from "@/views/app-footer";

  import customerService from '@/components/customer-service/index';
  import customerServiceContainer from '@/components/customer-service/customer-service-container.vue';
  import redPacketMin from "@/mixins/red-packet";
  import redPacket from "@/components/red-packet/index";
  import redPacketAlert from "@/components/red-packet/alert/index";
  import {getLogin,checkUrlIsNoNeedCheckLogin} from '@/utils/auth';

  export default {
    name: "app-entry",
    mixins: [redPacketMin],
    components: {
      AppHeader,
      AppFooter,
      customerService,
      customerServiceContainer,
      redPacket,
      redPacketAlert
    },

    data() {
      return {
        isOutIn: false
        // isGlobalLoading: !sessionStorage.getItem(anim.IS_FIRST_TIME),
        // isGlobalLoading: true,
      };
    },

    methods: {

    },

    watch: {
      header: {
        handler(header) {
          this.$nextTick(() => {
            this.isOutIn = header;
          });
        },

        immediate: true
      },
      isLogin(newValue, oldValue) {
        if(newValue && !oldValue) {
          this.examine();
        } else if (!newValue && oldValue){
          this.clearReadPack();
        }
      }
    },

    computed: {
      ...mapState({
        financeVisible: state => state.balance.visible,
        header: state => state.route.meta.header,
        footer: state => state.route.meta.footer,
        verticalMenu: state => state.route.meta.verticalMenu
      }),
      polyTransfer: {
        get() {
          return this.$store.state.global.polyTransfer;
        },
        set(value) {
          this.$store.commit(types.POLY_TRANSFER, value);
        }
      },
      ...mapGetters(["isLogin"])
    },

    mounted() {

      //检查登录，如果当前页面不是活动页，且不是其他供app调用页面（确保提供第三方的页面不会跳转登录页），且处于登陆状态，才检查用户登陆状态
      let href = window.location.href;
      let loginUser = getLogin()
      if (!checkUrlIsNoNeedCheckLogin() && loginUser.token) {
        this.$store.dispatch(types.CHECK_IS_SIGNIN);
      }

      //获取滚动信息
      this.$store.dispatch(types.GET_GLOBAL_ANNOUNCEMENT);

      //获取游戏状态
      this.$store.dispatch(types.GET_MAINTAIN_STATUS);

      //获取体育数据
      // this.$store.dispatch(types.GET_SPORTS);

      //获取奖池数据
      this.$store.commit("SOCKET_SUBSCRIBE", ws.PT_BONUS);

    }
  };
</script>

<style lang="scss" scoped>
  @include b(app) {
    width: 100%;
    margin: 0 auto;

    @include e(main) {
      padding: 0;
    }
    @include e(footer) {
      padding: 0;
    }
  }
</style>
