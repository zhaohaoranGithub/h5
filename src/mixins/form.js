import resetForm from './reset-form';
import serviceCommand from './service-command';
import getCommand from './get-command';
import loading from './loading';
import formValidator from './form-validator';

/**
 * 表单加载数据和保存数据通用流程
 */
export default {
  mixins: [
    serviceCommand,
    resetForm,
    formValidator,
    getCommand,
    loading 
  ],

  methods: {
    bindSave(api, action, sendingData,
             {
               callback = this.$_defaultSendingCommandFunc,
               successMessage = '保存成功',
               beforeSend = (data) => data,
               afterSuccess = _.noop,
               afterFail = _.noop
             } = {}
    ) {
      this.bindCommand({
          type: 'save',
          api,
          sendingData,
          callback,
          beforeAction: beforeSend,
          action
        },
        {
          successMessage,
          afterSuccess,
          afterFail
        }
      );
    },

    doSave({action, form}) {
      if (form) {
        this.doAction({type: 'save', action, canExec: this.$_validateForms(form)});
      } else {
        
        this.doAction({type: 'save', action});
      }
    },

    $_defaultSendingCommandFunc([result, data],
                                {
                                  successMessage = '',
                                  errorMessage = data && data.message,
                                  afterSuccess,
                                  afterFail
                                }
    ) {
      if (result) {
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
  }
};
