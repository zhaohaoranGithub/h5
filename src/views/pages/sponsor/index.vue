<template>
    <div class="sponsor-wrapper">
        <main-sponsor></main-sponsor>
        <news-sponsor></news-sponsor>
        <season-sponsor></season-sponsor>
        <times-sponsor></times-sponsor>
    </div>
</template>

<script>
import mainSponsor from './main/index';
import newsSponsor from './news/index';
import seasonSponsor from './season/index';
import timesSponsor from './time/index';
export default {
  name: "sponsor",
  data() {
    return {
       
    };
  },

  mixins: [],

  components: {
      mainSponsor,
      newsSponsor,
      seasonSponsor,
      timesSponsor
  },
  
};
</script>

<style lang="scss" scoped>

</style>
