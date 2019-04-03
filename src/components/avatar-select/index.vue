<template>
  <div class="avatar-select" :class="[
       {
       'is-shadow': shadow
       }
       ]">
    <img class="avatar-select__pic" :src="headerImg.pic" @click='show=true'>
    <div class="avatar-select__upload-img">
    </div>

    <van-actionsheet v-model="show" title="选择头像">
      <!-- @on-success="closeDialog" -->
      <replace-head v-if="show" :avatar="avatar" @on-success='show=false' ></replace-head>
    </van-actionsheet>
    <!-- <div @click="openDialog({props: {avatar}, dialogName: 'replace-head'})" class="avatar-select__upload-img">
    </div> -->
    <!-- <div v-transfer-dom>
      <el-dialog :visible.sync="dialogVisible" :before-close="() => {dialogVisible = false}" :title="dialogTitle"
                 :width="consts.DIALOG_SIZE_MEDIUM">
          <replace-head v-if="dialogVisible"
                        :avatar="dialogProps.avatar"
                        @on-success="closeDialog"
          ></replace-head>
      </el-dialog>
    </div> -->
  </div>
</template>

<script>
import avatarList from "./avatar-list";
// import dialog from "@/mixins/dialog";
import ReplaceHead from "./replace-head";

export default {
  name: "avatar-select",

  components: {
    ReplaceHead
  },

  // mixins: [dialog],
  props: {
    shadow: Boolean,
    
  },

  data() {
    return {
      dialogTitle: "更换头像",
      show: false
    };
  },

  computed: {
    ...mapGetters(["avatar"]),
    headerImg() {
      return avatarList[Number(this.avatar)];
    }
  },
  methods: {
    handleRemove() {}
  }
};
</script>

<style lang="scss" scoped>
$--width: 84px;
$--height: 84px;

@include b(avatar-select) {
  position: relative;
  display: inline-block;
  // border-radius: $--border-radius-circle;
  width: $--width;
  height: $--height;
  cursor: pointer;
  @include e(pic) {
    width: 100%;
    height: 100%;
  }

  @include when(shadow) {
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.18);
  }

  @include e(upload-img) {
    width: 20px;
    height: 20px;
    position: absolute;
    right: -1px;
    bottom: -1px;
    z-index: 11;
    @include utils-bg(url("./pic.png") no-repeat center center, contain);
  }
}
</style>
