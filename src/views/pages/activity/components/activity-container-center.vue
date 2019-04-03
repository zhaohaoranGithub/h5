<template>
  <div class="activity-container-center">

    <slot name='title'></slot>

    <div class="activity-container-center__wraper">
      <slot name='table'></slot>
    </div>
    <slot name='cell'></slot>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
$--font-family: "PingFangSC-Semibold";
$--font-family-rl: "PingFangSC-Regular";
$--font-color: #ffffff;
$--table-body-bg: #3a652d;
$--table-thead-bg: #475f29;
$--font-size-normal: 14px;
$--font-size-small: 12px;
$--font-weight-400: 400;
$--font-weight-600: 600;
@include b(activity-container-center) {
  width: 100%;
  @include e(title) {
    font-size: 14px;
    font-family: $--font-family;
    color: $--font-color;
    margin: 15px 0;
    font-weight: 600;
    @include when(center){
      text-align: center;
    }
  }
  @include e(wraper) {
    position: relative;
  }
  @include b(activity-container-center-cell) {
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
    @include m(tiger) {
      @include e(head) {
        background: #334055;
      }
      @include e(body) {
        background: #0a1638;
        padding: 12px 0px 12px 4px;
      }
    }
    @include m(immortal) {
      @include e(head) {
        background: #7a1ab7;
      }
      @include e(body) {
        background: #6b1e9c;
        padding: 22px 0px 20px 10px;
      }
    }
    @include e(head) {
      padding: 8px 0;
      padding-left: 10px;
      background: $--table-thead-bg;
      font-size: $--font-size-small;
      font-weight: $--font-weight-400;
      color: $--font-color;
    }
    @include e(body) {
      padding: 7px 0px 20px 10px;
      background: $--table-body-bg;
      display: flex;
      justify-content: space-between;
      width: 100%;
      @include b(center-cell-body-inner) {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        // height: 30px;
        border-right: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0 5px;
        text-align: center;
        &:last-child {
          border: none;
        }
        @include e(title) {
          font-size: $--font-size-normal;
          font-weight: $--font-weight-600;
          color: $--font-color;
          font-family: $--font-family;
          @include m(button) {
            background: $--font-color;
            width: 62px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 4px;
            color: #475f29;
          }
        }
        @include e(brief) {
          font-size: $--font-size-small;
          font-weight: $--font-weight-400;
          color: $--font-color;
          font-family: $--font-family-rl;
          word-break: break-all;
        }
        &:last-child {
          @include e(title) {
            font-weight: $--font-weight-400;
            font-family: $--font-family-rl;
          }
        }
      }
    }
  }
  @include b(activity-container-center-text) {
    padding: 0px 0px 42px 28px;
    background: rgba(122, 0, 238, 1);
    box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    @include e(ul) {
      margin: 0;
      padding: 0;
      list-style: none;
      padding-top: 30px;
      li {
        font-size: 16px;

        color: $--font-color;
        font-family: $--font-family;
        height: 32px;
        line-height: 32px;
      }
    }
  }
  @include b(activity-container-center-table) {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    table-layout: fixed;
    margin-bottom: 10px;
  
    th,
    td {
      font-weight: normal;
      color: $--font-color;
      font-size: 12px;
      font-family: $--font-family;
      padding: 12px 0;
      text-align: center;
      &:last-child {
        border: none;
      }
      font-weight: 600;
    }
    @include m(border) {
      th,
      td {
        border-right: 1px solid rgba(255, 255, 255, 0.1);
      }
    }

    @include m(green) {
      thead {
        background: #475f29;
      }
      tbody {
        tr {
          background: #416a33;
          &:nth-child(odd) {
            background: #3a652d;
          }
          td {
            text-align: center;
          }
        }
      }
    }
    @include m(immortal) {
      thead {
        background: #7a1ab7;
      }
      tbody {
        tr {
          background: rgba(122, 26, 183, 0.5);
          &:nth-child(odd) {
            background: #6b1e9c;
          }
          td {
            text-align: center;
          }
        }
      }
    }
    @include m(tiger) {
      thead {
        background: #334055;
      }
      tbody {
        tr {
          background: #334055;
          &:nth-child(odd) {
            background: #0a1638;
          }
          td {
            text-align: center;
          }
        }
      }
    }
    @include m(platform) {
      thead {
        background: #0b3c86;
      }
      tbody {
        tr {
          background: #2e5897;
          &:nth-child(odd) {
            background: #235092;
          }
          td {
            text-align: center;
          }
        }
      }
    }
    @include m(survival) {
      thead {
        background: rgba(54, 35, 24, 1);

      }
      tbody {
        tr {
          background: #653f2a;

          td {
            text-align: center;
          }
        }
      }
    }
    @include m(sport-recharge) {
      width: 95%;
      margin: 20px auto;
      margin-bottom: 0;
      padding: 0 8px 15px 8px;
       @include utils-bg(url("../sport-recharge/img/table-bg-1.png") no-repeat bottom, 100% 100%);
      thead {
        background: #020518;

      }
      tbody {
        tr {
          background: #9da9c0;
           &:nth-child(odd) {
             background: transparent;
          }

          td {
            text-align: center;
            color: $--color-black;
          }
        }
      }
    }
    @include m(sport-recharge-detail) {
      width: 95%;
      margin: -10px auto;
      margin-bottom: 0;
      margin-bottom: 0;
      padding: 0 8px 80px 8px;
      height: 170px;
      @include utils-bg(url("../sport-recharge/img/table-bg-1.png") no-repeat bottom,  100% 100%);
      thead {
        background: #020518;
      }
      tbody {
        tr {
          td {
            text-align: center;
            color: $--color-black;
            font-size: 10px;
          }
        }
      }
    }
  }
  @include b(table-cell) {
    font-size: $--font-size-normal;
    font-weight: $--font-weight-400;
    color: $--font-color;
    font-family: $--font-family;
    background: #e8e4a9;
    display: inline-block;
    padding: 1px 17px;
    border-radius: 4px;
    color: #000000;
    @include m(tiger) {
      background: white;
    }
    @include m(immortal) {
      color: #6b1e9c;
      background: white;
    }
  }
}
</style>

