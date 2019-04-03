<template>
    <div class="see-image" v-if="visible" @click="hideImage">
        <div class="see-image-inner" :style="{ backgroundColor:background }">
            <div class="see-image-inner__info">
                 <div class="see-image-inner__close" @click="close" v-show="closeButtonVisible">x</div>
                <img v-drag="greet" id="drag" class="image" :src="currentImg" @mousewheel="wheel" ref="user_image" />
               
            </div>

        </div>

        <div class="rotate" @click.stop="rotateImage" v-show="rotateButtonVisible"><img src="./icon/rotate.png" /></div>

    </div>
</template>

<script>
import config from "./config";

const {
  modalOpacity,
  canClickModalHide,
  rotateButtonVisible,
  closeButtonVisible
} = config;
export default {
  data() {
    return {
      currentImg: "",
      visible: false,
      background:
        modalOpacity > 1 ||
        modalOpacity <= 0 ||
        typeof modalOpacity !== "number"
          ? null
          : "rgba(0,0,0," + modalOpacity + ")",
      rotateButtonVisible,
      closeButtonVisible
    };
  },
  watch: {},
  methods: {
    close() {
      this.clearImg();
    },
    //接受传来的位置数据，并将数据绑定给data下的val
    greet(val) {
      this.val = val;
    },

    //点击图片之外区域隐藏图片
    hideImage(e) {
      if (!this.visible || (!canClickModalHide && closeButtonVisible)) return;
      document.addEventListener("click", e => {
        if (e.target.nodeName !== "IMG" && e.target.nodeName !== "BUTTON") {
          this.clearImg();
        }
      });
    },

    //旋转图片
    rotateImage(e) {
      // console.log(this.$refs.user_image.style.transform);
      let fromRotateDeg = this.$refs.user_image.style.transform.split(" ");

      switch (fromRotateDeg[0]) {
        case "rotate(0deg)":
          fromRotateDeg[0] = "rotate(90deg)";
          break;
        case "rotate(90deg)":
          fromRotateDeg[0] = "rotate(180deg)";
          break;
        case "rotate(180deg)":
          fromRotateDeg[0] = "rotate(270deg)";
          break;
        case "rotate(270deg)":
          fromRotateDeg[0] = "rotate(360deg)";
          break;
        default:
          fromRotateDeg[0] = "rotate(90deg)";
          break;
      }
      this.$refs.user_image.style.transform = fromRotateDeg.join(" ");
    },
    //滚轮
    wheel(e) {
      if (e.wheelDelta) {
        //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) {
          //当滑轮向上滚动时
          this.$refs.user_image.style.transform =
            this.$refs.user_image.style.transform + " scale(0.9)";
        }
        if (e.wheelDelta < 0) {
          //当滑轮向下滚动时
          this.$refs.user_image.style.transform =
            this.$refs.user_image.style.transform + " scale(1.1)";
        }
      } else if (e.detail) {
        //Firefox滑轮事件
        if (e.detail > 0) {
          //当滑轮向上滚动时
          this.$refs.user_image.style.transform =
            this.$refs.user_image.style.transform + " scale(0.9)";
        }
        if (e.detail < 0) {
          //当滑轮向下滚动时
          this.$refs.user_image.style.transform =
            this.$refs.user_image.style.transform + " scale(1.1)";
        }
      }
    },

    //当图片隐藏时候的回调
    clearImg() {
      this.visible = false;
      document.removeEventListener("click", null);
      setTimeout(() => {
        if (this.$refs.user_image) {
          this.$refs.user_image.style.transform = "rotate(0deg)";
          this.$refs.user_image.style.left = "";
          this.$refs.user_image.style.top = "";
        }
      }, 100);
    }
  }
};
</script>

<style scoped lang='scss'>
@include b(see-image) {
  @include b(see-image-inner) {
    width: 100%;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.3);
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    animation: 0.25s showAimation ease;

    @include e(info) {
      position: absolute;
      max-width: 100%;
      min-height: 200px;
      width: 100%;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;  
      flex-flow: column;
      img {
        width: 80%;
        height: 100%;
        min-width: 312px;
        min-height: 174px;
      }
    }
    @include e(close){
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid white;
        color: white;
        text-align: center;
        line-height: 28px;
        font-size: 18px;
        float: right;
        position: absolute;
        top: -20px;
        right: 20px;
        cursor: pointer;
        z-index: 11111;
    }
  }
}

@keyframes showAimation {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}

.rotate {
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  bottom: 50px;
  left: 50%;
  margin-left: -15px;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.4);
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10000;
}

.rotate img {
  width: 10px;
}

.rotate:hover {
  background: #409eff;
  border: 1px solid #409eff;
}


.close:hover {
  transform: rotate(90deg);
}

.close img {
  width: 40px;
  height: 40px;
}
</style>