<template>
  <img :src="fUrl" class="validate-img" @click="change" :width="width" :height="height">
</template>

<script>
  import Fingerprint from '@/vendor/scripts/fingerprint';

  export default {
    name: 'validate-img',
    props: {
      url: {
        default: `/api/gl/image/code?uuid=${new Fingerprint().get()}`,
      },
      width: {
        default: 55,
      },
      height: {
        default: 30
      }
    },

    data() {
      return {
        tUrl: this.url
      };
    },

    computed: {
      fUrl() {
        return this.tUrl;
      }
    },

    methods: {
      change() {
        this.tUrl = `${this.url}&_t=${Math.random()}`;
      }
    },
    mounted() {
      this.change();
    }
  };
</script>

<style lang="scss">
  @include b(validate-img) {
    border-radius: $--border-radius-base;
    cursor: pointer;
    box-shadow: 0px 6px 30px 0px
    rgba(0, 0, 0, 0.1);
  }

</style>