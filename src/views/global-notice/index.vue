<template>
  <transition name="slide-fade">
    <div class="global-notice" v-if="isNotice">
      <div class="global-notice__header">
        <div class="global-notice__title">
          系统消息提示
        </div>
        <close-button @click.native="close" class="global-notice__close"></close-button>
      </div>
      <div class="global-notice__main">
        <div class="global-notice__main-title">
          {{currentNotice.mainTitle}}({{index + 1}}/{{noticeList.length}})：
        </div>
        <div class="global-notice__content">
          {{currentNotice.title}}
        </div>
      </div>
      <div class="global-notice__footer">
        <div class="global-notice__footer-left">
          <template>
            <el-button type="outline-info" size="small" @click="prev" :disabled="noticeList.length <= 1">上一条</el-button>
            <el-button type="outline-info" size="small" @click="next" :disabled="noticeList.length <= 1">下一条</el-button>
          </template>
        </div>
        <div class="global-notice__footer-right" @click="notNotifyToday">
          今日不再提示
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    name: 'global-notice',
    data() {

      return {
        index: 0,
      };
    },

    methods: {
      close() {
        this.index = 0;
        this.$store.commit(types.CLEAR_NOTICE);
      },
      prev() {
        if (this.index <= 0) {
          this.index = this.noticeList.length - 1;
        } else {
          --this.index;
        }
      },
      next() {
        if (this.index >= this.noticeList.length - 1) {
          this.index = 0;
        } else {
          ++this.index;
        }
      },
      notNotifyToday() {
        this.$store.commit(types.CLOSE_TODAY_NOTICE);
      },
    },

    computed: {
      ...mapGetters([
        'noticeList',
        'isNotice',
      ]),

      currentNotice() {
        return this.noticeList[this.index];
      },
    },
  };
</script>

<style lang="scss" scoped>
  $--padding-x: 26px;
  $--color: #2c2c2c;

  $--width: 340px !default;

  @include b(global-notice) {
    width: $--width;
    height: 220px;
    display: flex;
    position: fixed;
    right: 2%;
    bottom: 2%;
    z-index: 100;
    background: $--color-white;
    flex-direction: column;
    color: $--color;
    z-index: 4000;

    box-shadow:0px 6px 30px 0px rgba(0,0,0,0.18);
    border-radius: $--border-radius-small;

    @include e(header) {
      display: flex;
      margin: 0 $--padding-x;
      padding: 11px 0;
      justify-content: center;
      border-bottom: 1px solid $--border-color-base;
    }
    @include e(close) {
      position: absolute;
      right: -20px;
      top: -20px;
    }

    @include e(main) {
      padding: 13px $--padding-x 0;
      flex: 1 0 0;

      font-size: $--font-size-small;
      line-height: 18px;
      color: $--color;
    }
    @include e(main-title) {
      margin-bottom: 20px;
    }

    @include e(footer) {
      padding-bottom: 8px;
      margin: 0 auto;
      width: 220px;
    }

    @include e(footer-left) {
      display: flex;
      margin-bottom: 10px;
      .el-button {
        flex: 1 0 0;
        min-width: 100px;
        font-weight: normal;
        height: 36px;
      }
    }
    @include e(footer-right) {
      text-align: right;

      cursor: pointer;
    }
  }

</style>