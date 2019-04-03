<template>
  <div class="bank-pic"
       :class="[
         'bank-pic--' + size
       ]"
  >
    <img class="bank-pic__img" :src="bankInfo ? bankInfo.pic : undefined" />
  </div>
</template>

<script>
  export default {
    name: "bank-pic",
    props: {
      bankId: {
        type: Number,
        default: undefined
      },
      size: {
        default: 'small'
      }
    },

    computed: {
      bankInfo() {
        return _.find(consts.BANK_LIST, {value: this.bankId});
      }
    }
  };
</script>

<style lang="scss">
  @include b(bank-pic) {
    display: flex;
    align-items: center;
    justify-content: center;
    @include m(small) {
      width: 30px;
      height: 30px;
    }
    @include e(img) {
      width: 100%;
    }
  }

</style>