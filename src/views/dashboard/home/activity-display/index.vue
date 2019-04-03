<template>
  <div class="activity-display">
    <div class="activity-display__header">
      <div class="activity-display__title">
        优惠活动
      </div>
      <router-link tag="div" class="activity-display__button" :to="{name: 'activity'}">

      </router-link>
    </div>
    <div class="activity-display__main" v-if='Object.keys(activityList).length>0'>
      <div @click="openUrl(activityList.glActivityFirstRechargeResult.h5Url)"  class="activity-display-cell">
        <div class="activity-display-cell__pic activity-1"  />
        <!--<img class="activity-display-cell__pic" :src="activityList.glActivityFirstRechargeResult.h5Image" />-->
        <!-- <div class="activity-display-cell__decor"></div> -->
        <div class="activity-display-cell__main">
          <div class="activity-display-cell__title">{{activityList.glActivityFirstRechargeResult.name}}</div>
          <div class="activity-display-cell__brief">{{activityList.glActivityFirstRechargeResult.gameType|returnShowPlatform}}</div>
          <div class="activity-display-cell__footer">
            {{activityList.glActivityFirstRechargeResult.startTime|toTime('YYYY/MM/DD')}}-{{activityList.glActivityFirstRechargeResult.endTime|toTime('YYYY/MM/DD')}}
          </div>
        </div>

      </div>
      <div @click="openUrl(activityList.glActivityGameRebateResult.h5Url)"  class="activity-display-cell">
        <div class="activity-display-cell__pic activity-2"  />
        <!--<img class="activity-display-cell__&lt;!&ndash;&ndash;&gt;pic" :src="activityList.glActivityGameRebateResult.h5Image" />-->
        <div class="activity-display-cell__main">
          <div class="activity-display-cell__title">{{activityList.glActivityGameRebateResult.name}}</div>
          <div class="activity-display-cell__brief">{{activityList.glActivityGameRebateResult.gameType|returnShowPlatform}}</div>
          <div class="activity-display-cell__footer">
            {{activityList.glActivityGameRebateResult.startTime|toTime('YYYY/MM/DD')}}-{{activityList.glActivityGameRebateResult.endTime|toTime('YYYY/MM/DD')}}
          </div>
        </div>
      </div>

      <div @click="openUrl(activityList.glActivitySportGoResult.h5Url)" class="activity-display-cell">
        <div class="activity-display-cell__pic activity-3" />
        <!--<img class="activity-display-cell__pic" :src="activityList.glActivitySportGoResult.h5Image" />-->
        <div class="activity-display-cell__main">
          <div class="activity-display-cell__title">{{activityList.glActivitySportGoResult.name}}</div>
          <div class="activity-display-cell__brief">{{activityList.glActivitySportGoResult.gameType|returnShowPlatform}}</div>
          <div class="activity-display-cell__footer">
            {{activityList.glActivitySportGoResult.startTime|toTime('YYYY/MM/DD')}}-{{activityList.glActivitySportGoResult.endTime|toTime('YYYY/MM/DD')}}
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getLogin } from "@/utils/auth";
import { activityAllList } from "@/services/api/activity";
import { getCommand } from "@/build";
export default {
  name: "activity-display",
  mixins: [getCommand],
  data() {
    return {
      activityList: {}
    };
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
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
    this.bindGet(activityAllList, "activityList", {
      afterSuccess: ([result, data]) => {
        if (result) {
          this.activityList = data;
        }
      }
    });
    this.getAll();
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
    }
  }
};
</script>

<style lang="scss" scoped>
$--main-height: auto !default;

@include b(activity-display) {
  height: $--main-height;
  box-sizing: border-box;
  margin-bottom: 24px;

  @include e(header) {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  @include e(title) {
    font-size: 18px;
    font-weight: 500;
    font-family: "PingFangSC-Medium";
    color: #000000;
    flex: 1 0 0;
  }
  @include e(button) {
    position: relative;
    z-index: 2;
    width: 14px;
    height: 14px;
    @include utils-bg(url("./arrow.png") no-repeat, contain);
  }
}

@include b(activity-display-cell) {
  height: 93px;
  position: relative;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;

  @include e(pic) {
    height: 93px;
    flex: 0 0 158px;
    max-width: 158px;
    border-radius: $--border-radius-base;
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;

    &.activity-1{
      background: url(activity-1.png) no-repeat center;
      background-size: cover;
    }
    &.activity-2{
      background: url(activity-2.png) no-repeat center ;
      background-size: cover;
    }
    &.activity-3{
      background: url(activity-3.png) no-repeat center ;
      background-size: cover;
    }
  }
  @include e(main) {
    position: relative;
    height: auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding-left: 9px;
    min-width: calc(100% - 158px);
  }
  @include e(brief) {
    color: #999999;
    font-size: 13px;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
    width: 100%;
    margin-top: 6px;
    text-align: left;
  }
  @include e(title) {
    position: relative;
    font-size: 16px;
    color: #4a4a4a;
    font-weight: 500;
    z-index: 23;
    text-align: left;
    width: 100%;
  }
  @include e(footer) {
    font-size: 13px;
    color: #9b9b9b;
    width: 100%;
    font-weight: 400;
    text-align: left;
    margin-top: 8px;
  }
}
</style>
