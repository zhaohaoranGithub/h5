<template>
    <div class="help-center-app">
        <div class="collapse-wrapper">
            <collapse-title>
               安卓/苹果手机APP
            </collapse-title>
            <main-collapse-inner>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="1. 什么是BallBet贝博手机APP？" name="1">
                        <div>手机APP可以下载并安装在任何兼容的安卓和苹果设备上。您可以在任何时候、任何地点投注您喜爱的娱乐场桌面游戏，娱乐场老虎机，快乐彩，时时彩和体育博彩，只要你的设备处于联机状态。现在使用将会更简易，更快捷，更有趣。</div>
                    </van-collapse-item>
                    <van-collapse-item title="2. 手机APP文件大小是多少？" name="2">
                        <div>APP文件大小，安卓系统为x.x MB和苹果系统为x.x MB。 我们建议您连接WiFi后在进行下载。</div>
                    </van-collapse-item>
                    <van-collapse-item title="3. 如何下载手机APP？" name="3">
                        <div>您可以直接从我们的网站扫码二维码进行下载</div>
                    </van-collapse-item>
                    <van-collapse-item title="4. 我可以通过手机APP注册账号吗？" name="4">
                       <div>您可以直接手机APP上面注册账号</div>
                    </van-collapse-item>
                    <van-collapse-item title="5. 使用手机APP时，支持哪些存款方式？" name="5">
                        <div>适用的存款方式将会根据您的账户和所在地区与 BallBet贝博 手机网页上的一致。</div>
                    </van-collapse-item>
                    <van-collapse-item title="6. 是否可以通过手机APP进行提款操作？" name="6">
                        <div>是的，您可以使用手机APP进行存款和取款操作</div>
                    </van-collapse-item>
                    <van-collapse-item title="7. 我怎么才知道我使用的手机是什么型号？" name="7">
                        <div>制造商和型号通常显示在电池下的手机外壳。</div>
                        <div>安卓，请到您的设备“设置”。</div>
                        <div>移动到列表的底部，然后选择“关于手机”或是“关于设备”。</div>
                        <div>苹果，请到设置/通用/关于本机。</div>
                        <div>查找“型号”。它将会告诉您，您使用的是什么型号的手机。</div>
                    </van-collapse-item>
                    <van-collapse-item title="8. 我可以使用现有的用户名和密码登录手机APP吗？" name="8">
                        <div>是的，您可以使用您现有的用户名和密码登录到手机APP。</div>
                    </van-collapse-item>
                    <van-collapse-item title="9. 如何清理手机APP的缓存数据？" name="9">
                        <div>1）点击“设置”菜单。</div>
                        <div>2）向下滚动，选择“程序管理”。</div>
                        <div>3）选择 William Asia APP。</div>
                        <div>4）选择“清除数据”和“清除缓存”。</div>
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
.help-center-app {
  .help-center-app__article {
    margin-bottom: 12px;
    .main-container-content__text {
      margin-bottom: 1px;
    }
  }
  .help-center-app__container {
    background: white;
    padding: 15px;
  }
  .collapse-wrapper {
    background: white;
      margin-bottom: 12px;
  }
}
</style>
