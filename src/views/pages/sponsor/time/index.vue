<template>
    <div class="sponsor-times">
        <sponsor-title>精彩时刻</sponsor-title>
        <div class="sponsor-times-main">
            <div class="sponsor-times-main-cell" v-for='(item,index) in imgList' :key="index" @click="osMethods(item.videoUrl)">
                <div class="sponsor-times-main-cell__images">
                    <img :src="item.src" alt="">
                </div>
                <div class="sponsor-times-main-cell__brief">{{item.title}}</div>
            </div>

        </div>
    </div>
</template>

<script>
import sponsorTitle from "../components/sponsor-title";
const imgList = [
  {
    title: "11-25 03-45 马德里竞技 1-1 巴塞罗那",
    src: require("./pic-1.png"),
    videoUrl:
      "openVideo&&_&&http://sports.pptv.com/sportslive?sectionid=145326&matchid=235394"
  },
  {
    title: "12-02 23-15 赫罗纳 1-1 马德里竞技",
    src: require("./pic-2.png"),
    videoUrl:
      "openVideo&&_&&http://sports.pptv.com/sportslive?sectionid=145362&matchid=235410"
  },
  {
    title: "12-09 03-45 西班牙人 0-4 巴塞罗那",
    src: require("./pic-3.png"),
    videoUrl:
      "openVideo&&_&&http://sports.pptv.com/sportslive?sectionid=149971&matchid=235420"
  },
  {
    title: "12-09 23-15 韦斯卡 0-1 皇家马德里",
    src: require("./pic-4.png"),
    videoUrl:
      "openVideo&&_&&http://sports.pptv.com/sportslive?sectionid=145399&matchid=235417"
  }
];
export default {
  data() {
    return {
      imgList
    };
  },
  components: {
    sponsorTitle
  },
  methods: {
    osMethods(url) {
        window.location.href=url;
    }
  }
};
</script>

<style lang="scss" scoped>
@include b(sponsor-times) {
  @include b(sponsor-times-main) {
    @include main-center(330px);
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    @include b(sponsor-times-main-cell) {
      width: 157px;
      height: 120px;
      margin-bottom: 24px;
      @include e(images) {
        width: 157px;
        height: 88px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      @include e(brief) {
        font-size: 10px;
        font-family: "MicrosoftYaHei";
        font-weight: 400;
        color: #0b2a4b;
      }
    }
  }
}
</style>
