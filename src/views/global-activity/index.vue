<template>
  <van-dialog v-model="isGlobalActivity" class="global-activity" close-on-click-overlay v-if='isGlobalActivity'>
    <div class="global-activity__content" v-if='globalActivityList'>
      <van-swipe indicator-color="#1E5ADC" :width='globalWidth' @change="onChange" class="global-activity__swiper">
        <van-swipe-item v-for='(item,index) in globalActivityList' :key="index">
          <div class="global-activity__title">{{item.name}}</div>
          <div class="global-activity-main" v-html='item.content'>
          </div>

        </van-swipe-item>
        <div class="global-activity__indicator" slot="indicator">
          <i v-for="(item,index) in globalActivityList" :key="index" :class="{'active':current===index}"></i>
        </div>
      </van-swipe>

    </div>
    <!-- <template v-if="currentActivity">
      <transition name="slide-fade" mode="out-in">
        <div class="global-activity__main">
          <div class="global-activity__inner" :key="index" v-if="currentActivity.dialogType === consts.DIALOG_BANK_CHANGE">

            <global-activity-bank-change :bank-info="currentActivity.content"></global-activity-bank-change>
          </div>
          <div class="global-activity__inner" v-html="currentActivity.content" :key="index" v-else>

          </div>
          <van-row type='flex' justify="space-between" class="global-activity__footer">
            <template v-if="globalActivityList.length > 1">
              <van-button type="info" size='medium' native-type="submit" class="global-activity__button" @click="next">下一条</van-button>
              <van-button type="primary" size='medium' native-type="submit" class="global-activity__button" @click="close()">查看全部</van-button>

            </template>
          </van-row>

        </div>

      </transition>

    </template> -->
  </van-dialog>
</template>

<script>
import GlobalActivityBankChange from "./global-activity-bank-change";
import { randomFillSync } from 'crypto';

export default {
  name: "global-activity",

  components: {
    GlobalActivityBankChange
  },
  data() {
    return {
      index: 0,
      current: 0,
      swiperWidth:
        document.documentElement.clientWidth -
        (document.documentElement.clientWidth * 0.2)
    };
  },

  methods: {
    onChange(index) {
      this.current = index;
    },

    close() {
      this.index = 0;
      this.$store.commit(types.CLOSE_GLOBAL_ACTIVITY);

      this.$router.push({ path: "/mc/mc" });
    }
  },

  computed: {
    globalWidth(){
        return this.swiperWidth;
    },
    isGlobalActivity: {
      get() {
        return this.$store.getters.isGlobalActivity;
      },
      set() {
        this.index = 0;
        this.$store.commit(types.CLOSE_GLOBAL_ACTIVITY);
      }
    },
    ...mapGetters(["globalActivityList"])
  }
};
</script>


<style lang="scss" scoped>
@include b(global-activity) {
  padding: 20px 5px;
  @include e(content) {
    width: 100%;
  }
  @include e(swiper) {
    width: 100%;
  }
  @include e(title) {
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-family: "PingFangSC-Medium";
    font-weight: 500;
    color: #4a4a4a;
  }

  @include e(indicator) {
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    i {
      width: 8px;
      height: 8px;
      border-radius: 100%;
      transition: opacity 0.2s;
      background-color: #ebedf0;
      display: inline-block;
      &:not(:last-child) {
        margin-right: 6px;
      }
      &.active {
        background-color: #1e5adc;
      }
    }
  }
  @include b(global-activity-main) {
    padding: 0 20px;
    margin-top: 20px;
    margin-bottom: 50px;
    height: 200px;
    overflow-y: auto;
  }
}
</style>
