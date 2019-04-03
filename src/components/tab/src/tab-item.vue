<template>
  <div class="ly-tab-item" :style="$parent.value === id ? activeStyle : {}" @click="onItemClicked">
    <div class="ly-tab-item-icon" v-if="$parent.fixBottom">
      <slot name="icon"></slot>
    </div>
    <div class="ly-tab-item-label">
      <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "LyTabItem",
  computed: {
    activeStyle() {
      return {
        color: this.$parent.activeColor
      };
    }
  },
  data() {
    return {
      id: (this.$parent.$children.length || 1) - 1
    };
  },
  methods: {
    onItemClicked() {
      this.$parent.$emit("input", this.id);
    }
  }
};
</script>

<style lang='scss'>
$-font--size: 14px;
$-font--family: "PingFangSC-Semibold";
$-font--weight: 600;
$-font--color: #999999;
.ly-tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-align: center;
  color: $-font--color;
      font-size: $-font--size;
      font-weight: $-font--weight;
      font-family: $-font--family;
  
}

.ly-tab-item-icon {
  margin: 0 auto 5px;
}
</style>
