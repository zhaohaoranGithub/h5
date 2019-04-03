export default {

  computed: {
    ...mapGetters([
      'isLogin'
    ]),
  },

  methods: {
    toggleCharge(type = 'recharge') {
      if (this.isLogin) {
        this.$store.commit(types.CHANGE_ACTIVE_TAB, type);
        this.$store.commit(types.TOGGLE_CTRL, true);
      } else {
        // this.$message('请先登录');
        this.$router.push({
          name: 'login'
        });
      }
    },
    closeCharge() {
      this.$store.commit(types.TOGGLE_CTRL, false);
    }
  }
};
