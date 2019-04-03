<template>
  <div class="popular-sports" v-lazy:background-image="bgPic">
    <div class="popular-sports__inner">
      <div class="popular-sports__ball"></div>
      <div class="popular-sports__header">
        <div class="popular-sports__title">
          <div>
            热门赛事
          </div>
          <div class="popular-sports__nav">
            <div class="popular-sports__tab"
                 :class="{'is-active': form.gameId === 1}"
                 @click="refresh(1)"
            >足球</div>
            <div class="popular-sports__tab"
                 :class="{'is-active': form.gameId === 2}"
                 @click="refresh(2)"
            >篮球</div>

          </div>
        </div>
        <div class="popular-sports__button">
          <router-link :to="{name: 'sports'}">
            <el-button type="primary" size="medium">更多比赛</el-button>
          </router-link>
        </div>
      </div>
      <div class="popular-sports__main">
        <swiper class="popular-sports__swiper" :options="swiperOption" ref="mainSwiper">
          <swiper-slide :data-hash="index" v-for="(data, index) in sportsList" :key="index">
            <sport-cell :data="data"></sport-cell>
          </swiper-slide>
        </swiper>
        <div class="popular-sports__prev popular-sports__pagination">
          <svg-icon icon-class="arrow-right" :reverse="true" :stroke="true"></svg-icon>
        </div>
        <div class="popular-sports__next popular-sports__pagination">
          <svg-icon icon-class="arrow-right" :reverse="true" :stroke="true"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SportCell from "@/views/dashboard/home/popular-sports/sport-cell";

  import {
    hotGameApi as getApi
  } from '@/services/api/game';

  import {getCommand} from '@/build';

  export default {
    name: 'popular-sports',
    components: {SportCell},

    mixins: [getCommand],

    data() {
      return {
        form: {
          gameId: 1
        },
        list: [],
        today: undefined,
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.popular-sports__next',
            prevEl: '.popular-sports__prev'
          }
        },

        bgPic: require('./bg.png')
      };
    },

    computed: {
      sportsList() {
        return _.flatten(_.map(_.flatten(_.map(this.list, 'egs')), info => {
          return _.map(info.es, singleMatch => {
            let date = singleMatch.i[4].split(' / ');

            const homeTeam = _.result(singleMatch, 'o["1x2"][1]') || _.result(singleMatch, 'o.ml[1]');
            const awayTeam = _.result(singleMatch, 'o["1x2"][5]') || _.result(singleMatch, 'o.ml[3]');
            if (!homeTeam && !awayTeam) {
              return;
            }
            return {
              date: `${date[1]}-${date[0]} ${singleMatch.i[5]}`,
              title: info.c.n,
              team1: singleMatch.i[0],
              team2: singleMatch.i[1],
              // homeTeam: singleMatch.o['1x2'][1],
              // tie: singleMatch.o['1x2'][3],
              // awayTeam: singleMatch.o['1x2'][5],
              homeTeam,
              tie: _.result(singleMatch, 'o["1x2"][3]'),
              awayTeam,
            }
          });
        }));

        //   {
        //     date: 13434345455,
        //     title: '西班牙甲级联赛',
        //     team1: '皇家马德里',
        //     team2: '巴塞罗那',
        //     homeTeam: 1.32,
        //     tie: 0.29,
        //     awayTeam: 2.21,
        //   },
      }
    },

    methods: {
      refresh(id) {
        this.form.gameId = id;
        this.getAll();
      },
      slidePrev() {
        this.$refs.mainSwiper.slidePrev();
      },
      slideNext() {
        this.$refs.mainSwiper.slideNext();
      }
    },

    mounted() {
      this.bindGet(getApi, 'list', {
        sendingData: 'form',
        polling: 5000,
      });

      this.getAll();
    }
  };
</script>

<style lang="scss" scoped>
  $--width: 1220px;
  $--height: 495px;
  $--spacing: 90px;

  $--font-size: 28px;

  @include b(popular-sports) {

    box-sizing: border-box;
    @include utils-bg($--color-primary no-repeat no-repeat, cover);
    height: $--height;
    color: $--color-white;
    position: relative;


    @include e(inner) {
      width: $--width;
      margin: 0 auto;
    }

    @include e(header) {
      display: flex;
      padding: 86px 0 25px;
    }

    @include e(title) {
      font-size: $--font-size;
      font-weight: bold;
      flex: 1 0 0;
      display: flex;
      align-items: center;
      z-index: 10;
    }

    @include e(nav) {
      position: relative;
      z-index: 10;
      font-size: $--font-size;
      font-weight: normal;
      display: flex;
      align-items: center;
      margin-left: 15px;
    }
    @include e(tab) {
      color: #b3bfd3;
      margin-right: 10px;
      cursor: pointer;

      &:first-of-type {
        &:after {
          content: '|';
          color: #b3bfd3;
          padding-left: 10px;
        }
      }

      @include utils-transition-normal();

      @include when(active) {
        color: $--color-white;

      }
    }

    @include e(swiper) {
      padding-bottom: 70px;
    }

    @include e(ball) {
      background: url('ball.png') no-repeat no-repeat;
      background-size: cover;
      width: 396px;
      height: 396px;
      position: absolute;
      bottom: -12px;
      left: -20px;
    }

    @include e(pagination) {
      width: 28px;
      height: 59px;
      background-color: $--color-white;
      border-radius: 0 7px 7px 0;
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 10;
      outline:none;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 4px;
        stroke: $--color-gray-3;
      }
    }

    @include e(next) {
      transform: rotate(180deg);
      left: initial;
      right: 0;
    }
  }

  @media screen and (min-width: 1680px) {
    @include b(popular-sports) {
      @include main-center(100%);
    }
  }
</style>