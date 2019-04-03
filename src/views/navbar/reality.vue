<template>
  <div class="nav-sports">
    <div class="nav-sports-con">
      <div class="nav-sports-con__left">
        <div class="nav-left__title">真人娱乐</div>
        <div class="nav-left__proportion">返水高达</div>
        <div class="nav-left__num">1.0<span>%</span></div>
      </div>
      <div class="nav-sports-con__center">
        <div class="nav-center__img">
          <img src="./misc/10.png" alt="">
        </div>
        <div class="nav-center__content">
          <div class="nav-center-content__title">AG真人娱乐</div>
          <div class="nav-center-content__proportion">感受时时都精彩</div>
          <button type="button" class="nav-center-content__btn el-button el-button--primary el-button--medium" @click="goReal(1)"><span>立即游戏</span></button>
        </div>
      </div>
      <div class="nav-sports-con__center nav-sports-con__s">
        <div class="nav-center__img">
          <img src="./misc/15.png" alt="">
        </div>
        <div class="nav-center__content">
          <div class="nav-center-content__title">Ebet真人娱乐场</div>
          <div class="nav-center-content__proportion">美女如云多终端兼容</div>
          <button type="button" class="nav-center-content__btn el-button el-button--primary el-button--medium" @click="goReal(2)"><span>立即游戏</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "nav-sports",
    methods:{
      goReal(type){
        this.$router.push({
          path:'./real',
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
      .nav-sports-con__center{
        width: 511px;
        .nav-center__img{
          width: 182px;
          height: 151px;
          img{
            width: 100%;
          }
        }
      }
      .nav-sports-con__s{
        width: 462px;
        padding: 0 0 0 70px;
        box-sizing: border-box;
        overflow: hidden;
        border: none;
        border-left: 1px solid #F0F1F2;
      }
    }
  }
</style>

