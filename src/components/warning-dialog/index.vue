<template>
  <div class="main-warning">
    <template v-if="type!==''">
      <img src="./filed.png" alt="" class="main-warning__pic" width="120" height="120" v-if='type==="error"'>
      <img src="./warn.png" alt="" class="main-warning__pic" width="120" height="120" v-if='type==="warn"'>
    </template>
    <div class="main-warning__title" v-if='$slots.title'>
      <slot name="title">

      </slot>
    </div>
    <div class="main-warning__brief" v-if='$slots.brief'>

      <slot name='brief'>

      </slot>
    </div>

    <div class="main-warning__content" v-if='$slots.content'>

      <slot name='content'>

      </slot>
    </div>

    <div class="main-warning__button" v-if="showFooter">
      <slot name='button'></slot>
    </div>
    <div class="main-warning__footer" v-if="!showFooter">
      <slot name='footer'></slot>
    </div>

  </div>
</template>


<script>
  export default {
    name: "warning-dialog",
    props: {
      type: {
        type: String,
        default: 'error',
      },
      showFooter: {
        type: Boolean,
        default: true,
      }
    }
  };
</script>

<style lang="scss" scoped>
  @include b(main-warning) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    overflow: hidden;
    @include e(pic) {
      margin-bottom: 10px;
    }
    @include e(title) {
      font-weight: bold;
      text-align: center;
      margin-bottom: 25px;
    }
    @include e(brief) {
      padding: 0 20px;
      font-size: 14px;
      font-family: "PingFangSC-Regular";
      color: #999;
      text-align: center;
    }
    @include e(content) {
      padding: 0 20px;
      font-size: 14px;
      font-family: "PingFangSC-Regular";
      color: #999;
      text-align: left;
      margin-top: 25px;
    }
    @include e(button) {
      height: 44px;
      line-height: 44px;
      width: 100%;
      text-align: center;
      background: #2154d8;
      color: white;
      font-size: 16px;
      font-family: 'PingFangSC-Semibold';
      margin-top: 50px;
      span {
        display: block;;
      }

    }
  }
</style>
