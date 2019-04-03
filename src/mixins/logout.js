export default {
  methods: {
    logout() {
      this.$store.dispatch(types.LOGOUT);
    }
  }
};