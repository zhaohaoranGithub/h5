<template>

  <van-cell-group>
    <!-- @clear="$emit('update:isLook',false)" -->
    <van-field clearable v-model='cInput' :type="type" :placeholder="placeholder" @clear='newLook=true' @keydown='newLook=true'>
      <template slot="left-icon">
        <svg-icon icon-class="password" type='info' size='small'></svg-icon>
      </template>
      <template slot="icon">
        <svg-icon class="password-input__eye" :icon-class="eyeIcon" @click.native="change()" type='info' size='small'></svg-icon>
      </template>

    </van-field>
  </van-cell-group>
</template>

<script>
export default {
  name: "password-input",
  data() {
    return {
      show: false,
      newLook: false,
      cleanPwd:false
    };
  },
  model: {
    prop: "input",
    event: "change",
  },

  props: {
    input: {},
    placeholder: {
      default: ""
    },
    isLook: {
      type: Boolean,
      default: true
    },
    allClean:{
      type: Boolean,
      default: false
    }
  },
  watch: {
    cInput(oldVal,newVal){
      if(this.cleanPwd && oldVal != newVal){
        this.cInput = '';
        this.cleanPwd = false;
      }
    },
    allClean(val){
      this.cleanPwd = val;
    }
  },
  methods: {
    change() {
      if (this.isLook || this.newLook) {
        this.show = !this.show;
      }
    }
  },
  computed: {
    cInput: {
      get() {
        return this.input;
      },
      set(value) {
        this.$emit("change", value);
      }
    },
    type() {
      return this.show ? "text" : "password";
    },
    eyeIcon() {
      return this.show ? "eye" : "eye-close";
    },
  },
};
</script>

<style lang="scss" scoped>
@include b(password-input) {
  @include e(eye) {
    cursor: pointer;
  }
}
</style>
