<template>
  <div class="course-container">
    <ly-tab v-model="selectedId" :items="items" :options="options">
    </ly-tab>
    <div class="course-container-main">
      <router-view></router-view>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedId: 0,
      items: [
        { label: "充值教程", routerName: "rechargeCourse" },
        { label: "提现教程", routerName: "withdrawCourse" },
        { label: "投注教程", routerName: "betCourse" }
      ],
      options: {
        activeColor: "#1E5ADC"
      }
    };
  },
  created() {
    if (this.$route.query.type === "sport") {
      this.items = [
         { label: "投注教程", routerName: "betCourse" },
        { label: "充值教程", routerName: "rechargeCourse" },
        { label: "提现教程", routerName: "withdrawCourse" },
       
      ];
      this.$router.push({name:'betCourse'});
    } else {
      this.items = [
        { label: "充值教程", routerName: "rechargeCourse" },
        { label: "提现教程", routerName: "withdrawCourse" }
      ];
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
