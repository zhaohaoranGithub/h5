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
       { label: "充值教程", routerName: "rechargeCourse-h5" },
      { label: "提现教程", routerName: "withdrawCourse-h5" }
      ],
      options: {
        activeColor: "#1E5ADC"
      }
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
