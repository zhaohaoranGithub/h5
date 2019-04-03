<template>
  <div class="main-container-content" :class="[{
    'normal-mt':isMt,
    'normal-mb':isMb,
  }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "main-container-content",
  props: {
    isMt: {
      default: false,
      type: Boolean
    },
    isMb: {
      default: false,
      type: Boolean
    }
  }
};
</script>


<style lang="scss" scoped>
$--table-color: #000000;
$--table-thead-font-family: "PingFangSC-Semibold";
$--table-tbody-font-family: "PingFangSC-Regular";
$-font--size: 14px;
$-font--family: "PingFangSC-Regular";
$-font--color: #999999;
$-line--height: 22px;
$-margin-bottom--noraml: 30px;
.main-container-content {
  font-size: $-font--size;
  font-family: $-font--family;
  line-height: $-line--height;
  color: $-font--color;
  word-break: break-all;
  margin-top: 12px;
  &.normal-mt {
    margin-top: $-margin-bottom--noraml;
  }
  &.normal-mb {
    margin-bottom: $-margin-bottom--noraml;
  }
  .main-container-content__text {
    margin-bottom: 20px;
    &.normal-mb {
      margin-bottom: $-margin-bottom--noraml;
    }
    span{
        &.red{
          color: #E5142E;
        }
    }
  }
  .main-container-content__brief {
    margin-bottom: 09px;
  }
  .main-container-content__ol {
    margin-left: 20px;

    li {
      list-style: decimal;
      line-height: $-line--height;
      margin-bottom: $-margin-bottom--noraml;
      .main-container-content__sub-ol {
        margin-left: 20px;
        li {
          list-style: lower-latin;
          margin-bottom: $-margin-bottom--noraml;
        }
      }
    }
  }
  .main-container-content__ul {
    li {
      margin-bottom: $-margin-bottom--noraml;
    }
  }
  .main-container-content-table__wrapper {
    margin-top: $-margin-bottom--noraml;
    margin-bottom: 10px;
    .main-container-content-table__inner{
      border-radius: 6px;
      border: 1px solid #dedede;
       margin-bottom: 12px;
      margin-top: 10px;
      overflow: hidden;
    }
    table {
      width: 100%;
      overflow: hidden;
      border-collapse: collapse;
     
      table-layout: fixed;
      thead {
        background: #fff;
        border-bottom: 1px solid #dedede;
      
      }
      th,
      td {
        font-weight: 600;
        color: $--table-color;
        font-family: $--table-tbody-font-family;
        padding: 8px 0;
        border-right: 1px solid rgba(255, 255, 255, 0.3);
      
      }
      tbody {
        tr {
          border-bottom: 1px solid #dedede;
          background: #fff;
          &:nth-child(odd) {
            background: #f5f6f7;
          }
          &:last-child{
            border:none;
          }
          td {
            text-align: center;
            &:not(:first-child) {
              font-weight: 400;
            }
         
          }
        }
      }
    }
  }
}
</style>
