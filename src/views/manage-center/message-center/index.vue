<template>
  <div class="main">
    <van-tabs @click="onClick" color="#2154D8" animated>
      <!--<van-tab title="平台公告">-->
      <van-tab>
        <div slot="title">
          平台公告
          <div class="main__icon" v-if="unReadNum.length>0">{{unReadNum.length}}</div>
        </div>
        <div class="main__content">
          <div v-if="tableSystemData.list.length>0">
            <div class="main__list" v-for='(item,index) in tableSystemData.list' :key="index"
                 @click="goTo('/mc/nd/'+item.id)">
              <div class="item1">
                <div class="item1-content">
                  <div class="item1-title">
                    <div class="item1-title-name">{{item.name}}</div>
                    <div class="item1-title-icon">
                      <i v-if="item.status === 0"></i>
                    </div>
                  </div>
                  <span>{{item.effectiveDate | toTime}}</span>
                </div>
                <div class="item1-txt">{{item.summary}}</div>
              </div>
              <div class="item2">
                <div class="item2-img"></div>
              </div>
            </div>
          </div>
          <div class="no-search-results" v-else>
            <div class="no-search-results-img"></div>
            <div class="no-search-results-txt">暂无更多数据</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="系统消息">
        <div class="main__content">
          <div v-if="tableUserData.list.length>0">
            <div class="main__list" v-for='(item,index) in tableUserData.list' :key="index">
              <div class="item3">
                <div class="item3-content">
                  <div class="item3-title">{{item.mainTitle}}</div>
                  <span>{{item.createTime | toTime}}</span>
                </div>
                <div class="item3-txt">{{item.title}}</div>
              </div>
            </div>
          </div>
          <div class="no-search-results" v-else>
            <div class="no-search-results-img"></div>
            <div class="no-search-results-txt">暂无更多数据</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import {grid} from '@/build';
  import getCommand from '@/mixins/get-command';
  // import NoticeCard from './notice-card';
  import {
    systemNoticeListApi as getSystemApi,
  } from '@/services/api/notice'; //平台公告
  import {
    userNoticeListApi as getUserApi,
  } from '@/services/api/notice';//系统消息
  import {readAllApi} from '@/services/api/notice';//全部已读
  export default {
    name: "message-center",
    mixins: [getCommand, grid],
    components: {
      // NoticeCard
    },
    data() {
      return {
        unReadNum: {},
        tableSystemData: {
          list: []
        },
        tableUserData: {
          list: []
        },
        filters: {
          size: 100,
          page: 1,
        },
        index: 0
      }
    },
    computed: {
      ...mapState({
        noticeList: state => state.notice.noticeList,
        rightFilterVisibility: state => state.rightFilterVisibility,
      })
    },
    methods: {
      onClick(index, title) {
        // this.$toast(title);
        if (index === 3) {
          index = 4
        }
        this.time = index + 1
      },
      goTo(routeName) {
        this.$router.push({path: routeName})
      },
      readSuccess() {
        this.getAll();
        this.$store.commit({
          type: types.RIGHT_FILTER_VISIBILITY,
          rightFilterVisibility: false,
        });
      },
    },
    watch: {
      noticeList(currentList, prevList) {
        if (currentList.length) {
          this.getAll();
        }
      },
      rightFilterVisibility: {
        handler() {
          if (this.rightFilterVisibility) {
            this.doSave({action: 'readAll'})
          }
        },
      }
    },
    mounted() {
      this.bindGet(getSystemApi, 'unReadNum', {
        action: 'getGrid',
        sendingData: 'filters',
        format: data => {
          const systemInfo = _.filter(data.list, {'status': 0});
          return systemInfo
        }
      });
      this.bindGet(getSystemApi, 'tableSystemData', {
        action: 'getGrid',
        sendingData: 'filters',
        afterSuccess: ([result, data]) => {
          if (this.id) {
            this.openDetail(_.find(data.list, {id: Number(this.id)}));
          }
        }
      });
      this.bindGet(getUserApi, 'tableUserData', {
        action: 'getGrid',
        sendingData: 'filters',
        format: (data) => {
          _.each(data.list, info => {
            if (info.type === consts.NOTICE_CHARGE) {
              info.mainTitle = '存款到账通知';
            } else {
              info.mainTitle = '提现到账通知';
            }
          });

          return data;
        }
      });
      this.bindSave(readAllApi, 'readAll', 'form', {
        // successMessage: '全部已读成功',
        successMessage: '',
        afterSuccess: () => {
          this.$store.dispatch(types.OAUTH);
          this.readSuccess();
        },
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
    /*padding: 13px 16px;*/
    @include e(icon) {
      display: inline-block;
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      font-size: 12px;
      border-radius: 50%;
      color: #ffffff;
      background: $--color-danger;
      margin-left: 5px;
    }
    @include e(content) {
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 1);
      /*box-shadow: 0 15px 25px 12px rgba(235, 235, 235, 0.6);*/
      box-shadow: 0 6px 10px 5px rgba(235, 235, 235, 0.6);
      overflow: hidden;
      margin: 13px 16px;
      .no-search-results {
        width: 225px;
        height: 200px;
        margin: 0 auto;
        padding-top: 30px;
        padding-bottom: 170px;
        .no-search-results-img {
          width: 225px;
          height: 150px;
          background: url("./../../../assets/nomsg/no-betting.png") no-repeat center/contain;
        }
        .no-search-results-txt {
          width: 100%;
          text-align: center;
          color: $--color-info;
          margin-top: 40px;
        }
      }
    }
    @include e(list) {
      width: 100%;
      height: 48px;
      display: flex;
      padding: 10px 0;
      line-height: 24px;
      font-size: 14px;
      border-bottom: 1px solid #ebedf0;
      .item1 {
        flex: 0 0 85%;
        padding-left: 15px;
        .item1-content {
          height: 25px;
          line-height: 25px;
          .item1-title {
            width: 150px;
            height: 25px;
            float: left;
            .item1-title-name {
              max-width: 130px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
            }
            .item1-title-icon {
              float: left;
              i {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: $--color-danger;
                margin-left: 5px;
              }
            }
          }
          span {
            font-size: 12px;
            color: #999999;
            float: right;
          }
        }
        .item1-txt {
          width: 250px;
          font-size: 12px;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .item2 {
        flex: 1;
        color: $--color-primary;
        .item2-img {
          width: 28px;
          height: 48px;
          background: url("../misc/right-arrow.png") no-repeat center/contain;
          float: right;
        }
      }
      .item3 {
        width: 100%;
        .item3-content {
          height: 25px;
          line-height: 25px;
          padding: 0 15px;
          .item3-title {
            width: 150px;
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span {
            font-size: 12px;
            color: #999999;
            float: right;
          }
        }
        .item3-txt {
          font-size: 12px;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 15px;
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
</style>
