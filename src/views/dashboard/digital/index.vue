<template>
  <div class="digital">
    <div class="digital-search">
      <div class="digital-search__icon" v-if='!search' @click="search=true,newClassifyList=[]">
        <i></i>
      </div>
      <div class="digital-search__main" v-else>
        <form action="/">
          <van-search v-model="keyword" placeholder="请输入游戏名" show-action @cancel="search=false,keyword = ''">

            <template slot="left-icon">
              <i class="icon-search"></i>
            </template>
          </van-search>
        </form>
      </div>
    </div>
    <div class="digital__swiper" v-if='!search'>
      <van-swipe :autoplay="3000" indicator-color="white" :height='232'>
        <van-swipe-item v-for='(item,index) in swiperList' :key="index">
          <div class="main-full" :style="`background:url(${item.image}) no-repeat center;background-size:100%;`">
            <div class="main-full__slide">
              <div class="main-full__title">PT游戏奖金池累计金额</div>
              <div class="main-full__brief">¥ {{ptBonus}}</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>

    </div>
    <div class="digital-container" :style="{'padding-top':search?'44px':''}">

      <!-- 通知 -->
      <digital-msg v-if='!search'></digital-msg>

      <div class="digital-container__main-test clearfix">
        <template v-if='!search'>
          <game-item :name="gameInfo.gameName" v-for="gameInfo in classifyList" :key="gameInfo.gameId" @click.native="start(gameInfo.gameId,'PT电子', {gameInfo})">
            <img v-lazy="gameInfo.logo || 'http://dummyimage.com/224x189'" alt="" slot="game_logo">
          </game-item>
        </template>
        <template v-else>
          <div v-if='newClassifyList.length>0'>
            <div class="digital-container-serach__head" v-if='keyword'>
              为您找的结果为:
            </div>
            <game-item :name="gameInfo.gameName" v-for="gameInfo in newClassifyList" :key="gameInfo.gameId" @click.native="start(gameInfo.gameId,'PT电子', {gameInfo})">
              <img v-lazy="gameInfo.logo || 'http://dummyimage.com/224x189'" alt="" slot="game_logo">
            </game-item>
          </div>

          <div class="digital-container-serach__empty" v-else>
            <div class="digital-container-serach__empty-main">
              <img src="./empty.png" alt="" width="100" height="100">
              <p>没有找到“关键词”相关的结果</p>
            </div>
          </div>

        </template>

      </div>

    </div>
    <digital-nav-footer></digital-nav-footer>

    <van-dialog v-model="balanceDialog" close-on-click-overlay v-if='balanceDialog'>
      <quick-transfer-confirm :propchannelId='channelId' :gamesId='gameId' :gamesName='gamesName'>

      </quick-transfer-confirm>
    </van-dialog>
  </div>
</template>

<script>
import { advertListApi } from "@/services/api/advert";

import { subGameListApi as getApi } from "@/services/api/game";
import GameItem from "./game-item.vue";
import DigitalMsg from "./digital-msg";

import { getCommand, swiper } from "@/build";
import game from "../mixins/game";

import digitalNavFooter from "./footer/index";

export default {
  name: "digital-view",

  mixins: [game, getCommand, swiper],

  components: {
    GameItem,
    DigitalMsg,
    digitalNavFooter
  },

  data() {
    return {
      time: 0,
      digitalOptionList: consts.DIGITAL_TYPE,
      app: undefined,
      keyword: undefined,
      openWindow: true,
      gameList: [],
      classifyList: [],
      newClassifyList: [],
      search: false
    };
  },

  computed: {
    ...mapState({
      ptBonus: state => state.global.ptBonus
    }),
    cGameList() {
      if (this.keyword) {
        return _(this.gameList)
          .map(subList => {
            return _.filter(subList, gameInfo => {
              return gameInfo.gameName.indexOf(this.keyword) > -1;
            });
          })
          .value();
      } else {
        return this.gameList;
      }
    },
    isEmpty() {
      if (_.isArray(this.cGameList)) {
        return _.isEmpty(_.flatten(this.cGameList));
      } else {
        return _.isEmpty(this.cGameList);
      }
    }
  },

  watch: {
    cGameList(v, o) {
      this.classifyList = this.newClassifyList = v[this.time];
    },
    time(v, o) {
      this.classifyList = this.newClassifyList = this.cGameList[this.time];
    }
  },

  mounted() {
    this.bindGet(getApi, "gameList", {
      sendingData: {
        channelId: consts.PT
      },
      format(data) {
        // const hotGames = _.filter(data, {hot: 1});
        const games = _.groupBy(data, gameInfo => {
          return gameInfo.subType;
        });
        games[0] = data;

        return games;
      }
    });

    this.bindGet(advertListApi, "swiperList", {
      sendingData: {
        position: consts.AD_DIGITAL
      }
    });

    this.getAll();
  }
};
</script>

<style lang="scss" scoped>
@include b(icon-search) {
  width: 17px;
  height: 17px;
  @include utils-bg(url(./search-grad.png) no-repeat no-repeat, contain);
}
@include b(digital) {
  position: relative;
  padding-bottom: 49px;
  @include b(digital-search) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 11;
    @include e(icon) {
      width: 100%;

      i {
        width: 25px;
        height: 25px;
        float: right;
        margin: 15px 10px 0 0;
        @include utils-bg(url(./search.png) no-repeat no-repeat, contain);
      }
    }
  }
  @include e(swiper) {
  }
}
@include b(main-full) {
  width: 100%;
  height: 100%;
  position: relative;

  @include e(slide) {
    position: absolute;
    color: white;
    bottom: 8px;
    left: 15px;
  }

  @include e(title) {
    font-size: 12px;
    font-weight: 600;
    font-family: $--main-font-family;
  }
  @include e(brief) {
    font-size: 22px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
  }
  @include e(button) {
    padding-bottom: 50px;
  }
}
@include b(digital-container) {
  @include e(main-test) {
    padding: 0 16px;
    height: 100%;
  }
}
@include b(main-swiper-slide) {
  @include e(title) {
    font-size: 41px;
    font-weight: 300;
  }
}
@include b(digital-search) {
  @include e(icon) {
    position: absolute;
  }
}

@include b(digital-container-serach) {
  @include e(head) {
    padding-top: 30px;
    margin-bottom: 13px;
    color: #333333;
    font-size: 15px;
    font-family: $--main-font-family;
  }
  @include e(title) {
    font-size: 28px;
    font-weight: bold;
  }
  @include e(empty-main) {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 14px;
      font-family: $--main-font-family--Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      margin-top: 31px;
    }
  }
  @include e(empty) {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 10vh;
  }
  @include e(empty-icon) {
    width: 90px;
    height: 90px;
  }
  @include e(empty-hint) {
    margin-top: 30px;
    font-size: $--font-size-base;
    font-weight: bold;
  }
}
</style>
<style lang="scss">
.digital-container__navbar-list {
  .digital-container__search-input {
    .el-input__inner {
      height: 100%;
      border: 0;
    }
  }
}
</style>
