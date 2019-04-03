<template>
    <div class="games-rule">
       
        <ly-tab v-model="selectedId" :items="items" :options="options">
        </ly-tab>
        <div class="games-rule-main">
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
        { label: "体育游戏规则", routerName: "sportsGames" },
        { label: "真人娱乐规则", routerName: "immortalGames" },
        { label: "电子游戏规则", routerName: "electronGames" },
        { label: "彩票投注规则", routerName: "lotteryGames" },
      ],
      options: {
        activeColor: "#1E5ADC"
      }
    };
  }
};
</script>


<style lang="scss" scoped>
.games-rule-main {
  padding: 15px;
  background: white;
}
</style>
