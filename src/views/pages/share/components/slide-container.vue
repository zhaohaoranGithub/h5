<template>
    <div class="slide-container">
        <div class="slide-container__inner" :style="[{'height':slideHeight+'px'}]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: "slide-container",
  data() {
    return {
      slideHeight:window.innerHeight<=568?window.innerHeight+100:window.innerHeight,
    };
  },
};
</script>

<style lang="scss">
@include b(slide-container) {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>