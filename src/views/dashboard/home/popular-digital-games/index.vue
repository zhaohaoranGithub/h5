<template>
  <div class="popular-digital-games">
    <div class="popular-digital-games-main">
      <div class="popular-digital-games-main__top">
        <div class="popular-digital-games-main__top--l" @click="start(consts.GAME_SPORTS,'体育')">
          <div class="popular-digital-games-main__title popular-digital-games-main__title--sport">贝博体育</div>
          <div class="popular-digital-games-main__brief">返水高达
            <span>0.6%</span>
          </div>
        </div>
        <div class="popular-digital-games-main__top--r">
          <ul>
            <li @click="start(consts.AG_REAL,'AG真人')">
              <div class="popular-digital-games-main__title">AG真人</div>
            </li>
            <li @click="start(consts.EBET_REAL,'eBet真人娱乐')">
              <div class="popular-digital-games-main__title">eBet真人</div>
            </li>
          </ul>
        </div>
      </div>
      <van-row type='flex' justify='space-between' class="popular-digital-games-cell">
        <van-col span='8' class="popular-digital-games-cell__inner" @click.native="start(consts.TICKET,'LB彩票')">
          <img src="./image-9.png" alt="">
          <div class="popular-digital-games-main__title">
            LB彩票
          </div>
        </van-col>
        <van-col span='8' class="popular-digital-games-cell__inner" @click.native="isLogin?$router.push('/digital'):show=true">
          <img src="./image-8.png" alt="">
          <div class="popular-digital-games-main__title">
            PT电子
          </div>
        </van-col>
        <van-col span='8' class="popular-digital-games-cell__inner" @click.native="start(consts.AG_FISH,'AG捕鱼')">
          <img src="./image-4.png" alt="">
          <div class="popular-digital-games-main__title">
            AG捕鱼
          </div>
        </van-col>

      </van-row>
      <van-row type='flex' justify='space-between' class="popular-digital-games-cell">
        <!-- @click.native="start(consts.JOY_POKER,'欢乐棋牌')" -->
        <van-col span='8' class="popular-digital-games-cell__inner" @click.native="toLotteryGames">
          <img src="./image-10.png" alt="">
          <div class="popular-digital-games-main__title">
            欢乐棋牌
          </div>
        </van-col>
        <van-col span='8' class="popular-digital-games-cell__inner" @click.native="toLotteryGames">
          <img src="./image-11.png" alt="">
          <div class="popular-digital-games-main__title">
            AG电子
          </div>
        </van-col>
        <!-- @click.native="toLotteryGames" -->
        <van-col span='8' class="popular-digital-games-cell__inner">
          <!-- <img src="./image-default.png" alt="">
          <div class="popular-digital-games-main__title">
            敬请期待
          </div> -->
        </van-col>
      </van-row>

    </div>
    <van-dialog v-model="show" title='请先登录贝博娱乐账号' close-on-click-overlay v-if='show'>
      <div class="popular-digital-games__button">
        <van-button type="info" size='medium' class="popular-digital-games__reg" @click.native="$router.push({name:'registerAccount'})">注册</van-button>
        <van-button type="primary" size='medium' class="popular-digital-games__login" @click.native="$router.push({name:'login'})">登录</van-button>
      </div>

    </van-dialog>
    <van-dialog v-model="lotteryShow" title='暂未开通  敬请期待!' close-on-click-overlay v-if='lotteryShow'>
      <div class="popular-digital-games__button">
        <van-button type="primary" block size='medium' @click.native="lotteryShow=false">确定</van-button>
      </div>

    </van-dialog>

    <van-dialog v-model="balanceDialog" close-on-click-overlay v-if='balanceDialog'>
      <quick-transfer-confirm :propchannelId='channelId' :gamesId='gameId' :gamesName='gamesName'>

      </quick-transfer-confirm>
    </van-dialog>

  </div>
</template>

<script>
import game from "../../mixins/game";
export default {
  name: "popular-digital-games",
  mixins: [game],
  data() {
    return {
      show: false,
      lotteryShow: false
    };
  },
  methods: {
    toGames() {
      if (this.isLogin) {
      } else {
        this.show = true;
      }
    },
    toLotteryGames() {
      this.lotteryShow = true;
    }
  },
  computed: {
    ...mapGetters(["isLogin"])
  }
};
</script>

<style lang="scss" scoped>
@include b(popular-digital-games) {
  box-sizing: border-box;
  @include e(button) {
    margin: 30px 16px;
    display: flex;
    justify-content: center;
  }
  @include e(login) {
    width: 114px;
    margin-left: 12px;
  }
  @include e(reg) {
    width: 114px;
  }

  @include b(popular-digital-games-main) {
    @include e(top) {
      height: 192px;
      display: flex;
      justify-content: space-between;
    }
    @include e(top--l) {
      width: 190px;
      height: 192px;
      border-radius: 10px;
      @include utils-bg(url("./image-3.png") no-repeat center, cover);
      .popular-digital-games-main__title {
        padding-top: 136px;
        padding-left: 15px;
      }
      .popular-digital-games-main__brief {
        padding-left: 15px;
      }
    }
    @include e(top--r) {
      width: calc(100% - 196px);
      ul {
        li {
          height: 93px;
          border-radius: 10px;
          &:nth-child(1) {
            @include utils-bg(url("./image-6.png") no-repeat center, contain);
          }
          &:nth-child(2) {
            margin-top: 6px;

            @include utils-bg(url("./image-7.png") no-repeat center, contain);
          }
          text-align: right;
          .popular-digital-games-main__title {
            padding-top: 60px;
            padding-right: 15px;
          }
        }
      }
    }

    @include e(center) {
      height: 93px;
      display: flex;
      justify-content: space-between;
      margin-top: 6px;
    }
    @include e(center--l) {
      width: 190px;
      @include utils-bg(url("./image-7.png") no-repeat center, contain);
      text-align: left;
      .popular-digital-games-main__title {
        padding-top: 60px;
        padding-left: 15px;
      }
    }
    @include e(center--r) {
      width: calc(100% - 196px);
      @include utils-bg(url("./image-8.png") no-repeat center, contain);
      text-align: right;
      .popular-digital-games-main__title {
        padding-top: 60px;
        padding-right: 15px;
      }
    }
    @include e(bottom) {
      margin-top: 6px;
      height: 93px;

      .cell {
        height: 100%;
        width: 33.33%;
        .popular-digital-games-main__title {
          padding-top: 60px;
          text-align: center;
          font-size: 15px;
        }
      }
    }

    @include e(title) {
      font-size: 16px;
      font-family: $--main-font-family;
      font-weight: 600;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
      color: white;
      @include m(sport) {
        font-size: 18px;
      }
    }
    @include e(brief) {
      font-size: 12px;
      font-family: $--main-font-family;
      font-weight: 600;
      color: white;
      span {
        font-size: 16px;
        color: #ff5b00;
      }
    }
  }
}

@include b(popular-digital-games-cell) {
  height: 93px;
  margin-top: 6px;
  @include e(inner) {
    position: relative;
    margin-right: 6px;
    &:last-child {
      margin: 0;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      position: absolute;
      left: 0;
      top: 0;
      margin-right: 8px;
    }
  }

  @include b(popular-digital-games-main__title) {
    text-align: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
  }
}
</style>
