import './scripts/modernizr';

require('animate.css');

window.moment = require('moment');

const momentDurationFormatSetup = require('moment-duration-format');
window.moment.locale('zh-cn');

momentDurationFormatSetup(window.moment);
