/**
 * 重置表单，通常用于退出modal之前
 */
export default {
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
