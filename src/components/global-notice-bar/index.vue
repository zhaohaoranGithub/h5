<template>
  <div class="main-notice">
    <div class="global-notice-bar">
      <van-icon name='volume' size='17px'></van-icon>
      <div class="global-notice-bar__wrap" ref='wrap'>
        <div class="global-notice-bar__content" ref='content'>
          <slot></slot>
        </div>
      </div>
    </div>

  </div>
</template>



<script>
export default {
  name: "global-notice-bar",
  data() {
    return {
      // 速度 1:1px
      speed: 2000,
      scrollHeight: 0,
      //总高度
      initialTop: 0,
      //当前长度
      currentTop: 0,
      //元素高度
      itemHeight: 0,
      //当前索引值
      //分屏
      tween: null,
      autoScroll: null,
      index: 0
    };
  },
  methods: {
    async startScoll() {
      const el = this.$refs.content;
      this.autoScroll = setInterval(() => {
       
        this.index += 1;
        if (
          this.index * this.$refs.wrap.getBoundingClientRect().height >=
          el.getBoundingClientRect().height - 22
        ) {
          TweenMax.set(el, {
            top: 0
          });
          this.index = 0;
        }
        TweenMax.to(el, 1, {
          top: this.index * -this.$refs.wrap.getBoundingClientRect().height,
          ease: Power0.easeNone
        });
      }, this.speed);
    }
  },
  mounted() {
    this.startScoll();
  },
  destroyed() {
    clearInterval(this.autoScroll);
  }
};
</script>


<style lang="scss" scoped>
@include b(global-notice-bar) {
  height: 40px;
  display: flex;
  padding: 0 10px;
  font-size: 14px;
  position: relative;
  align-items: center;
  background: white;
  color: #4a4a4a;

  @include e(wrap) {
    flex: 1;
    height: 24px;
    overflow: hidden;
    position: relative;
    padding-left: 5px;
    line-height: 24px;
  }
  @include e(content) {
    position: absolute;
    white-space: nowrap;
    font-size: 12px;
    font-family: $--main-font-family--Medium;
  }
}
</style>
