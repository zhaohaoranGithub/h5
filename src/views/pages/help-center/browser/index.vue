<template>
    <div class="help-center-discount">
        <div class="collapse-wrapper">
            <collapse-title>
                浏览器格式-PC
            </collapse-title>
            <main-collapse-inner>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="1. 选择什么样的浏览器才能获得BallBet贝博最佳的投注体验" name="1">
                        <div>IE11或以上的版本 / 谷歌Chrome / 火狐Firefox,如果您使用的是手持移动设备，我们强烈建议您通过手机自带浏览器进行访问,如果使用其他浏览器浏览过程中遇见任何问题，请联系我们的在线客服进行处理</div>
                    </van-collapse-item>
                    <van-collapse-item title="2.为什么使用版本较低的浏览器会导致投注体验下降，账户 不安全" name="2">
                        <div>首先，IE6或其他低版本浏览器效率极低，很多比较新颖和动画效果都无法实现加载，导致用户阅读和游戏时效果极差；</div>
                        <div>其次，低版本浏览器安全性较低，黑客很容易利用其进行病毒或木马植入，从而导致你的投注体验和资金受到极大威胁。</div>
                        <div>因此，我们强烈建议您将浏览器升级到最新版本，以此来获得BallBet贝博带来最好的游戏体验和优质服务。</div>
                    </van-collapse-item>
                    <van-collapse-item title="3.我是否需要任何程式或者浏览器插件来运行网站？" name="3">
                        <div>我们网站是不需要通过额外插件进行浏览。不过，一些互动的信息和帮助，例如我们的娱乐场和真人荷官可能需要Flash 播放器才能正常显示。点击这里安装Flash播放器 插件：浏览器插件是一个添加在浏览器中句有特定功能或服务的软件。一些常见的插件有Java、Flash播放器、Adobe Acrobat、QuickTime和Microsoft Silverlight。</div>
                    </van-collapse-item>
                    <van-collapse-item title="4.请问推荐的显示的分辨率是什么？" name="4">
                        <div>以下是推荐的屏幕分辨率：</div>
                        <div>电脑：1024*1440</div>
                        <div>平板电脑：不低于768 pixels</div>
                        <div>手机：375 pixels ~ 768 pixels</div>
                    </van-collapse-item>
                    <van-collapse-item title="5.我如何保护自己不被钓鱼？" name="5">
                        <div>1.请不要回复需要您提供个人信息或者是更改密码的邮件，钓鱼者通常以虚假的和耸人听闻的消息（如“紧急 - 您的帐户信息可能已经被盗”）为了从用户那里获得立即的反应。 BallBet贝博 不会要求客户的电子邮件密码或账户信息。即使你认为电子邮件可能是合法的，不回应-联系我们的客服进行验证或访问 BallBet贝博  网站，例如公告/通知等。</div>
                        <div>2.通过地址栏输入网址访问 BallBet贝博  。</div>
                        <div>如果你想访问一个属于 BallBet贝博  的网站，请在浏览器中直接输入相关的网址进入，不要通过电子邮件中的任何超链接登录。</div>
                        <div>钓鱼者经常在电子邮件使用链接直接使受害人进入虚假的网站，通常使用类似的网址去替换www.ballbet.com。点击时，在地址栏中显示的URL可能看起来像真的，但有几种方法可以伪造，带你去到冒牌的网站。如果你怀疑一封邮件是假的，请不要点击邮件中任何链接。呼叫客户服务验证。总是多次检查浏览器网址栏的地址是否是我们 BallBet贝博  的有效地址。</div>
                        <div>3.请定期的检查您的 BallBet贝博  帐号</div>
                        <div>请定期登录 BallBet贝博  帐户检查您的银行帐户余额。</div>
                        <div>如果您怀疑您的帐户已被未经授权的人访问，请立即更改您的密码，并立即通知我们的客户服务。检查您的交易和银行金额。如果有任何可疑交易或错误，立即通知我们。</div>
                        <div>4.检查您正在访问的网站是否安全</div>
                        <div>在您投注之前或者是在 BallBet贝博  网站做任何银行交易时，请确保您正在访问的网站是安全的服务器，它使用加密来保护您的个人数据和网上的交易。</div>
                        <div>在地址栏中查看网络地址。如果你访问的网站是安全的服务器，它应该以“https://”（“S”安全）而不是通常的“http://”。(SSL加密数据，仿劫持)</div>
                        <div>在浏览器的状态栏中查找一个锁图标。你可以通过在你的鼠标悬停在图标上来检查加密的级别。</div>
                        <div>请注意，该网站是使用加密的事实并不意味着该网站是合法的。它只会告诉你，数据是以加密的形式发送的。</div>
                        <div>5.经常报告可疑活动</div>
                        <div>如果你收到一封电子邮件，您怀疑是不是真正的或遇到任何欺诈网站假冒 BallBet贝博  网站，请立即通知我们的在线客服人员</div>
                    </van-collapse-item>

                </van-collapse>
            </main-collapse-inner>
        </div>
        <div class="collapse-wrapper">
            <collapse-title>
                浏览器格式-H5
            </collapse-title>
            <main-collapse-inner>
                <van-collapse v-model="activeNames1">
                    <van-collapse-item title="1. 如何使用手机访问网址？" name="1">
                        <div>确保您的手机是互联网启用。请与您的移动服务运营商进行检查。打开浏览器用您的手机访问xxx.xxxxxx.com。</div>
                        <div>登录您的BallBet贝博帐户和密码，选择你最喜欢的投注产品，在BallBet贝博移动享受超快速的投注！</div>
                    </van-collapse-item>
                    <van-collapse-item title="2.我怎么知道我的手机是否与BallBet贝博-H5兼容？" name="2">
                        <div>BallBet贝博-H5是兼容广泛的手机，我们正在不断努力，以确保更多的模型是完全支持。如果你在使用手机的时候遇到了问题，请与在线客服联系，这样我们就可以更深入地观察。</div>
                    </van-collapse-item>
                    <van-collapse-item title="3.我可以使用移动网站注册BallBet贝博的账户吗？" name="3">
                        <div>是的，你可以通过点击连接 BallBet贝博 网址 xxxx.xxxxxx.com 注册一个新帐户。</div>
                    </van-collapse-item>
                    <van-collapse-item title="4.在我下注的同时失去连接会发生什么？" name="4">
                        <div>您在下注的时候手机失去信号，下注的注单在失去信号之前如何没有确定，则投注不会成功，除非注单已经系统确定，才会投注成功。您可以在 BallBet贝博 里面的“投注记录”里面查看您所有的注单。</div>
                    </van-collapse-item>
                    <van-collapse-item title="5.我可以在国外旅游时候访问BallBet贝博-H5吗？" name="5">
                       <div>可以的，只要您的移动服务提供商允许支持国外网络漫游，你可以使用 BallBet贝博-H5。</div>
                    </van-collapse-item>
                    <van-collapse-item title="5.我能用我现有的用户名和密码登录BallBet贝博-H5吗？" name="6">
                       <div>是的，您可以使用您现有的用户名和密码登录到BallBet贝博-H5。</div>
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
    };
  }
};
</script>


<style lang="scss" scoped>
.help-center-discount {
  .help-center-discount__article {
    margin-bottom: 12px;
    .main-container-content__text {
      margin-bottom: 1px;
    }
  }
  .help-center-discount__container {
    background: white;
    padding: 15px;
  }
  .collapse-wrapper {
    background: white;
      margin-bottom: 12px;
  }
}
</style>
