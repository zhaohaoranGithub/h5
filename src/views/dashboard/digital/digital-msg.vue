<template>
<div class="digital-msg">
  <global-notice-bar>
    <div v-for="(item, index) in list" :key="index" class="digital-msg-cell">
      <div class="digital-msg__text">
        恭喜 {{item.username.length>3 ? item.username.substring(0,3) : item.username}}****  在{{item.gamename}}游戏中中奖
        <span>{{item.prize}}</span>元
      </div>
    </div>
  </global-notice-bar>
  </div>

</template>

<script>
import { form } from "@/build";

import { gameListPrize as getApi } from "@/services/api/game";

export default {
  name: "digital-msg",
  data() {
    return {
      list: []
    };
  },
  mixins: [form],
  mounted() {
    this.bindGet(getApi, "list");
    this.getAll();
  }
};
</script>

<style lang="scss" scoped>
@include b(digital-msg) {
  width: 100%;
  padding: 11px 0;
  @include e(text) {
    font-size: 12px;
    font-family: $--main-font-family--Regular;
    font-weight: 400;
    color: #4a4a4a;
    span {
      color: #ea4335;
      font-family: $--main-font-family;
    }
  }
}
</style>