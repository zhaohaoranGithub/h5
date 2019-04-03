<template>
  <div class="el-warning"
       :class="[
      sizeClass ? 'el-warning--' + sizeClass : '',
      {
        'is-no-spacing': this.noSpacingClass,
      }
      ]"
  >
    <van-icon name="info" class="el-warning__icon"/>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "el-warning",

    inject: {
      elFormItem: {
        default: ''
      },
    },

    props: {
      size: String,
      noSpacing: Boolean,
    },

    methods: {

    },

    computed: {

      noSpacingClass() {
        return _.isUndefined(this.elFormItem) ? this.noSpacing : !!this.elFormItem;
      },
      _formItemSize() {
        return this.elFormItem ? this.elFormItem.sizeClass : '';
      },
      elTipSize() {
        return this.size || this._formItemSize;
      },
      sizeClass() {
        return this.elTipSize || (this.$ELEMENT || {}).size;
      }
    }
  };
</script>

<style lang="scss">

  @include b(el-warning) {
    line-height:22px;
    font-size: $--font-size-small;
    box-sizing: border-box;
    padding-right: 20px;
    padding-left: 14px;
    display: flex;
    align-items: center;
    color: #EA4335;

    @include m(medium) {
      line-height:40px;
      height:40px;
    }

    @include e(icon) {
      font-size: $--font-size-base;
    }
    @include when(no-spacing) {
      margin-bottom: 0;
    }
  }

</style>
