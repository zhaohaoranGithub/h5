<template>
  <div v-if="show">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'timeout-cell',

    props: {
      time: {
        type: Number,
        default: 0,
      }
    },

    data() {
      return {
        show: false,
        timer: null
      };
    },

    mounted() {
      this.timer = setTimeout(() => {
        this.show = true;
      }, this.time);
    },

    destroyed() {
      clearTimeout(this.timer);
    }
  };
</script>

<style lang="scss" scoped>

</style>
