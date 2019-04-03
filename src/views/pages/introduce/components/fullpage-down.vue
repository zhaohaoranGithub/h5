<template>
    <div class="down-arrow">
        <i class="down-arrow__icon"></i>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@include b(down-arrow){
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    margin-top: 30px;
    @include e(icon){
        width: 14px;
        height: 12.5px;
        @include utils-bg(url("./down-arrow.png") no-repeat top, cover);
    }
}
</style>
