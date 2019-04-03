<template>
  <div class="nav-sports">
    <div class="nav-sports-con">
      <div class="nav-sports-con__left">
        <div class="nav-left__title">AG捕鱼王</div>
        <div class="nav-left__proportion">返水高达</div>
        <div class="nav-left__num">1.2<span>%</span></div>
      </div>
      <div class="nav-sports-con__center">
        <div class="nav-center__img">
          <img src="./misc/7.png" alt="">
        </div>
        <div class="nav-center__content">
          <div class="nav-center-content__title">AG捕鱼</div>
          <div class="nav-center-content__proportion_">开启神秘宝箱、触发梦幻<br>转盘的快感</div>
          <button type="button" class="nav-center-content__btn el-button el-button--primary el-button--medium" @click="goFish(1)"><span>立即游戏</span></button>
        </div>
      </div>
      <div class="nav-sports-con__right">
        <div class="nav-right__img">
          <img src="./misc/13.png" alt="">
        </div>
        <div class="nav-right__content">
          <div class="nav-right-content__title">贝博娱乐APP下载</div>
          <div class="nav-right-content__proportion">更专业更便捷</div>
          <div class="nav-right-content__img">
            <!-- <img src="./misc/12.png" alt=""> -->
            <qriously class="nav-right-content__code" :value="getDownloadCode('pc')" :size="60" :backgroundAlpha="backgroundAlpha" />
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
    methods: {
      goFish(type){
        this.$router.push({
          path:'./fish',
          query:{
            type:type,
            _t:new Date().valueOf()
          }
        })
      }
    }

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
          width: 182px;
          height: 151px;
          img{
            width: 100%;
          }
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

