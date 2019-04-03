import Toast from 'vant/toast';

export default {

  data() {
    return {
      loading: false
    };
  },

  methods: {
    startLoading() {

      this.$nextTick(() => {
        this.loading = true;
          Toast.loading({
            mask: true,
            message: '',
            duration: 3000,
            forbidClick: true,
            loadingType: 'global'
          });

      });
    },

    closeLoading() {
      this.loading = false;
      this.$nextTick(() => {
        setTimeout(() => {
             Toast.clear();
        }, 300);
       
      });
    }
  }

};
