<template>
  <div class="withdraw-manager">
    <transition
      mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "withdraw-view"
  };
</script>

<style scoped>

</style>
