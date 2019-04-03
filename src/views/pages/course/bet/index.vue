<template>
    <div class="sports-wrapper">
        <first-step></first-step>
        <second-step></second-step>
        <third-step></third-step>
        <four-step></four-step>
        <five-step></five-step>
    </div>
</template>

<script>
import firstStep from './first/index';

import secondStep from './second/index';

import thirdStep from './third/index';

import fourStep from './fourth/index';

import fiveStep from './fifth/index';
export default {
  name: "sports-course",
  components:{
      
      firstStep,
      secondStep,
      thirdStep,
      fourStep,
      fiveStep

  }
  
};
</script>

<style lang="scss" scoped>
@include b(sports-wrapper) {
  background: white;
}
</style>

