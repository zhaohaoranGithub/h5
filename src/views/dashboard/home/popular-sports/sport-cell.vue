<template>
  <div class="sport-cell">
    <div class="sport-cell__header">
      <svg-icon icon-class="decor" class="sport-cell__header-decor"></svg-icon>
      <div class="sport-cell__title">
        {{data.title}}
      </div>
      <div class="sport-cell__date">
        {{data.date}}
      </div>
    </div>
    <div class="sport-cell__main">
      <div class="sport-cell__game">
        <div class="sport-cell__team">
          {{data.team1}}
        </div>
        <div class="sport-cell__vs">
          VS
        </div>
        <div class="sport-cell__team is-right">
          {{data.team2}}
        </div>
      </div>
      <div class="sport-cell__rate-group">
        <div class="sport-cell-rate is-main">
          <div class="sport-cell-rate__left">
            主
          </div>
          <div class="sport-cell-rate__right">
            {{data.homeTeam}}
          </div>
        </div>
        <div class="sport-cell-rate" v-if="data.tie">
          <div class="sport-cell-rate__left">
            和
          </div>
          <div class="sport-cell-rate__right">
            {{data.tie}}
          </div>
        </div>
        <div class="sport-cell-rate is-away">
          <div class="sport-cell-rate__left">
            客
          </div>
          <div class="sport-cell-rate__right">
            {{data.awayTeam}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sport-cell",

    props: ['data'],

  };
</script>

<style lang="scss" scoped>

  $--color: #2c343a !default;
  $--height: 260px !default;
  $--border-color: #f2f2f3 !default;

  @include b(sport-cell) {
    box-sizing: border-box;
    background: $--color-white;
    color: $--color;
    border-radius: 12px;
    height:$--height;

    @include e(header) {
      font-size: $--font-size-large;
      @include flex-center();
      position: relative;
      padding-top: 34px;
      border-bottom: 1px solid $--border-color;
    }
    @include e(header-decor) {
      fill: #ecebeb;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 48px;
      width: auto;
    }

    @include e(title) {
      font-size: 22px;
      color: $--color;
      margin-bottom: 6px;
    }

    @include e(date) {
      color: $--color-gray-3;
      font-size: $--font-size-small;
      margin-bottom: 20px;
    }

    @include e(game) {
      margin: 30px auto 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    @include e(team) {
      font-size: 20px;
      color: $--color;
      width: 140px;
      text-align: right;
      @include utils-ellipsis();
      @include when(right) {
        text-align: left;
      }
    }
    @include e(vs) {
      font-size: 24px;
      font-weight: bold;
      color: $--color-primary;
      margin: 0 30px 10px 30px;
    }

    @include e(rate-group) {
      display: flex;
      width: 350px;
      justify-content: space-between;
      margin: 0 auto;
    }
  }

  $--sport-cell-rate-height: 35px !default;
  $--sport-cell-rate-width: 100px !default;

  @include b(sport-cell-rate) {
    width: $--sport-cell-rate-width;
    height: $--sport-cell-rate-height;
    display: flex;
    border: 1px solid #c8d7e9;
    border-radius: $--border-radius-base;

    margin-right: 10px;

    &:last-of-type {
      margin-right: 0;
    }

    @include e(left) {
      flex: 1 0 0;
      border-right: 1px solid #c8d7e9;
      line-height: $--sport-cell-rate-height;
      text-align: center;
      color: #bec2d4;
    }
    @include e(right) {
      flex: 1 0 0;
      line-height: $--sport-cell-rate-height;
      text-align: center;
      color: #070a14;
      font-weight: bold;
    }

    @include when(main) {
      color: $--color-primary;
      background-color: #f2f5f8;
      @include e(left) {
        color: $--color-primary;
      }
      @include e(right) {
        color: $--color-primary;
      }
    }
    @include when(away) {
      color: $--color-danger;
      background-color: #fdf4f5;
      @include e(left) {
        color: $--color-danger;
      }
      @include e(right) {
        color: $--color-danger;
      }
    }
  }
</style>