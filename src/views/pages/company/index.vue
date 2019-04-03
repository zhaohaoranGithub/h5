<template>
    <div class="company-container">
        <ly-tab v-model="selectedId" :items="items" :options="options">
        </ly-tab>
        <div class="company-container-main">
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
        // { label: "博彩声明", routerName: "company" },
        { label: "博彩责任", routerName: "lotteryBlame" },
        { label: "用户协议", routerName: "userAgreement" },
        { label: "条款条约", routerName: "clause" },
        { label: "隐私政策", routerName: "conceal" },
      ],
      options: {
        activeColor: "#1E5ADC"
      }
    };
  }
};
</script>


<style lang="scss" scoped>
.company-container-main {
  padding: 15px;
  background: white;
}
</style>
