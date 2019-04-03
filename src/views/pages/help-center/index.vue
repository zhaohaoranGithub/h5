<template>
    <div class="help-center">
        <ly-tab v-model="selectedId" :items="items" :options="options">
        </ly-tab>
        <div class="help-center-main">
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
        { label: "如何注册", routerName: "help-register" },
        { label: "存提转说明", routerName: "help-deposit" },
        { label: "优惠规则说明", routerName: "help-discount" },
        { label: "浏览器", routerName: "help-browser" },
        { label: "APP疑问", routerName: "help-app" },
        { label: "常见问题", routerName: "help-problem" }
      ],
      options: {
        activeColor: "#1E5ADC"
      }
    };
  }
};
</script>


<style lang="scss" scoped>
.help-center-main {
//   padding: 15px;
//   background: white;
}
</style>
