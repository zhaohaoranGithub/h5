<template>
    <div>
        <global-notice-bar>
            <div v-for="(announcement,index) in globalAnnouncementList" :key="announcement.id" class="global-announcement-item" @click="openDialog(announcement,index)">
                {{announcement.summary}}
            </div>
        </global-notice-bar>

        <van-dialog v-model="show" class="global-activity" :title="currentActivity.name" close-on-click-overlay v-if='show'>
            <template v-if="currentActivity">
                <transition name="slide-fade" mode="out-in">
                    <div class="global-activity__main">

                        <div class="global-activity__inner" v-html="currentActivity.content">

                        </div>
                        <van-row type='flex' justify="space-between" class="global-activity__footer">
                            <template v-if="globalAnnouncementList.length > 1">
                                <van-button type="info" size='medium' native-type="submit" class="global-activity__button" @click="next">下一条</van-button>
                                <van-button type="primary" size='medium' native-type="submit" class="global-activity__button" @click="$router.push('/mc/mc')">查看全部</van-button>

                            </template>
                        </van-row>

                    </div>

                </transition>

            </template>
        </van-dialog>
    </div>
</template>

<script>
export default {
  name: "home-notice",
  data() {
    return {
      show: false,
      index: 0,
      currentNotice: {
        title: ""
      }
    };
  },
  computed: {
    ...mapGetters(["globalAnnouncementList"]),
    currentActivity() {
      return this.globalAnnouncementList[this.index];
    },
    prevActivity() {
      if (this.index === 0) {
        return this.globalAnnouncementList[
          this.globalAnnouncementList.length - this.index - 1
        ];
      } else {
        return this.globalAnnouncementList[this.index - 1];
      }
    },
    nextActivity() {
      if (this.index === this.globalAnnouncementList.length - 1) {
        return this.globalAnnouncementList[0];
      } else {
        return this.globalAnnouncementList[this.index + 1];
      }
    }
  },
  methods: {
    async openDialog(item, index) {
      this.currentNotice = item;
      this.show = true;
      this.index = index;
    },
    async prev() {
      if (this.index <= 0) {
        this.index = this.globalAnnouncementList.length - 1;
      } else {
        --this.index;
      }
    },
    async next() {
      if (this.index >= this.globalAnnouncementList.length - 1) {
        this.index = 0;
      } else {
        ++this.index;
      }
    }
  },
  mounted() {
    this.$store.dispatch(types.GET_GLOBAL_ANNOUNCEMENT);
  }
};
</script>


<style lang="scss">
@include b(global-activity) {
  @include e(main) {
    width: 90%;
    margin: 15px auto;
  }
  @include e(inner) {
    overflow: hidden;
    overflow-y: auto;
    background: #f5f6f7;
    padding: 15px;
    height: 266px;

    color: #9d93a1;
    font-family: $--main-font-family--Regular;
    font-size: 14px;

    img {
      width: 100%;
    }
  }
  @include e(footer) {
    margin-top: 15px;
  }
  @include e(button) {
    width: 114px;
  }
}
</style>
