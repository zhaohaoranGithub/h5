<template>
    <transition name="el-message-fade">
        <div class="alert-container">
            <div class="alert-container__bg">
                <div class="bg-close" @click="closeReadPack"></div>
                <div class="bg-text" v-html="text"></div>
                <div class="bg-subText">{{subText}}</div>
                <div class="bg-button">
                    <div class="bg-button-cancle" @click="cancleClick" v-if="cancleBtn" >{{cancleBtn}}</div>
                    <div class="bg-button-confirm" @click="confirmClick" v-if="confirmBtn" >{{confirmBtn}}</div>
                </div>
            </div>
            <div class="alert-container__zoom"></div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "redPacket-alert",
    props: {
      text: {
        type: String,
      },
      subText: {
        type: String,
      },
      cancleBtn: {
        type: String,
      },
      confirmBtn: {
        type: String,
      }
    },
    data() {
      return {};
    },
    methods: {
      closeReadPack(){
        this.$emit('closeReadPack');
      },
      cancleClick() {
        this.$emit('cancleClick');
      },
      confirmClick() {
        this.$emit('confirmClick');
      }
    },
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
    @include b(alert-container) {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 500;
        display: flex;
        @include e(bg) {
            width: 258px;
            height: 292px;
            position: absolute;
            @include utils-bg(url("./bg.png") no-repeat top, cover);
            z-index: 1000;
            margin-left: -129px;
            margin-top: (-196px);
            top: 50%;
            left: 50%;
            .bg-close {
                cursor: pointer;
                width: 25px;
                height: 25px;
                position: absolute;
                right: 16px;
            }
            .bg-text {
                font-size: 16px;
                position: relative;
                top: 90px;
                width: 194px;
                margin: 0 auto;
                text-align: center;
            }
            .bg-subText {
              font-size: 15px;
              position: relative;
              top: 94px;
              width: 194px;
              margin: 0 auto;
              text-align: center;
            }
            .bg-button {
                position: relative;
                top: 126px;
                width: 194px;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                .bg-button-cancle {
                    cursor: pointer;
                    font-size: 12px;
                    width: 68px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 23px;
                    color: #b32a32;
                    border: 1px solid #b32a32;
                    border-radius: 5px;
                    margin-right: 25px;
                }
                .bg-button-confirm {
                    cursor: pointer;
                    font-size: 12px;
                    width: 68px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 23px;
                    color: white;
                    background-color: #b32a32;
                    border: 1px solid #b32a32;
                    border-radius: 5px;
                }
            }
        }
        @include e(zoom) {
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: 0.5;
            background: #000;
        }
    }
</style>
