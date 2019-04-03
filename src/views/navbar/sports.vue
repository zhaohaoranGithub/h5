<template>
  <div class="nav-sports">
    <div class="nav-sports-con">
      <div class="nav-sports-con__left">
        <div class="nav-left__title">贝博体育</div>
        <div class="nav-left__proportion">返水高达</div>
        <div class="nav-left__num">0.6<span>%</span></div>
      </div>
      <div class="nav-sports-con__center">
        <div class="nav-center__img">
          <img src="./misc/11.png" alt="">
        </div>
        <div class="nav-center__content">
          <div class="nav-center-content__title">贝博体育</div>
          <div class="nav-center-content__proportion_">我们每周提供上过5000+场比赛<br>和18000+个投注盘口</div>
          <button type="button" class="nav-center-content__btn el-button el-button--primary el-button--medium"
                  @click="$router.push({path:'./'});$router.push({path:'./sports',query:{_t:new Date().valueOf()}})"><span>立即游戏1</span></button>
        </div>
      </div>
      <div class="nav-sports-con__right">
        <div class="nav-right__img">
          <img src="./misc/14.png" alt="">
        </div>
        <div class="nav-right__content">
          <div class="nav-right-content__title">贝博体育APP下载</div>
          <div class="nav-right-content__proportion">更专业更便捷</div>
          <div class="nav-right-content__img">
            <!--<img src="./misc/12.png" alt="">-->
            <qriously class="nav-right-content__code" :value="getDownloadCode('sports')" :size="60" :backgroundAlpha="backgroundAlpha" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { qrCode } from "@/build";

  export default {
    name: "nav-sports",
    mixins:[qrCode],
    components: {

    },
    data() {
      return {

      };
    },

  };
</script>
<style lang="scss" scoped>
  @import './nav';
  .nav-sports{
    .nav-sports-con{
      padding: 0;
      .nav-sports-con__left,.nav-sports-con__right{
        height: 150px;
        margin-top: 30px;
      }
      .nav-sports-con__center{
        margin-top: 30px;
        .nav-center__img{
          transform: scale(1.2);
        }
        .nav-center__content{
          height: 150px;
        }
      }
      .nav-sports-con__right{
        .nav-right-content__img{
          padding: 3px;
          border-radius: 8px;
          background: white;
          box-shadow: 0 0.06rem 0.32rem 0 rgba(0, 0, 0, .1);
        }
      }
    }
  }
</style>

