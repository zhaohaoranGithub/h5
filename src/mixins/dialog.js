export default {
  data() {
    return {
      dialogTitle: '',
      dialogName: '',
      dialogProps: {},
    };
  },

  provide() {
    return {
      setDialogHeader: this.setDialogHeader
    };
  },

  computed: {
    dialogVisible: {
      get() {
        return !_.isEmpty(this.dialogName) || !_.isEmpty(this.dialogProps);
      },
      set(current) {
        if (!current) {
          this.dialogProps = {};
          this.dialogName = '';
        }
      }
    }
  },

  methods: {
    setDialogHeader(dialogTitle) {
      this.dialogTitle = dialogTitle;
    },
    submitFinished() {
      this.dialogName = '';
      if (this.doGet) {
        this.doGet({action: 'getGrid'});
      }
    },

    openDialog({props = {}, dialogName}) {
      this.dialogProps = props;
      this.dialogName = dialogName;
    },
    closeDialog() {
      this.dialogVisible = false;
    }
  }

};
