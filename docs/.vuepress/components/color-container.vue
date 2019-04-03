<template>
  <div :style="{fill: color.hex, color: color.hex}">
    <slot></slot>
    <color-photoshop v-model="color"></color-photoshop>
  </div>
</template>

<script>
  export default {
    name: "color-container",

    data() {
      return {
        color: {
          hex: '#66ccff'
        }
      };
    }
  }
</script>

<style scoped>

</style>