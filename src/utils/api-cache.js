import md5 from 'blueimp-md5';
import lscache from 'lscache';

class ApiCache {
  /**
   * 普通缓存 - 取到了缓存数据则不取远程数据
   * @type {string}
   */
  static Normal = 'Normal';

  /**
   * 轮替缓存 - 取到了缓存数据仍然取远程数据
   * 轮替缓存的两种方式
   * 1.直接替换，并取接口新数据
   * 2.根据formatter方法进行合并
   * @type {string}
   */
  static Alternating = 'Alternating';

  constructor(oldFun, {api, props, binding}, context) {
    this.oldFun = oldFun;
    this.api = api;
    this.props = props;
    this.binding = binding;
    this.context = context;

    this.cache = binding.cache;

    this.formatter = _.get(this.cache, 'formatter', (data) => data);

    this.key = md5(JSON.stringify({api, props}));

    this.preResponse = lscache.get(this.key);
  }

  async callOld() {
    return await this.oldFun.apply(this, [{api: this.api, props: this.props}, this.binding]);
  }

  async goThrough() {
    const repo = await this.callOld();
    this.binding.callback(repo, this.binding);

    return repo;
  }

  /**
   * 取到缓存返回缓存 没有取到 取数据
   * @returns {Promise<*>}
   */
  async handleNormal() {
    let repo = this.preResponse;

    if (repo == null) {
      const repo = await this.callOld();

      lscache.set(this.key, repo, _.result(this.cache, 'time', 60 * 24));
    }

    return repo;
  }

  /**
   * 取到缓存返回缓存 并取数据
   * @returns {Promise<*>}
   */
  async handleAlternating() {
    let repo = this.preResponse;

    //存在缓存，先展示缓存
    if (repo) {
      this.binding.callback(repo, this.binding);
    }

    //取新数据
    let newRepo = this.goThrough()
      .then(([result, data]) => {
        this.binding.callback([result, this.formatter(data, _.get(repo, '1'))], this.binding);
      });

    //有旧数据 返回旧数据结束loading状态
    //没有则返回新的promise
    if (repo) {
      return repo;
    } else {
      return newRepo;
    }
  }
}

/**
 * api缓存处理
 * @param target
 * @param name
 * @param descriptor
 * @returns {*}
 */
function apiCacheHandler(target, name, descriptor) {
  const oldFun = descriptor.value;

  descriptor.value = async function({api, props}, binding) {
    let cache;

    cache = new ApiCache(oldFun, {api, props, binding}, this);

    if (binding.cache === true) {

      binding.cache = {
        type: ApiCache.Normal
      };
    }
    if (binding.cache) {
      switch (binding.cache.type) {
        case ApiCache.Normal:
          return cache.handleNormal();
        case ApiCache.Alternating:
          return cache.handleAlternating();
      }
    } else {
      return cache.goThrough();
    }
  };

  return descriptor;
}

export default ApiCache;
export {
  apiCacheHandler
};