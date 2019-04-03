<template>
  <van-nav-bar :title="navTitle" left-arrow @click-left='goBack' fixed>
    <template slot='left' v-if='navLogo'>
      <div class="logo"></div>
    </template>
    <template slot='right' v-if="showRightFilter">
      <div v-if="rightFilterStyle === 'download'" class="header-style-download" @click="goTo('/download')">
        下载APP
      </div>
      <div v-else-if="rightFilterStyle === 'text'" class="header-style-text" @click="rightFilterVisibility=true">
        {{rightFilterText}}
      </div>
      <div v-else-if="rightFilterStyle === 'screen'" class="header-style-screen" @click="rightFilterVisibility=true">
        筛选
      </div>
      <div v-else-if="rightFilterStyle === 'double'" class="header-style-double">
        <div class="double-download" @click="goTo('/download')">下载APP</div>
        <div class="double-img">
          <header-img v-if='isLogin'></header-img>
          <svg-icon icon-class="user" size='partial' type='black' @click.native='$router.push({name:"login"})' v-else></svg-icon>
        </div>
      </div>
      <template v-else>
        <header-img v-if='isLogin'></header-img>
        <svg-icon icon-class="user" size='partial' type='black' @click.native='$router.push({name:"login"})' v-else></svg-icon>
      </template>
    </template>
  </van-nav-bar>

</template>

<script>
import headerImg from "../header-img/index";

export default {
  name: "header-top",
  // mixins: [rightFilterVisibility],

  data() {
    return {
      activeIndex: "0",
      modalLogin: false,
      modalRegister: false,
      modalForgot: false,
      userSiderShow: false,
      noticeShow: false,
      paymentShow: false,
      active: true
    };
  },
  methods: {
    goTo(routeName) {
      this.$router.push({ path: routeName });
    },
    togglePaymentModal(key, flag) {
      this.$store.commit(types.CHANGE_ACTIVE_TAB, key);
      this.$store.commit(types.TOGGLE_CTRL, flag);
    },
    goBack() {
      if (this.navLogo) {
        this.$router.push("/");
        return;
      }
      if (this.backPath) {
        this.$router.push(this.backPath);
        return true;
      } else if (this.backEvent) {
        this.Bus.$emit(this.backEvent);
        return true;
      } else {
        this.$router.go(-1);
      }
    }
  },
  components: {
    headerImg
  },
  computed: {
    rightFilterVisibility: {
      get() {
        return this.active && this.$store.state.rightFilterVisibility;
      },
      set(val) {
        this.$store.commit({
          type: types.RIGHT_FILTER_VISIBILITY,
          rightFilterVisibility: val
        });
      }
    },
    ...mapState({
      financeVisible: state => state.balance.visible,
      user: state => state.user,
      isAuth: state => state.user.isAuth,

      navTitle: state => state.route.meta.title || "",
      navLogo: state => state.route.meta.logo,
      backPath: state => state.route.meta.backPath,
      showRightFilter: state => state.route.meta.showRightFilter,
      rightFilterStyle: state => state.route.meta.rightFilterStyle,
      rightFilterText: state => state.route.meta.rightFilterText
    }),
    ...mapGetters(["isLogin", "fBalance"])
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 150px;
  height: 30px;
  @include utils-bg(url("./../../../assets/logo.png") no-repeat left center, contain);
}

.header-style-download {
  width: 60px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 4px;
  background-color: $--color-primary;
  font-size: 12px;
  color: #ffffff;
}

.header-style-text {
  width: auto;
  text-align: center;
  font-size: 16px;
  color: $--color-primary;
}

.header-style-screen {
  width: 55px;
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  color: #999999;
  text-align: left;
  background: url("./../../../assets/screen.png") no-repeat right/contain;
}

.header-style-double {
  width: 95px;
  height: 28px;
  .double-download {
    width: 60px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 4px;
    background-color: $--color-primary;
    font-size: 12px;
    color: #ffffff;
    margin-top: 1px;
    /*display: inline-block;*/
    float: left;
  }
  .double-img {
    width: 28px;
    height: 28px;
    /*display: inline-block;*/
    float: right;
  }
}
</style>
