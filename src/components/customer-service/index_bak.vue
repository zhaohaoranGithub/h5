<template>
  <span class="customer-serivce" @click="open"><slot></slot></span>
</template>

<script>
  export default {
    name: "customer-service",
    props:{
    },
    data(){
      return{
        url: `https://lc.chat/now/10274767/2`,
      };
    },

    computed: {
      ...mapGetters([
        'username',
        'userId',
        'isLogin'
      ]),
    },
    methods:{
      open(){
        let newwin;
        if (this.isLogin) {
          newwin = window.open(
            `${this.url}&info=${encodeURIComponent(`userId=${this.userId}&name=${this.username}`)}`,
            'service',
            'width=800,height=680',
          );
        } else {
          newwin = window.open(`${this.url}`, 'service', 'width=800,height=680');
        }
        newwin.moveTo(100, 50);
      },
    },
  };
</script>

<style lang="scss">
  .customer-serivce {
    cursor: pointer;
  }
</style>
