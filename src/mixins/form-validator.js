export default {
  methods: {
    $_validateForms(forms) {
      if (_.isArray(forms)) {
        return _.map(forms, form => this.$_validateForm(form));
      } else {
        return [this.$_validateForm(forms)];
      }
    },

    async $_validateForm(form) {
      if (_.isString(form)) {
        return this.$refs[form].validate();
      } else if (_.isObject(form)) {
        //brief 在有验证滚动的情况下暂时只能采取验证两次的方式，一次用于滚动 一次用于返回promise。
        //原因是第三方库底层两种情况返回不一致导致
        if (form.scrollToError) {
          this.$_validate(form);
        }
        return this.$refs[form.name].validate();
      }
    },

    $_validate({name}) {
      return this.$refs[name].validate((result, fields) => {
        if (!result) {
          const errorProp = fields[Object.keys(fields)[0]][0].field;

          const errorField = _.find(this.$refs[name].$children, {prop: errorProp});
          Velocity(errorField.$el, 'scroll', {
            offset: 0,
            mobileHA: false
          });
        }
      });
    }
  },
};