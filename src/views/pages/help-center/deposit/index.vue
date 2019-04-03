<template>
    <div class="help-center-deposit">
        <div class="collapse-wrapper">
            <collapse-title>
                存款说明
            </collapse-title>
            <main-collapse-inner>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="1. 如何存款到我的账户？" name="1">
                        <div>我们提供12种存款方式：银联支付/支付宝支付/微信支付/信用卡支付/快捷支付/扫码支付/QQ扫码支付/银联扫码支付/京东扫码支付/支付宝转账/银行卡转账/微信转账/我们支持线上支付/手机支付等等。</div>
                    </van-collapse-item>
                    <van-collapse-item title="2.使用转账方式存款是否需要提供网银截图或者单据？" name="2">
                        <div>这不是强制性的，但是为了能够更快的核实您的存款，建议您可以提供相关截图或单据给我们。</div>
                    </van-collapse-item>
                    <van-collapse-item title="3.我还没有开通网银或者没有银行卡是否可以存款呢？" name="3">
                        <div>即使没有开通网银或者银行账户也可以使用转账存款方式进行存款。因为您可以通过“银行柜台”转账方式存款到 BallBet贝博 的银行账号。</div>
                    </van-collapse-item>
                    <van-collapse-item title="4.我可以使用多个银行账户进行存款吗？" name="4">
                        <div>对于存款使用的银行账户个数是没有限制的</div>
                    </van-collapse-item>
                    <van-collapse-item title="5.每天可以操作多少笔存款？" name="5">
                        <div>没有次数限制</div>
                    </van-collapse-item>
                    <van-collapse-item title="6.如何查看我的存款记录？" name="6">
                        <div>您只需要登陆 BallBet贝博 账号，进入【个人中心】-【资金明细】-【充值】即可查看您的存款交易记录。</div>
                    </van-collapse-item>
                    <van-collapse-item title="7.我转账金额与当时银行存款提示的金额不一致，我应该怎么做？" name="7">
                        <div>请您联系我们在线客服，同时需要提供您提供相关的存款信息。</div>
                    </van-collapse-item>

                </van-collapse>
            </main-collapse-inner>
        </div>
        <div class="collapse-wrapper">
            <collapse-title>
                提款说明
            </collapse-title>
            <main-collapse-inner>
                <van-collapse v-model="activeNames1">
                    <van-collapse-item title="1.如何提款到我的账户？" name="1">
                        <div>登陆帐号后点击右上角的“个人中心-提款”。如果未添加银行卡信息需要绑定银行卡，选择银行名称，输入开户姓名、开户账号、开户行。输入需要提款的金额，点击下方立即提款即可。</div>
                    </van-collapse-item>
                    <van-collapse-item title="2.提款须知？" name="2">
                        <div>提款银行账户姓名必须与您的 BallBet贝博 注册姓名一致。所有的交易都需严格遵循提款政策，如不符合提款的政策规则，提款将会被拒绝。</div>
                    </van-collapse-item>
                    <van-collapse-item title="3.最多可以有几个提款银行账户？" name="3">
                        <div>您最多可以使用3个银行账号，银行卡必须是跟您的姓名一致。</div>
                    </van-collapse-item>
                    <van-collapse-item title="4.如果我没有任何银行卡，是否可以通过国内银行汇款进行提款？" name="4">
                        <div>您需有自己姓名注册的银行卡，才可以使用国内银行汇款方式进行提款。</div>
                    </van-collapse-item>
                    <van-collapse-item title="5.如何查看我的提款记录？" name="5">
                        <div>您只需要登陆 BallBet贝博 账号，进入【个人中心】-【资金明细】-【提款】即可查看您的提款交易记录。</div>
                    </van-collapse-item>
                    <van-collapse-item title="6.每天可以操作多少笔提款？" name="6">
                        <div>只要上一笔交易已经处理完成（成功或者拒绝），每天不限提款次数。</div>
                    </van-collapse-item>
                    <van-collapse-item title="7.如果我的提款交易失败，我该怎么办？" name="7">
                        <div>请联系在线客服处理，并提供您的提款相关信息。</div>
                    </van-collapse-item>
                    <van-collapse-item title="8.我可以更改我的提款银行卡吗？" name="8">
                        <div>您只需要登录 BallBet贝博 账号，进入【个人中心】-【安全中心】-【绑定银行卡】页面即可对银行卡进行添加/删除操作。</div>
                    </van-collapse-item>
                    <van-collapse-item title="9.如果我不投注可以提款吗？" name="9">
                        <div>您所有的存款须进行全额投注后方可提款账户的所有余额。如有参与优惠活动，投注额要求请遵循特定的优惠规则与条款。</div>
                    </van-collapse-item>
                    <van-collapse-item title="10.每天最高提款金额是多少？" name="10">
                        <div>我们建议每次提现金额最高50000以内，每天提款次数及金额无上限。</div>
                    </van-collapse-item>
                    <van-collapse-item title="11.为什么提款状态显示“成功”而我的银行卡却没有收到钱？" name="11">
                        <div>请联系在线客服处理，并提供您的提款相关信息。</div>
                    </van-collapse-item>

                </van-collapse>
            </main-collapse-inner>
        </div>
        <div class="collapse-wrapper">
            <collapse-title>
                转账说明
            </collapse-title>
            <main-collapse-inner>
                <van-collapse v-model="activeNames2">
                    <van-collapse-item title="1.转账没有成功，但是钱却没了怎么办？" name="1">
                        <div>如转账掉单，请联系在线客服查询补单</div>
                    </van-collapse-item>
                    <van-collapse-item title="2.为什么游戏账户里有钱，去提不了款？" name="2">
                        <div>您需要先将资金从游戏平台转至中心账户后才能进行提款操作。</div>
                    </van-collapse-item>
                    <van-collapse-item title="3.中心账户有额度，为什么不能游戏“贝博体育”？" name="3">
                        <div>需要将“中心账户”额度进行转移到“贝博体育”后，才能进行下注</div>
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
      activeNames: ["1"],
      activeNames1: ["1"],
      activeNames2: ["1"],
    };
  }
};
</script>


<style lang="scss" scoped>
.help-center-deposit {
  .help-center-deposit__article {
    margin-bottom: 12px;
    .main-container-content__text {
      margin-bottom: 1px;
    }
  }
  .help-center-deposit__container {
    background: white;
    padding: 15px;
  }
  .collapse-wrapper {
    background: white;
      margin-bottom: 12px;
  }
}
</style>
