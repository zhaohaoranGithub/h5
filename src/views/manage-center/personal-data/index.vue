<template>
  <div class="main">
    <div class="main__content">
      <div class="main__list">
        <div class="main__title">账户名</div>
        <div class="main__time">{{user.username}}</div>
      </div>
      <div class="main__list">
        <div class="main__title">注册日期</div>
        <div class="main__time">{{user.registerDate | toTime}}</div>
      </div>
    </div>
    <div class="main__item" v-if="user.parentId == 1" @click="goTo('/mc/ag')">
      <div class="item-title">我的代理</div>
      <div class="item-icon"><van-icon name="arrow" /></div>
    </div>
    <div class="main__txt">
      网页版暂不支持修改用户资料，可去贝博娱乐App或者PC端修改
    </div>
    <van-button class="main__btn" size="large" @click="goTo('/download')">下载APP</van-button>
  </div>
</template>

<script>
  import getCommand from '@/mixins/get-command';

  export default {
    name: "personal-data",
    mixins: [getCommand],
    components: {},
    data() {
      return {}
    },
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    methods: {
      goTo(routeName) {
        this.$router.push({path: routeName});
      },
    },
    watch: {},
    mounted() {}
  }
</script>
<style lang="scss" scoped>
  @include b(main) {
    min-height: 800px;
    color: #333333;
    font-size: 14px;
    background: #F5F6F7;
    padding: 13px 16px;
    @include e(content) {
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 1);
      /*box-shadow: 0 15px 25px 12px rgba(235, 235, 235, 0.6);*/
      box-shadow: 0 6px 10px 5px rgba(235, 235, 235, 0.6);
      overflow: hidden;
      @include e(list) {
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ebedf0;
        color: #999999;
        @include e(title){
          float: left;
          margin-left: 16px;
        }
        @include e(time){
          float: right;
          margin-right: 16px;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
    @include e(item) {
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0 6px 10px 5px rgba(235, 235, 235, 0.6);
      overflow: hidden;
      margin-top: 15px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .van-icon {
        font-size: 18px;
      }
    }
    @include e(txt) {
      color: #999999;
      font-size: 12px;
      margin-top: 18px;
      span {
        color: $--color-primary;
      }
    }
    @include e(btn) {
      border-radius: 5px;
      background-color: $--color-primary;
      text-align: center;
      color: #ffffff;
      border: 1px solid $--color-primary;
      box-shadow: 0 4px 10px 0 rgba(30, 90, 220, 0.5);
      margin-top: 20px;
    }
  }
</style>
