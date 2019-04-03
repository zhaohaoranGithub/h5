export default {
  data() {
    return {
      size: 125,
      // 背景透明度，默认透明 0
      backgroundAlpha: 1,
    };
  },

  methods: {
    getDownloadCode(type = 'pc') {
      let url = 'm.' + _.getFirstLevelDomain() + (type === 'pc' ? '/introduce-cashnet' : '/introduce-sports');
      return url;
    }
  }
};