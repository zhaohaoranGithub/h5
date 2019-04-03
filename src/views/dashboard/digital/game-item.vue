<template>
  <div class="game-item">
    <div class="game-item__game_bg">
      <slot name="game_logo"></slot>
    </div>
    <div class="game-item__game_name">
      <div class="game-item__game_play">
        <h3 class="game-item__game_title">{{name}}</h3>
        <!-- <div class="game-item__game_play_btn">
          <a class="game-item__game_play_btn_a" href="javascript:;">
            <slot name="start_game"></slot>
          </a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "game-item",
  props: ["name"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
$--box-width: 32%;
$--box-height: 149px;
$--background: #ffffff;

@include b(game-item) {
  float: left;
  width: $--box-width;
  height: $--box-height;
  overflow: hidden;
  margin: 0 6px 15px 0;
  background: $--background;
  box-shadow: 0px 15px 24px 12px rgba(235, 235, 235, 0.6);
  border-radius: 5px;
  @include e(game_bg) {
    height: 109px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @include e(game_name) {
    height: 85px;
    overflow: hidden;
  }
  @include e(game_play) {
    position: relative;
    // height: 100%;
    height: 40px;
    transition: all 0.5s;
  }
  @include e(game_title) {
    font-size: 13px;
    font-weight: 300;
    text-align: center;
    line-height: 40px;
    margin-bottom: 0;
    color: #333;
    font-family: $--main-font-family--Regular;
    font-weight: 400;
  }
  @include e(game_play_btn) {
    position: absolute;
    top: -85px;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 85px;
    font-size: $--font-size-x-large;
    font-weight: bold;
    color: $--color-white;
    background: #1e5adc;
    // opacity:0;
    transition: all 0.5s "ease-in-out";
  }
  @include e(game_play_btn_a) {
    color: $--color-white;
  }
  // &:hover .game-item__game_play {
  //   margin-top: 85px;
  // }

  &:nth-child(3n) {
    margin-right: 0;
  }
}
</style>