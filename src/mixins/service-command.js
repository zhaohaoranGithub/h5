import axios from 'axios';
import {apiCacheHandler} from '@/utils/api-cache';

export default {

  data() {
    return {
      $_commands: [],
      $_pollingTimerList: [],
    };
  },


  methods: {
    bindCommand({
                  api,
                  bindingData,
                  sendingData,
                  callback,
                  commandType,
                  cache = false,
                  polling = false,
                  type,
                  beforeAction = (data) => data,
                  action = api.name,
                }, restOps) {
      this.$data.$_commands.push({
        type,
        api,
        bindingData,
        sendingData,
        beforeAction,
        cache,
        polling,
        action,
        callback,
        ...restOps
      });
    },

    doAction({type, action, canExec = [Promise.resolve(true)]}) {
      const bindings = this.getBindings({type, action});

      if (!_.isEmpty(bindings)) {
        this.$_execCommand(bindings, canExec);
      } else {
        throw new Error(`没有找到对应的action:${action}, type:${type}`);
      }
    },

    getBindings(params) {
      return _.filter(this.$data.$_commands, params);
    },

    async $_execCommand(bindings, canExec = [Promise.resolve(true)]) {
      try {
        if (await Promise.all(canExec)) {
          //todo 移出
          if (!_.isUndefined(this.loading)) this.loading = true;

          const execPromises = _.map(bindings, (binding) => {

            if (binding.polling) {
              this.$data.$_pollingTimerList.push(setInterval(() => {
                this.handleRequest(binding);
              }, binding.polling));
            }

            return this.handleRequest(binding);
          });
 
          return Promise.all(execPromises).finally(() => {
            //todo 移出
            if (!_.isUndefined(this.loading)) this.loading = false;
          });
        }
      } catch (e) {
        return Promise.resolve(true);
      }
    },

    handleRequest(binding) {
      //目前只处理api形式的缓存 不处理dispatch
      if (_.isString(binding.api)) {
        return this.$store.dispatch(binding.api, binding.beforeAction(this.$_getProps(binding.sendingData)))
          .then((repo) => {
            binding.callback(repo, binding);
          });
      } else {
        return this.handleApiRequest(
          {
            api: binding.api,
            props: binding.beforeAction(this.$_getProps(binding.sendingData))
          },
          binding
        );
      }
    },

    /**
     * 处理普通api请求
     * 
     */
    @apiCacheHandler
    handleApiRequest({api, props}, binding) {
      return api(props);
    },


    $_getProps(props) {
      if (_.isObject(props)) {
        return props;
      } else if (_.isString(props)) {
        return _.result(this, props);
      } else {
        return undefined;
      }
    },
  },

  beforeDestroy() {
    _.each(this.$data.$_pollingTimerList, clearInterval);
  }
};
