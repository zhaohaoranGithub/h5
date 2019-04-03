<template>
  <div class="main">
    <div class="main__detail">
      <div class="main__detail-title">
        {{detailInfo.name}}
      </div>
      <div class="main__detail-brief">
        {{detailInfo.createTime | toDate}}
      </div>
      <div class="main__detail-content" v-html="detailInfo.content"></div>
    </div>
  </div>
</template>

<script>
  import {grid} from '@/build';
  import getCommand from '@/mixins/get-command';
  import {
    systemNoticeDetailApi as detailApi,
    systemNoticeReadApi as readApi,
  } from '@/services/api/notice';

  export default {
    name: "notice-details",
    mixins: [getCommand,grid],
    components: {},
    props: ['id'],
    data() {
      return {
        detailInfo: {
          id: this.id
        }
      }
    },
    // computed: {
    //   ...mapState({
    //     noticeList: state => state.notice.noticeList
    //   })
    // },
    methods: {
      close() {
        this.$emit('close');
      }
    },
    watch: {
      id: {
        handler(id) {
          if (id) {
            this.$nextTick(() => {
              this.detailInfo.id = id;
              this.getAll();
            });
          } else {
            this.close();
          }
        },
        immediate: true,
      }
    },
    mounted() {
      this.bindGet(detailApi, 'detailInfo', {
        sendingData: 'detailInfo',
        afterSuccess: () => {
          if (this.detailInfo.status === consts.ANNOUNCEMENT_UNREAD) {
            this.doSave({action: 'read'});
          }
        }
      });

      this.bindSave(readApi, 'read', 'detailInfo', {
        successMessage: '',
        afterSuccess: () => {
          this.$emit('read', this.id);
          this.$store.dispatch(types.GET_GLOBAL_ANNOUNCEMENT_UNREAD);
        }
      });

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
    @include e(detail) {
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0 15px 25px 12px rgba(235, 235, 235, 0.6);
      padding: 13px 16px;
      @include e(detail-title) {
        font-size: 20px;
        font-weight: bold;
      }
      @include e(detail-brief) {
        font-size: 12px;
        margin-top: 9px;
        margin-bottom: 14px;
      }
      @include e(detail-content) {

      }
    }
  }
</style>
