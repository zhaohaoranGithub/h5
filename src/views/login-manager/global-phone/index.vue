<template>
  <div class="global-phone-main">
    <div class="global-phone-main__item" ref="listView">
      <ul>
        <li v-for="group in phoneList" class="list-group" ref="listGroup">
          <div class="list-group-title">{{ group.title }}</div>
          <div class="list-group-item">
            <div @click="chose(subItem.tel)" v-for="subItem in group.items">{{subItem.name}}({{subItem.en}})+{{subItem.tel}}</div>
          </div>
        </li>
      </ul>
      <!--<div class="list-shortcut">-->
        <!--<ul>-->
          <!--<li v-for="(item, index) in shortcutList"-->
              <!--class="item"-->
              <!--:data-index="index"-->
              <!--:key="item.id"-->
              <!--@touchstart="onShortcutStart"-->
              <!--@touchmove.stop.prevent="onShortcutMove"-->
          <!--&gt;-->
            <!--{{ item }}-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import phoneList from './global-phone';
  import BScroll from 'better-scroll';
  export default {
    name: "index",
    data() {
      return {
        phoneList: [],
        scrollY: 0,
        currentIndex: 0
      };
    },
    computed: {
      shortcutList () {
        return this.phoneList.map((group) => {
          return group.title.substr(0, 1);
        });
      }
    },
    watch: {
      scrollY (newVal) {
        if (newVal > 0) {
          this.currentIndex = 0;
          return;
        }

        for (let i = 0; i < this.listHeight.length - 1; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (-newVal >= height1 && -newVal < height2) {
            this.currentIndex = i;
            return;
          }
        }

        this.currentIndex = this.listHeight.length - 2;
      }
    },
    methods: {
      chose(id) {
        this.$store.commit(types.SET_TELAREA, `+${id}`);
        this.$router.go(-1);
      },
      _initSrcoll () {
        this.scroll = new BScroll(this.$refs.listView, {
          probeType: 3,
          click: true
        });
        this.scroll.on('scroll', (pos) => {
          this.scrollY = pos.y;
        });
      },
      onShortcutStart (e) {
        let index = e.target.getAttribute('data-index');
        this.scrollToElement(index);
        let firstTouch = e.touches[0].pageY;
        this.touch.y1 = firstTouch;
        this.touch.anchorIndex = index;
      },
      onShortcutMove (e) {
        let touchMove = e.touches[0].pageY;
        this.touch.y2 = touchMove;
        let delta = Math.floor((this.touch.y2 - this.touch.y1) / 16.7);
        let index = this.touch.anchorIndex * 1 + delta;
        this.scrollToElement(index);
      },
      scrollToElement (index) {
        if (index < 0) {
          return;
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2;
        }
        this.scrollY = -this.listHeight[index];
        this.scroll.scrollToElement(this.$refs.listGroup[index]);
      },
      _calculateHeight () {
        this.listHeight = [];
        const list = this.$refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    created () {
      this.phoneList = phoneList;
      this.touch = {};
      setTimeout(() => {
        this._initSrcoll();
        this._calculateHeight();
      }, 20);
    },
  };
</script>

<style lang="scss" scoped>
  @include b(global-phone-main) {
    position: fixed;
    width: 100%;
    height: 100%;
    @include e(item) {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .list-group {
        padding-bottom: 2px;
        .list-group-title {
          padding: 10px 20px;
          color: #7b7b7b;
          font-size: 12px;
          background: #f5f5f5;
        }
        .list-group-item {
          div {
            padding: 20px 0px;
            margin: 0px 20px;
            border-bottom: 1px solid #f5f5f5;
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
      .list-shortcut {
        position: absolute;
        z-index: 30;
        right: 2px;
        top: 50%;
        transform: translateY(-55%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        .item {
          padding: 3px;
          line-height: 1;
          color: #1E5ADC;
          font-size: 11px;
          &.current {
            color: black;
          }
        }
      }
    }
  }
</style>
