<template>
    <div class="help-center-problem">
        <div class="collapse-wrapper">
            <collapse-title>
                常见问题
            </collapse-title>
            <main-collapse-inner>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="1.体育投注的注单什么时候可以结算？" name="1">
                        <div>正常情况下，单场赛事投注会在赛事结束后15-30分钟内完成确认官方赛事赛果并返彩，一些赛事可能需要更长时间处理（比如腰斩，赛事中断等情况）。</div>
                    </van-collapse-item>
                    <van-collapse-item title="2.我的账户为什么会变成负数？" name="2">
                        <div>源于某些额度转移或某个赛事由于派彩错误，重新进行结算导致的，建议您联系在线客服咨询具体情况即可！</div>
                    </van-collapse-item>
                    <van-collapse-item title="3.为什么会出现重新派彩的情况？" name="3">
                        <div>网站最初公布的比分或结果需要修正时，将会出现赛果更改。出于结算的目的，赛事的结果将会在当天确定，除非在个别的体育或赛事规则有说明。</div>
                        <div>赛果均在赛事结束后判定，除非在个别体育规则里另有注明。赛果公布72小时后，若对任何赛果有争议，本公司将不认可。在赛果公布72小时内,除了任何体育纪律委员会所重新裁决之赛果，本公司只会修正人为、系统或参考赛果的相关网页失误等原因的错误。</div>
                    </van-collapse-item>
                    <van-collapse-item title="4.如果一场赛事中断或取消，注单是否会取消？" name="4">
                        <div>如果比赛或赛事取消，中断或延迟并且没有在官方指定开球时间的36小时内重新开始，所有该场赛事的投注即被视为无效且取消，除非在个别体育规则里另有指定注明。一些无条件决定的赛事将会根据这些赛事所注明的各自的体育规则进行结算。公司取消该赛事所有注单的结果被视为最终决定，无需参考官方赛事裁判或相关部门的决定。连串投注将会继续按照注单剩余赛事的赛果结算。被取消的赛事在结算公式中赔率按照1计算。</div>
                    </van-collapse-item>
                    <van-collapse-item title="5.网站的所有游戏都参与返水吗？" name="5">
                        <div>请在优惠活动页面查询相关的返水游戏项目</div>
                    </van-collapse-item>
                    <van-collapse-item title="6.为什么提示流水未完成，不能提款呢？" name="6">
                        <div>由于网站是多平台运营，需要数据传输更新的过程，正常注单结算后10分钟内更新完毕（特殊情况会延迟），在数据未更新的情况下进行提款操作也会提示流水未达到无法取款。建议您游戏完毕后，等待10分钟即可提款</div>
                    </van-collapse-item>
                    <van-collapse-item title="7.打开体育投注离开一会，回来之后下注直接提示：我们无法处理您的申请，请刷新网页再次尝试操作。这种情况是怎么回事？" name="7">
                        <div>出现这种提示是由于您登陆体育下注页面后长时间不刷新页面导致已经关闭盘口的赛事还在显示中、或者由于长时间不刷新页面自动退出登陆造成的，请刷新页面或者重新登陆账号进入体育即可。</div>
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
.help-center-problem {
  .help-center-problem__article {
    margin-bottom: 12px;
    .main-container-content__text {
      margin-bottom: 1px;
    }
  }
  .help-center-problem__container {
    background: white;
    padding: 15px;
  }
  .collapse-wrapper {
    background: white;
    margin-bottom: 12px;
  }

}
</style>
