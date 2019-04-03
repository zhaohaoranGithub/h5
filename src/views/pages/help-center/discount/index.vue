<template>
    <div class="help-center-browser">
        <div class="collapse-wrapper">
            <collapse-title>
                优惠规则说明
            </collapse-title>
            <main-collapse-inner>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="1. 如何申请优惠活动？" name="1">
                        <div>我们的优惠活动无需申请，完成优惠活动条件后，在<span class="red">【个人中心】-【我的活动】</span>处，手动领取即可。</div>
                    </van-collapse-item>
                    <van-collapse-item title="2.返水何时派发？" name="2">
                        <div>返水次日下午(北京时间15:00 pm)前系统自动派发，返水无需打流水即可提款</div>
                    </van-collapse-item>
                    <van-collapse-item title="3.实物优惠申请成功后一直没有收到礼品怎么办？" name="3">
                        <div>如果您的优惠申请成功后没有在指定时间收到礼品，请您可以随时联系在线客服</div>
                    </van-collapse-item>
                  
                </van-collapse>
              
            </main-collapse-inner>
        </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"]
    };
  }
};
</script>


<style lang="scss" scoped>
.help-center-browser {
  .help-center-browser__article {
    margin-bottom: 12px;
    .main-container-content__text {
      margin-bottom: 1px;
    }
  }
  .help-center-browser__container {
    background: white;
    padding: 15px;
  }
  .collapse-wrapper {
    background: white;
    margin-bottom: 12px;
  }
}
</style>
