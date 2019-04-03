<template>
  <div class="main">
    <div class="main__header">
      <div class="main__header-ip">您当前的ip地址：{{registerIp}}</div>
      <div class="main__header-txt"><van-icon name="info-o" />温馨提示:反应时间越小,网站速度越快,越快的网址排在越上面</div>
    </div>
    <div class="main__list" v-for="(item, index) in serverList" :key="index">
      <span class="main__list-status">
      <van-icon name="checked" class="main__list-icon" size="18px" />
        {{
        item.className=='is-red'?
        '超时':
        Number(item.time/1000).toFixed(2)+'秒'
        }}
      </span>
      <span class="main__list-net">{{item.server}}</span>
      <div class="main__list-btn" v-if="index === 0">
        <a :href="item.server" target="_blank" class="url-link yr">推荐进入</a>
      </div>
      <div class="main__list-btn" v-else>
        <a :href="item.server" target="_blank" class="url-link">进入网站</a>
      </div>
    </div>
    <div class="main__contact">以上地址如无法访问,请联系客服,1分钟自动获取最新地址</div>
    <!--<van-button class="main__btn" size="large">添加到主屏幕</van-button>-->
  </div>
</template>

<script>
  import getCommand from '@/mixins/get-command';
  import {
    systemDomainList as getApi
  } from '@/services/api/user';
  export default {
    name: "select-line",
    mixins: [getCommand],
    components: {},
    data () {
      return {
        urlList: [],
        serverList: [],
        swiperOption: {
          loop: true,
          pagination: {
            el: '.swiper-pagination',

            clickable: true
          },
        },
      };
    },
    computed: {
      ...mapState({
        registerIp: state => state.user.registerIp
      })
    },
    methods: {
      getDomainList() {
        this.getAll();
      },
      urlConnectTest () {
        const servers = this.urlList;
        this.serverList = [];

        let contentCount = 0;
        _.each(servers, (serverInfo, index, list) => {
          const start = Date.now();
          serverInfo = (serverInfo.domain.indexOf('http://') > -1 || serverInfo.domain.indexOf('https://') > -1) ? serverInfo.domain : `http://${serverInfo.domain}`;
          $.ajax({
            url: `${serverInfo}/connect-test.json`,
            dataType: 'jsonp',
            jsonpCallback: 'abc',
            timeout: 2000,
          })
            .always(() => {
              const serverAddress = serverInfo;
              const timems = Math.floor((Date.now() - start));
              let className = '';
              if (timems > 200 && timems <= 700) {
                className = 'is-orange';
              } else if (timems > 700) {
                className = 'is-red';
              } else {
                className = 'is-green';
              }
              this.serverList.push({time: timems, server: serverAddress, className: className});
              if (++contentCount === list.length) {
                //  defer.resolve();
              }
            });
        });
      },
    },
    mounted() {
      this.bindGet(getApi, 'urlList', {
        afterSuccess: ([result, data]) => {
          if (result) {
            this.urlConnectTest();
          }
        }
      });
      this.getAll();
    }
  }
</script>
<style lang="scss" scoped>
  @include b(main) {
    min-height: 800px;
    color: #333333;
    font-size: 14px;
    background: #F5F6F7;
    padding: 13px 16px;
    @include e(header) {
      width: 100%;
      @include e(header-ip) {
        font-size: 16px;
      }
      @include e(header-txt) {
        color: #EA4739;
        font-size: 12px;
        line-height: 40px;
      }
    }
    @include e(list) {
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      background: #ffffff;
      border-radius: 8px;
      margin-bottom: 12px;
      @include e(list-icon){
        vertical-align: sub;
      }
      @include e(list-status) {
        color: #E5142E;
        font-size: 15px;
        margin-left: 15px;
      }
      @include e(list-net) {
        font-size: 12px;
        margin-left: 5px;
      }
      @include e(list-btn) {
        width: 71px;
        height: 32px;
        line-height: 32px;
        border-radius: 5px;
        background-color: $--color-primary;
        box-shadow: 0 4px 10px 0 rgba(30, 90, 220, 0.35);
        text-align: center;
        float: right;
        margin-top: 14px;
        margin-right: 19px;
        a {
          color: #ffffff;
        }
      }
    }
    @include e(contact) {
      color: #666666;
      font-size: 12px;
    }
    @include e(btn) {
      border-radius: 5px;
      background-color: $--color-primary;
      text-align: center;
      color: #ffffff;
      border: 1px solid $--color-primary;
      box-shadow: 0 4px 10px 0 rgba(30, 90, 220, 0.5);
      margin-top: 20px;
    }
  }
</style>
