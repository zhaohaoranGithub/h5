<template>
    <div class="main-collapse-title">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "collapse-title"
};
</script>

<style lang="scss" scoped>
.main-collapse-title {
  padding:15px 0px 0px 15px ;
  font-size: 14px;
  font-family: 'PingFangSC-Semibold';
  font-weight: 600;
  color: #000;
}
</style>

