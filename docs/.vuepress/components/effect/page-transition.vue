<template>
  <div class="block">
    <el-row>
      <div id="pt-main" class="pt-perspective">
        <transition
          :enter-active-class="inClass"
          :leave-active-class="outClass"
          @afterEnter="afterEnter"
        >
          <div class="pt-page pt-page-1" v-if="curPage === 1" key="page1"><h1><span>这是</span><strong>一个</strong> 转场</h1>
          </div>
          <div class="pt-page pt-page-2" v-else-if="curPage === 2" key="page2"><h1><span>这是</span><strong>一个</strong> 转场
          </h1></div>
          <div class="pt-page pt-page-3" v-else-if="curPage === 3" key="page3"><h1><span>这是</span><strong>一个</strong> 转场
          </h1></div>
          <div class="pt-page pt-page-4" v-else-if="curPage === 4" key="page4"><h1><span>这是</span><strong>一个</strong> 转场
          </h1></div>
          <div class="pt-page pt-page-5" v-else-if="curPage === 5" key="page5"><h1><span>这是</span><strong>一个</strong> 转场
          </h1></div>
          <div class="pt-page pt-page-6" v-else key="page6"><h1><span>这是</span><strong>一个</strong> 转场</h1></div>
        </transition>
      </div>

    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click.native="nextPage">播放转场效果</el-button>
      <el-button type="success" @click.native="nextEffect">切换下一个转场效果</el-button>
    </el-row>
    <el-row type="flex" justify="center">
      <span class="demonstration">选择转场效果</span>
      <el-cascader
        expand-trigger="hover"
        :options="options"
        v-model="selectedOptions"
        @change="handleChange">
      </el-cascader>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'page-transition',
    data() {
      return {
        options: [{
          value: "1",
          label: "平移",
          children: [{
            value: 1,
            label: "从右"
          }, {
            value: 2,
            label: "从左"
          }, {
            value: 3,
            label: "从下"
          }, {
            value: 4,
            label: "从上"
          }]
        }, {
          value: "2",
          label: "褪色（Fade)",
          children: [{
            value: 5,
            label: "从右"
          }, {
            value: 6,
            label: "从左"
          }, {
            value: 7,
            label: "从下"
          }, {
            value: 8,
            label: "从上"
          }, {
            value: 9,
            label: "左右"
          }, {
            value: 10,
            label: "右左"
          }, {
            value: 11,
            label: "上下"
          }, {
            value: 12,
            label: "下上"
          }]
        }, {
          value: "3",
          label: "差分缓动（easing）",
          children: [{
            value: 13,
            label: "从右"
          }, {
            value: 14,
            label: "从左"
          }, {
            value: 15,
            label: "从下"
          }, {
            value: 16,
            label: "从上"
          }]
        }, {
          value: "4",
          label: "比例（scale）",
          children: [{
            value: 17,
            label: "缩小 / 从右"
          }, {
            value: 18,
            label: "缩小 / 从左"
          }, {
            value: 19,
            label: "缩小 / 从下"
          }, {
            value: 20,
            label: "缩小 / 从上"
          }, {
            value: 21,
            label: "缩小 / 缩放"
          }, {
            value: 22,
            label: "放大 / 放大"
          }, {
            value: 23,
            label: "向左移动 / 放大"
          }, {
            value: 24,
            label: "向右移动 / 放大"
          }, {
            value: 25,
            label: "向上移动 / 放大"
          }, {
            value: 26,
            label: "向下移动 / 放大"
          }, {
            value: 27,
            label: "缩小 / 放大"
          }]
        }, {
          value: "5",
          label: "旋转（rotate）",
          children: [{
            value: 1,
            label: "glue",
            children: [{
              value: 28,
              label: "Glue left / from right"
            }, {
              value: 29,
              label: "Glue right / from left"
            }, {
              value: 30,
              label: "Glue bottom / from top"
            }, {
              value: 31,
              label: "Glue top / from bottom"
            }]
          }, {
            value: 2,
            label: "翻转（flip）",
            children: [{
              value: 32,
              label: "向右"
            }, {
              value: 33,
              label: "向左"
            }, {
              value: 34,
              label: "向上"
            }, {
              value: 35,
              label: "向下"
            }]
          }, {
            value: 36,
            label: "落下（fall）"
          }, {
            value: 6,
            label: "Push / Pull",
            children: [{
              value: 38,
              label: "Push left / from right"
            }, {
              value: 39,
              label: "Push right / from left"
            }, {
              value: 40,
              label: "Push top / from bottom"
            }, {
              value: 41,
              label: "Push bottom / from top"
            }, {
              value: 42,
              label: "Push left / pull right"
            }, {
              value: 43,
              label: "Push right / pull left"
            }, {
              value: 44,
              label: "Push top / pull bottom"
            }, {
              value: 45,
              label: "Push bottom / pull top"
            }]
          }, {
            value: 7,
            label: "Fold / Unfold",
            children: [{
              value: 46,
              label: "Fold left / from right"
            }, {
              value: 47,
              label: "Fold right / from left"
            }, {
              value: 48,
              label: "Fold top / from bottom"
            }, {
              value: 49,
              label: "Fold bottom / from top"
            }, {
              value: 50,
              label: "Move to right / unfold left"
            }, {
              value: 51,
              label: "Move to left / unfold right"
            }, {
              value: 52,
              label: "Move to bottom / unfold top"
            }, {
              value: 53,
              label: "Move to top / unfold bottom"
            }]
          }, {
            value: 8,
            label: "Room",
            children: [{
              value: 54,
              label: "Room to left"
            }, {
              value: 55,
              label: "Room to right"
            }, {
              value: 56,
              label: "Room to top"
            }, {
              value: 57,
              label: "Room to bottom"
            }]
          }, {
            value: 9,
            label: "Cube",
            children: [{
              value: 58,
              label: "Cube to left"
            }, {
              value: 59,
              label: "Cube to right"
            }, {
              value: 60,
              label: "Cube to top"
            }, {
              value: 61,
              label: "Cube to bottom"
            }]
          }, {
            value: 10,
            label: "Carousel",
            children: [{
              value: 62,
              label: "Carousel to left"
            }, {
              value: 63,
              label: "Carousel to right"
            }, {
              value: 64,
              label: "Carousel to top"
            }, {
              value: 65,
              label: "Carousel to bottom"
            }]
          }, {
            value: 66,
            label: "Sides"
          }]
        }, {
          value: 37,
          label: "新闻（Newspaper）"
        }, {
          value: 67,
          label: "Slide"
        }],
        curPage: 1,
        outClass: "",
        inClass: "",
        animCursor: 0,
        selectedOptions: [],
        animating: false
      }
    },
    watch: {
      animCursor: {
        handler() {
          this.changeEffect(this.animCursor);
          this.nextPage();
        }
      }
    },

    methods: {
      afterEnter: function() {
        this.animating = false
      },
      handleChange(value) {
        this.changeEffect(Number(value[1]));
        this.nextPage();
      },
      nextPage() {
        if (this.animating) {
          return false;
        }

        this.animating = true;

        if (this.animCursor === 0) {
          this.animCursor++;
        }

        ++this.curPage;

        if (this.curPage > 6) {
          this.curPage = 1;
        }
      },
      nextEffect() {
        if (this.animating) {
          return false;
        }

        ++this.animCursor;
        if (this.animCursor > 67) {
          this.animCursor = 1;
        }
        this.changeCurrentCascader(this.animCursor);
      },
      changeCurrentCascader(animCursor) {
        if (animCursor) {
          let selectedOptions = [];
          !function findSelectOption(s, o) {
            let flag = false;
            return _.each(o, function(t) {
              t.children ? findSelectOption(s, t.children) && s.unshift(t.value) : t.value === animCursor && (s.unshift(animCursor),
                flag = true)
            }),
              flag
          }(selectedOptions, this.options);
          this.selectedOptions = selectedOptions;
        }
      },

      changeEffect(index) {
        switch (index) {

          case 1:
            this.outClass = 'pt-page-moveToLeft';
            this.inClass = 'pt-page-moveFromRight';
            break;
          case 2:
            this.outClass = 'pt-page-moveToRight';
            this.inClass = 'pt-page-moveFromLeft';
            break;
          case 3:
            this.outClass = 'pt-page-moveToTop';
            this.inClass = 'pt-page-moveFromBottom';
            break;
          case 4:
            this.outClass = 'pt-page-moveToBottom';
            this.inClass = 'pt-page-moveFromTop';
            break;
          case 5:
            this.outClass = 'pt-page-fade';
            this.inClass = 'pt-page-moveFromRight pt-page-ontop';
            break;
          case 6:
            this.outClass = 'pt-page-fade';
            this.inClass = 'pt-page-moveFromLeft pt-page-ontop';
            break;
          case 7:
            this.outClass = 'pt-page-fade';
            this.inClass = 'pt-page-moveFromBottom pt-page-ontop';
            break;
          case 8:
            this.outClass = 'pt-page-fade';
            this.inClass = 'pt-page-moveFromTop pt-page-ontop';
            break;
          case 9:
            this.outClass = 'pt-page-moveToLeftFade';
            this.inClass = 'pt-page-moveFromRightFade';
            break;
          case 10:
            this.outClass = 'pt-page-moveToRightFade';
            this.inClass = 'pt-page-moveFromLeftFade';
            break;
          case 11:
            this.outClass = 'pt-page-moveToTopFade';
            this.inClass = 'pt-page-moveFromBottomFade';
            break;
          case 12:
            this.outClass = 'pt-page-moveToBottomFade';
            this.inClass = 'pt-page-moveFromTopFade';
            break;
          case 13:
            this.outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
            this.inClass = 'pt-page-moveFromRight';
            break;
          case 14:
            this.outClass = 'pt-page-moveToRightEasing pt-page-ontop';
            this.inClass = 'pt-page-moveFromLeft';
            break;
          case 15:
            this.outClass = 'pt-page-moveToTopEasing pt-page-ontop';
            this.inClass = 'pt-page-moveFromBottom';
            break;
          case 16:
            this.outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
            this.inClass = 'pt-page-moveFromTop';
            break;
          case 17:
            this.outClass = 'pt-page-scaleDown';
            this.inClass = 'pt-page-moveFromRight pt-page-ontop';
            break;
          case 18:
            this.outClass = 'pt-page-scaleDown';
            this.inClass = 'pt-page-moveFromLeft pt-page-ontop';
            break;
          case 19:
            this.outClass = 'pt-page-scaleDown';
            this.inClass = 'pt-page-moveFromBottom pt-page-ontop';
            break;
          case 20:
            this.outClass = 'pt-page-scaleDown';
            this.inClass = 'pt-page-moveFromTop pt-page-ontop';
            break;
          case 21:
            this.outClass = 'pt-page-scaleDown';
            this.inClass = 'pt-page-scaleUpDown pt-page-delay300';
            break;
          case 22:
            this.outClass = 'pt-page-scaleDownUp';
            this.inClass = 'pt-page-scaleUp pt-page-delay300';
            break;
          case 23:
            this.outClass = 'pt-page-moveToLeft pt-page-ontop';
            this.inClass = 'pt-page-scaleUp';
            break;
          case 24:
            this.outClass = 'pt-page-moveToRight pt-page-ontop';
            this.inClass = 'pt-page-scaleUp';
            break;
          case 25:
            this.outClass = 'pt-page-moveToTop pt-page-ontop';
            this.inClass = 'pt-page-scaleUp';
            break;
          case 26:
            this.outClass = 'pt-page-moveToBottom pt-page-ontop';
            this.inClass = 'pt-page-scaleUp';
            break;
          case 27:
            this.outClass = 'pt-page-scaleDownCenter';
            this.inClass = 'pt-page-scaleUpCenter pt-page-delay400';
            break;
          case 28:
            this.outClass = 'pt-page-rotateRightSideFirst';
            this.inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
            break;
          case 29:
            this.outClass = 'pt-page-rotateLeftSideFirst';
            this.inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
            break;
          case 30:
            this.outClass = 'pt-page-rotateTopSideFirst';
            this.inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
            break;
          case 31:
            this.outClass = 'pt-page-rotateBottomSideFirst';
            this.inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
            break;
          case 32:
            this.outClass = 'pt-page-flipOutRight';
            this.inClass = 'pt-page-flipInLeft pt-page-delay500';
            break;
          case 33:
            this.outClass = 'pt-page-flipOutLeft';
            this.inClass = 'pt-page-flipInRight pt-page-delay500';
            break;
          case 34:
            this.outClass = 'pt-page-flipOutTop';
            this.inClass = 'pt-page-flipInBottom pt-page-delay500';
            break;
          case 35:
            this.outClass = 'pt-page-flipOutBottom';
            this.inClass = 'pt-page-flipInTop pt-page-delay500';
            break;
          case 36:
            this.outClass = 'pt-page-rotateFall pt-page-ontop';
            this.inClass = 'pt-page-scaleUp';
            break;
          case 37:
            this.outClass = 'pt-page-rotateOutNewspaper';
            this.inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
            break;
          case 38:
            this.outClass = 'pt-page-rotatePushLeft';
            this.inClass = 'pt-page-moveFromRight';
            break;
          case 39:
            this.outClass = 'pt-page-rotatePushRight';
            this.inClass = 'pt-page-moveFromLeft';
            break;
          case 40:
            this.outClass = 'pt-page-rotatePushTop';
            this.inClass = 'pt-page-moveFromBottom';
            break;
          case 41:
            this.outClass = 'pt-page-rotatePushBottom';
            this.inClass = 'pt-page-moveFromTop';
            break;
          case 42:
            this.outClass = 'pt-page-rotatePushLeft';
            this.inClass = 'pt-page-rotatePullRight pt-page-delay180';
            break;
          case 43:
            this.outClass = 'pt-page-rotatePushRight';
            this.inClass = 'pt-page-rotatePullLeft pt-page-delay180';
            break;
          case 44:
            this.outClass = 'pt-page-rotatePushTop';
            this.inClass = 'pt-page-rotatePullBottom pt-page-delay180';
            break;
          case 45:
            this.outClass = 'pt-page-rotatePushBottom';
            this.inClass = 'pt-page-rotatePullTop pt-page-delay180';
            break;
          case 46:
            this.outClass = 'pt-page-rotateFoldLeft';
            this.inClass = 'pt-page-moveFromRightFade';
            break;
          case 47:
            this.outClass = 'pt-page-rotateFoldRight';
            this.inClass = 'pt-page-moveFromLeftFade';
            break;
          case 48:
            this.outClass = 'pt-page-rotateFoldTop';
            this.inClass = 'pt-page-moveFromBottomFade';
            break;
          case 49:
            this.outClass = 'pt-page-rotateFoldBottom';
            this.inClass = 'pt-page-moveFromTopFade';
            break;
          case 50:
            this.outClass = 'pt-page-moveToRightFade';
            this.inClass = 'pt-page-rotateUnfoldLeft';
            break;
          case 51:
            this.outClass = 'pt-page-moveToLeftFade';
            this.inClass = 'pt-page-rotateUnfoldRight';
            break;
          case 52:
            this.outClass = 'pt-page-moveToBottomFade';
            this.inClass = 'pt-page-rotateUnfoldTop';
            break;
          case 53:
            this.outClass = 'pt-page-moveToTopFade';
            this.inClass = 'pt-page-rotateUnfoldBottom';
            break;
          case 54:
            this.outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
            this.inClass = 'pt-page-rotateRoomLeftIn';
            break;
          case 55:
            this.outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
            this.inClass = 'pt-page-rotateRoomRightIn';
            break;
          case 56:
            this.outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
            this.inClass = 'pt-page-rotateRoomTopIn';
            break;
          case 57:
            this.outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
            this.inClass = 'pt-page-rotateRoomBottomIn';
            break;
          case 58:
            this.outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
            this.inClass = 'pt-page-rotateCubeLeftIn';
            break;
          case 59:
            this.outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
            this.inClass = 'pt-page-rotateCubeRightIn';
            break;
          case 60:
            this.outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
            this.inClass = 'pt-page-rotateCubeTopIn';
            break;
          case 61:
            this.outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
            this.inClass = 'pt-page-rotateCubeBottomIn';
            break;
          case 62:
            this.outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
            this.inClass = 'pt-page-rotateCarouselLeftIn';
            break;
          case 63:
            this.outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
            this.inClass = 'pt-page-rotateCarouselRightIn';
            break;
          case 64:
            this.outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
            this.inClass = 'pt-page-rotateCarouselTopIn';
            break;
          case 65:
            this.outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
            this.inClass = 'pt-page-rotateCarouselBottomIn';
            break;
          case 66:
            this.outClass = 'pt-page-rotateSidesOut';
            this.inClass = 'pt-page-rotateSidesIn pt-page-delay200';
            break;
          case 67:
            this.outClass = 'pt-page-rotateSlideOut';
            this.inClass = 'pt-page-rotateSlideIn';
            break;

        }
      }
    },
  }
  ;
</script>

<style lang="scss" scoped>
  .pt-perspective {
    position: relative;
    width: 100%;
    height: 300px;
    perspective: 1200px;
    overflow: hidden;
  }

  .pt-page {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /*visibility: hidden;*/
    overflow: hidden;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
  }

  .pt-page-current,
  .no-js .pt-page {
    visibility: visible;
    z-index: 1;
  }

  .pt-page-ontop {
    z-index: 999;
  }

  /* Text Styles, Colors, Backgrounds */

  .pt-page h1 {
    position: absolute;
    font-weight: 300;
    font-size: 4.4em;
    line-height: 1;
    letter-spacing: 6px;
    margin: 0;
    top: 32%;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    word-spacing: -0.3em;
    color: #ffffff;
  }

  .pt-page h1 span {
    font-family: 'Satisfy', serif;
    font-weight: 400;
    font-size: 40%;
    text-transform: none;
    word-spacing: 0;
    letter-spacing: 0;
    display: block;
    opacity: 0.4;
  }

  .pt-page h1 strong {
    color: rgba(0, 0, 0, 0.1);
  }

  .pt-page-1 {
    background: #0ac2d2;
  }

  .pt-page-2 {
    background: #7bb7fa;
  }

  .pt-page-3 {
    background: #60d7a9;
  }

  .pt-page-4 {
    background: #fdc162;
  }

  .pt-page-5 {
    background: #fd6a62;
  }

  .pt-page-6 {
    background: #f68dbb;
  }

  .el-row {
    margin-bottom: 12px;
  }

  .demonstration {
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>