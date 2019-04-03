<template>
  <div class="payment-pic"
       :class="[
         'payment-pic--' + size
       ]"
  >
    <img class="payment-pic__img" :src="paymentInfo.pic" />
  </div>
</template>

<script>
  export default {
    name: "payment-pic",
    props: {
      paymentId: {
        type: Number,
        default: 1
      },
      size: {
        default: 'small'
      }
    },

    computed: {
      paymentInfo() {
        return _.find(consts.PAYMENT_LIST, {value: this.paymentId});
      }
    }
  };
</script>

<style lang="scss">
  @include b(payment-pic) {
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