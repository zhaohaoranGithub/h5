import Cookies from 'js-cookie';
import Fingerprint from "@/vendor/scripts/fingerprint";

const PROJECT_VERSION = require('../../package.json').version;
const DEVICE_ID = new Fingerprint().get();

export function isLogin() {
  const {
    token,
    uid,
    os_type
  } = getLogin();

  return token && uid;
}

export function getLogin() {
  // let userInfo = localStorage.getItem(consts.CACHE_USER_INFO);
  // if (userInfo) {
  //   userInfo = JSON.parse(userInfo);
  // }

  return {
    token: Cookies.get(consts.CACHE_TOKEN, {
      domain: _.getFirstLevelDomain({
        change: false
      })
    }),
    uid: Cookies.get(consts.CACHE_UID, {
      domain: _.getFirstLevelDomain({
        change: false
      })
    }),
    os_type: Cookies.get(consts.CACHE_OS_TYPE, {
      domain: _.getFirstLevelDomain({
        change: false
      })
    }) || 1,
    username: Cookies.get(consts.CACHE_USERNAME, {
      domain: _.getFirstLevelDomain({
        change: false
      })
    }),
    telephone: Cookies.get(consts.CACHE_TELEPHONE, {
      domain: _.getFirstLevelDomain({
        change: false
      })
    }),
    device_id: Cookies.get(consts.CACHE_DEVICE_ID,{
      domain: _.getFirstLevelDomain({
        change: false
      })
    }) || DEVICE_ID,
    version: Cookies.get(consts.CACHE_VERSION,{
      domain: _.getFirstLevelDomain({
        change: false
      })
    }) || PROJECT_VERSION,
  };
}

export function remPassWord(data) {
  localStorage.setItem('rempassWord', JSON.stringify(data));
}
export function removeRemPassWord() {
  localStorage.removeItem('rempassWord');
}



export function setLogin(data) {
  Cookies.set(consts.CACHE_TOKEN, data.token, {
    expires: moment().add(30, 'm').toDate(),
    domain: _.getFirstLevelDomain({
      change: false
    })
  });

  Cookies.set(consts.CACHE_UID, data.uid ? data.uid : data.id, {
    expires: moment().add(30, 'm').toDate(),
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
  if (data.os_type) {
    Cookies.set(consts.CACHE_OS_TYPE, data.os_type, {
      expires: moment().add(30, 'm').toDate(),
      domain: _.getFirstLevelDomain({
        change: false
      })
    });
  }
  Cookies.set(consts.CACHE_USERNAME, data.username, {
    expires: moment().add(30, 'm').toDate(),
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
  Cookies.set(consts.CACHE_TELEPHONE, data.telephone, {
    expires: moment().add(30, 'm').toDate(),
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
}

export function logout() {
  Cookies.remove(consts.CACHE_TOKEN);
  Cookies.remove(consts.CACHE_UID);
  Cookies.remove(consts.CACHE_OS_TYPE);
  Cookies.remove(consts.CACHE_USERNAME);
  Cookies.remove(consts.CACHE_TELEPHONE);

  Cookies.remove(consts.CACHE_TOKEN, {
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
  Cookies.remove(consts.CACHE_UID, {
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
  Cookies.remove(consts.CACHE_OS_TYPE, {
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
  Cookies.remove(consts.CACHE_USERNAME, {
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
  Cookies.remove(consts.CACHE_TELEPHONE, {
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
  Cookies.remove(consts.CACHE_DEVICE_ID,{
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
  Cookies.remove(consts.CACHE_VERSION,{
    domain: _.getFirstLevelDomain({
      change: false
    })
  });
}




//app 调用方法


function _checkArgument(arg) {
  return !_.isUndefined(arg) && !_.isNull(arg) && arg != '' && arg != 'undefined';
}

/**
 * os_type : 0-pc, 1-h5, 2-android, 3-ios
 * @returns {boolean}
 */
export function isApp() {
  const {
    token,
    uid,
    os_type,
    device_id,
    version
  } = getLogin();

  return token && uid && os_type && device_id && version && (os_type==2 || os_type==3)  ? true : false;
}
export function appSetLogin(data) {
  logout();
  if (_checkArgument(data.token)) {
    Cookies.set(consts.CACHE_TOKEN, data.token, {
      domain: _.getFirstLevelDomain({
        change: false
      }),
      expires: moment().add(30, 'm').toDate(),
    });
  } else {
    Cookies.remove(consts.CACHE_TOKEN,{
      domain: _.getFirstLevelDomain({
        change: false
      })
    });
  }
  if (_checkArgument(data.uid)) {
    Cookies.set(consts.CACHE_UID, data.uid, {
      domain: _.getFirstLevelDomain({
        change: false
      }),
      expires: moment().add(30, 'm').toDate(),
    });
  } else {
    Cookies.remove(consts.CACHE_UID,{
      domain: _.getFirstLevelDomain({
        change: false
      })
    });
  }
  if (_checkArgument(data.os_type)) {
    Cookies.set(consts.CACHE_OS_TYPE, data.os_type, {
      domain: _.getFirstLevelDomain({
        change: false
      }),
      expires: moment().add(30, 'm').toDate(),
    });
  } else {
    Cookies.remove(consts.CACHE_OS_TYPE,{
      domain: _.getFirstLevelDomain({
        change: false
      })
    });
  }
  if (_checkArgument(data.device_id)) {
    Cookies.set(consts.CACHE_DEVICE_ID, data.device_id=DEVICE_ID, {
      domain: _.getFirstLevelDomain({
        change: false
      }),
      expires: moment().add(30, 'm').toDate(),
    });
  } else {
    Cookies.remove(consts.CACHE_DEVICE_ID,{
      domain: _.getFirstLevelDomain({
        change: false
      })
    });
  }
  if (_checkArgument(data.version)) {
    Cookies.set(consts.CACHE_VERSION, data.version=PROJECT_VERSION, {
      domain: _.getFirstLevelDomain({
        change: false
      }),
      expires: moment().add(30, 'm').toDate(),
    });
  } else {
    Cookies.remove(consts.CACHE_VERSION,{
      domain: _.getFirstLevelDomain({
        change: false
      })
    });
  }
}

export function checkUrlIsNoNeedCheckLogin() {
  let relativePath = _.getUrlRelativePath();
  let routes = window.$router.options.routes;
  return _.find(routes, (item) => {
    let path = item.path;
    let noNeedCheckLogin = item.meta && item.meta.noNeedCheckLogin;
    return relativePath.indexOf(path) > -1 && noNeedCheckLogin;
  });
}
