<template>
  <div class="customer-serivce" ref='customerServiceEntry' @click="open">
     <img src="./customer-service.png" alt="" class="customer-serivce__icon">
  </div>
</template>

<script>
  import MakeDragable from '@/utils/makeDragable';

  export default {
    name: "customer-service",
    props:{
    },
    data() {
      return{
        instance: null
      };
    },
    mounted(){
      // MakeDragable.init(this.$refs.customerServiceEntry)
      //需要在具体受影响的元素上监听，如果当前触摸点在客服图标上，则：preventDefault
    },

    computed: {
    },
    methods:{
      open() {
        this.$global.bus.$emit('open');
      },

    },

  };
</script>

<style lang="scss">
  @include b(customer-serivce) {
    cursor: pointer;
    position: fixed;
    top: 66%;
    right: 15px;
    transform: translateY(-50%);
    width: 45px;
    height: 45px;
    box-shadow: 0px 1px 7px 0px rgba(180, 189, 202, 1);
    z-index: 21;
    border-radius: 50%;
    @include e(icon) {
      width: 45px;
      height: 45px;
    }
  }

</style>
