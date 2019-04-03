<template>
    <div class="default-head">
        <div class="default-head__img" @click="goTo('mc')">
            <img src="./../../../components/avatar-select/avatars/header-1.png" alt="" v-if='!avatar'>
            <img :src="headerImg.pic" alt="" v-else>
        </div>
        <div class="default-head__tips" v-if='newNoticeCount>0'></div>
    </div>
</template>

<script>
import avatarList from "@/components/avatar-select/avatar-list.js";
export default {
  computed: {
    ...mapGetters(["avatar"]),
    ...mapState({
        //get sub-router
        newNoticeCount: state => state.announcement.newNoticeCount,
      }),
    headerImg() {
      return avatarList[Number(this.avatar)];
    }
  },
  methods: {
    goTo(routeName){
      this.$router.push({path:routeName})
    },
  }
};
</script>

<style lang="scss" scoped>
@include b(default-head) {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: relative;
  @include e(img) {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @include e(tips) {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #e5142e;
    position: absolute;
    top: -2px;
    right: -2px;
  }
}
</style>
