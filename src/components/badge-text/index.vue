<template>
  <div class="badge-text">
    <div :class="`badge-text__${textInfo.type}`">
      <van-icon :name="textInfo.label" :type="textInfo.type"></van-icon>{{textInfo.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "badge-text",

    props: {
      value: {},
      dic: {}
    },

    computed: {
      textInfo() {
        return _.find(consts[this.dic], {value: this.value});
      }
    }
  };
</script>

<style lang="scss">
  @include b(badge-text) {
    @include e((fail, success)) {
      .van-icon {
        width: 10px;
        margin-right: 6px;
        top: 2px;
      }
    }
    @include e(success) {
      color: #42C14E;
    }
    @include e(fail) {
      color: #999999;
    }
  }
</style>
