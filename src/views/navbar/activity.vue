<template>
  <div class="nav-sports">
    <div class="nav-sports-con">
      <div class="nav-active-item" v-for="(item,index) in itemList" :key="index" @click="goActivity(item.id)">
        <div class="nav-active-item__img">
          <img :src="item.imgUrl" alt="">
        </div>
        <div class="nav-active-item__title">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "nav-sports",

    components: {

    },
    data() {
      return {
        itemList:[
          {
            imgUrl:require('./misc/1.png'),
            name:'全部活动',
            id:-1
          }, {
            imgUrl:require('./misc/2.png'),
            name:'真人优惠',
            id:1
          }, {
            imgUrl:require('./misc/3.png'),
            name:'体育优惠',
            id:2
          }, {
            imgUrl:require('./misc/4.png'),
            name:'彩票优惠',
            id:0
          }, {
            imgUrl:require('./misc/5.png'),
            name:'电子游戏优惠',
            id:3
          }, {
            imgUrl:require('./misc/6.png'),
            name:'返水优惠',
            id:101
          },
        ]
      };
    },
    methods:{
      goActivity(id){
        this.$router.push({
          name:'activity',
          params:{
            'act':id
          }
        })
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import './nav';
</style>

