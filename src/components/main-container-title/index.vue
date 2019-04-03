<template>
    <div class="main-container-title">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"main-container-title",
}
</script>


<style lang="scss" scoped>
$-font--size:14px;
$-font--family:'PingFangSC-Medium';
$-font--color:#000000;
.main-container-title{
    font-size: $-font--size;
    font-family: $-font--family;
    color: $-font--color;
    font-weight:500;
    &.big-title{
        font-size: 16px;
        margin-bottom: 30px;
    }
}
</style>
