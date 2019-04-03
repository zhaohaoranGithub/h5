<template>
    <div class="help-center-register">
        <div class="help-center-register__container">
            <div class="help-center-register__article">
                <main-container-content>
                    <div class="main-container-content__text">欢迎来到BallBet贝博娱乐，我们致力于通过精良的技术前卫的产品推动博彩业，成为亚洲博彩业的先驱，是我们的目标。 我们的每个功能点，通过大数据仔细研究和测试交互，每一张美术设计图都经过反复研磨，直到它们满足用户的第一个感知操作习惯和审观</div>
                    <div class="main-container-content__text">第一步：在网站右上方直接点击注册；</div>
                </main-container-content>
            </div>
            <div class="help-center-register__article">
                <main-container-title>
                    手机号码注册
                </main-container-title>
                <main-container-content>

                    <div class="main-container-content__text">第二步：按照提示填写资料；
                        <span class="red">手机号码注册-输入手机号码，并验证码手机号码。</span>
                    </div>
                    <div class="main-container-content__text">第三步：按照提示填写资；
                        <span class="red">设置登录密码。</span>
                    </div>
                    <div class="main-container-content__text">第四步：设置账户昵称</div>
                    <div class="main-container-content__text">第五步：注册成功</div>
                </main-container-content>
            </div>
            <div class="help-center-register__article">
                <main-container-title>
                    账户名注册
                </main-container-title>
                <main-container-content>
                    <div class="main-container-content__text">第二步：按照提示填写资料；
                        <span class="red">账户名注册-输入账户名和密码。</span>
                    </div>
                    <div class="main-container-content__text">第三步：设置账户昵称</div>
                    <div class="main-container-content__text">第四步：注册成功</div>
                </main-container-content>
            </div>
            <div class="help-center-register__article">
                <main-container-title>
                    备注
                </main-container-title>
                <main-container-content>
                    <div class="main-container-content__text">1. 请注意，注册时要求填写真实而准确的信息。</div>
                    <div class="main-container-content__text">2. 最重要的是，阁下使用网站务必先阅读规则与条款，承认您已年满18岁。</div>
                </main-container-content>
            </div>
        </div>
        <div class="collapse-wrapper">
            <collapse-title>
                账户相关问题
            </collapse-title>
            <main-collapse-inner>

                <van-collapse v-model="activeNames">
                    <van-collapse-item title="1.我能在BallBet贝博娱乐注册几个账户？" name="1">
                        <div>您仅允许注册一个账号, 任何时候都不能拥有超过一个账号。 如发现客户拥有多个户口，公司有权限制会员保留其中一个账 号，同时保留取消或关闭您账户的权利。</div>
                    </van-collapse-item>
                    <van-collapse-item title="2. 为什么当我使用密码登录时候出现错误？" name="2">
                        <div>请检查您输入的密码是否正确，密码最少是8位字符，区分大小写，若仍然无法登录，请使用“忘记密码”功能重设一个新密码。</div>
                    </van-collapse-item>
                    <van-collapse-item title="3. 我的个人资料安全吗？" name="3">
                        <div>我们坚持实行最好的安全措施，为广大客户提供舒适、安全的博彩环境。我们承诺保护个人信息是按照数据保护法进行，包括我们如何处理这些数据。所有服务都需要遵守法律及 BallBet贝博娱乐 的隐私标准。

                        </div>
                        <div>请参考隐私权保护规则页面查看更多信息。

                        </div>
                        <div>账户相关问题

                        </div>
                    </van-collapse-item>
                    <van-collapse-item title="4. 如果我要在除了贝博体育的其他游戏中进行游戏，还需要 从新注册账户吗？" name="4">
                        <div>不需要，一旦您的账号注册成功，可以在网站提供的所有产品中游戏。

                        </div>
                    </van-collapse-item>
                    <van-collapse-item title="5. 怎样查询账户的交易明细/投注记录？" name="5">
                        <div>您可以登录账号后进入“个人中心”-“资金明细”“投注记录”中查看。

                        </div>
                    </van-collapse-item>
                    <van-collapse-item title="6. 我的账户需要始终保持有余额吗？" name="6">
                        <div>不需要，您的账户不需要始终保留余额。

                        </div>
                    </van-collapse-item>
                    <van-collapse-item title="7. 如果我的账户长时间不使用会被取消吗？" name="7">
                        <div>不会关闭，您的账户若长时间没有登录会使用，不会被关闭。

                        </div>
                    </van-collapse-item>
                    <van-collapse-item title="8. 怎样才能注销账户？" name="8">
                        <div>我们不能注销会员账户，您可以联系在线客服进行账户冻结。

                        </div>
                    </van-collapse-item>
                    <van-collapse-item title="9. 我的个人资料是否能更改？" name="9">
                        <div>姓名/生日，填写不可以更改；</div>
                        <div>手机号码/电子邮箱，需要联系在线客服进行修改；</div>
                        <div>其他个人资料用户可以自行进行修改。</div>
                    </van-collapse-item>
                    <van-collapse-item title="10. 我的账户名忘记了怎么办？" name="10">
                        <div>可以联系在线客服帮您找回账户名。</div>
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
.help-center-register {
  .help-center-register__article {
    margin-bottom: 12px;
    .main-container-content__text {
      margin-bottom: 1px;
    }
  }
  .help-center-register__container {
    background: white;
    padding: 15px;
  }
  .collapse-wrapper {
    background: white;
      margin-bottom: 12px;
  }
}
</style>
