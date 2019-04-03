import serviceCommand from './service-command';
import loading from './loading';
import formValidator from './form-validator';

export default {

  mixins: [
    serviceCommand,
    formValidator,
    loading
  ],

  methods: {
    getAll({globalLoading = true} = {}) {
      if (globalLoading) {
        this.startLoading();
      } else if (!_.isUndefined(this.loading)) {
        this.loading = true;
      }
      const bindings = this.getBindings({type: 'get'});

      this.$_execCommand(bindings).finally(() => {
        if (globalLoading) {
          this.closeLoading();
        } else if (!_.isUndefined(this.loading)) {
          this.loading = false;
        }
      });
    },

    doGet({action, form}) {
      if (form) {
        this.doAction({type: 'get', action, canExec: this.$_validateForms(form)});
      } else {
        this.doAction({type: 'get', action});
      }
    },


    bindGet(api, bindingData,
            {
              callback = this.$_defaultGetCommandFunc,
              format = (data) => data,
              transferFormat = false,
              successMessage = '',
              polling = false,
              sendingData = {},
              cache = false,
              beforeSend = (data) => data,
              action = api.name,
              afterSuccess = _.noop,
              afterFail = _.noop
            } = {}
    ) {
      this.bindCommand({
          type: 'get',
          api,
          bindingData,
          sendingData,
          polling,
          cache,
          beforeAction: beforeSend,
          callback,
          action,
        },
        {
          successMessage,
          afterSuccess,
          afterFail,
          transferFormat,
          format
        }
      );
    },

    $_defaultGetCommandFunc([result, data],
                            {
                              bindingData,
                              successMessage = '',
                              errorMessage = data && data.message,
                              afterSuccess,
                              afterFail,
                              transferFormat,
                              format
                            }
    ) {
      if (result) {
        if (transferFormat) {
          data.list = data.list[0];
        }
        this[bindingData] = format(data);

        if (successMessage) {
          
         
          this.$toast.success(successMessage);
        }

        if (afterSuccess) {
          afterSuccess([result, data]);
        }
      } else {
        if (afterFail ===  _.noop) {

          this.$toast.fail(errorMessage);
        } else {
          afterFail([result, data]);
        }
      }
    },
  },
};
