<template>
  <div @click="go" class="area-code">
    <span>{{telArea}}</span>
    <van-icon name="arrow" />
  </div>
</template>

<script>
  export default {
    name: "area-code",
    data() {
      return{};
    },
    computed: {
      ...mapGetters(["telArea"])
    },
    // props: {
    //   telArea: {
    //     type: String
    //   },
    // },
    // model: {
    //   prop: 'telArea',
    //   event: 'changePayments'
    // },
    methods: {
      go() {
        this.$router.push({path: '/global-phone'});
      }
    }
  };
</script>

<style lang="scss" scoped>
  .area-code {
    position: relative;
    margin-left: 10px;
    height: 24px;
    width: auto;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    span {
      position: relative;
      top: 1px;
      font-size: 10px;
      color: #6c6c6c;
    }
    i {
      position: relative;
      top: 8px;
      left: 2px;
      color: #E7E7E7;
    }
  }
</style>
