export default {
  data() {
    return {
      isRefresh: false,
    };
  },

  computed: {
    balanceClass() {
      return this.isRefresh ? 'balance-animate' : '';
    }
  },

  methods: {
    async updateBalance(tips) {
      const start = moment.now();
      this.isRefresh = true;

      const [result, data] = await this.$store.dispatch(types.OAUTH);
      if (result && tips) {
        this.$toast('刷新成功');
      }
      _.delay(() => {
        this.isRefresh = false;
      }, _.clamp(1000 - (moment.now() - start), 0, 1000));
    }
  },
};
