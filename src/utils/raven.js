import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import {version} from '../../package.json';

if (process.env.NODE_ENV === 'production') {
  Raven
    .config('https://66d9413a9ab44032ad070fe882de1db7@sentry.aaawhu.com/16', {
      release: version,
      environment: process.env.ENVIRONMENT
    })
    .addPlugin(RavenVue, Vue)
    .install();
}
