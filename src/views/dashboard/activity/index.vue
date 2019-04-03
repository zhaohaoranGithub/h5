<template>
  <div class="active-center">
    <div class="active-center__main">
      <div @click='openUrl(activity.h5Url)' class="active-center-cell" v-for="activity in activityList" :key="activity.rid">
        <div class="active-center-cell__pic">
          <img alt="" v-lazy="activity.h5Image">
        </div>
        <div class="active-center-cell__bottom">
          <div class="active-center-cell__title">{{activity.name}}</div>
          <div class="active-center-cell__brief">适用于: {{activity.gameType|returnShowPlatform}}</div>
          <div class="active-center-button">
            <div class="active-center-button__time">
              {{activity.startTime|toTime('YYYY.MM.DD')}}-{{activity.endTime|toTime('YYYY.MM.DD')}}
            </div>
            <div class="active-center-button__btn" :class="`active-center-button__btn--${activity.status===1?'start':'no-start'}`">
              {{activity.status|statusValue}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { activityListApi as listApi } from "@/services/api/activity";

import { getCommand } from "@/build";
import { getLogin } from "@/utils/auth";
export default {
  name: "active-center",

  mixins: [getCommand],

  data() {
    return {
      activityList: [],
      cActType: consts.ALL
    };
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods:{
    openUrl(url) {
      if(this.isLogin) {
        const {device_id, os_type, token, version, uid} = getLogin();
        let str = `${url}?token=${encodeURIComponent(token)}&uid=${encodeURIComponent(uid)}&os_type=${encodeURIComponent(os_type||1)}&device_id=${encodeURIComponent(device_id)}&version=${encodeURIComponent(version)}`;
        window.open(str);
      } else {
        window.open(url);
      }
    }
  },
  mounted() {
    this.bindGet(listApi, "activityList", {
      sendingData: "cActType"
    });

    this.getAll({
      globalLoading: false
    });
  },
  filters: {
    returnShowPlatform(array) {
      let str = "";
      array = eval(array);
      if (_.size(array) === _.size(consts.APPLY_PLATFORMLIST)) {
        return "全平台通用";
      } else {
        _.forEach(consts.APPLY_PLATFORMLIST, value => {
          if (_.size(array) === _.size(consts.APPLY_PLATFORMLIST)) return;
          array.push("");
        });

        _.forEach(consts.APPLY_PLATFORMLIST, (item, keys) => {
          _.find(consts.APPLY_PLATFORMLIST, o => {
            if (o.id === array[keys]) {
              str += o.games + "/";
            }
          });
        });

        return str.substring(0, str.length - 1);
      }
    },
    statusValue(value) {
      if (!_.isEmpty(value)) return;
      if (value === 1) {
        return "进行中";
      } else {
        return "未开始";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@include b(active-center) {
  padding: 12px 0;
  background: #f5f5f5;
  @include e(main) {
    padding: 0 15px;

    @include b(active-center-cell) {
      min-height: 265px;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      margin-bottom: 12px;
      @include e(pic) {
        height: 160px;
        width: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      @include e(bottom) {
        padding: 16px;
      }

      @include e(title) {
        font-size: 18px;
        font-family: $--main-font-family;
        font-weight: 600;
        color: #333333;
      }

      @include e(brief) {
        font-size: 13px;
        font-family: $--main-font-family--Regular;
        font-weight: 400;
        color: #333333;
        margin-top: 10px;
      }

      @include b(active-center-button) {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include e(time) {
          font-size: 12px;
          font-family: $--main-font-family--Regular;
          font-weight: 400;
          color: #999999;
          margin-top: 5px;
        }
        @include e(btn) {
          width: 52px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 4px;
          font-size: 12px;
          color: white;
          font-family: $--main-font-family--Regular;
          font-weight: 400;
          @include m(start) {
            background: #1e5adc;
          }
          @include m(no-start) {
            background: #c5ccd6;
          }
        }
      }
    }
  }
}
</style>

