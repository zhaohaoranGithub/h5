module.exports = {
  // "parser": "babel-eslint",
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jquery": true
  },
  globals: {
    "Vue": true,
    "_": true,
    "mapGetters": true,
    "mapState": true,
    "types": true,
    "Velocity": true,
    "moment": true,
    "Raven": true,
    "code": true,
    "api": true,
    "consts": true,
    "ApiCache": true,
    "TweenLite": true,
    "TweenMax": true,
    "TweenlineLite": true,
    "TimelineMax": true,
    "Power0": true,
    "Power1": true,
    "Power2": true,
    "Power3": true,
    "Power4": true,
    "Elastic": true,
    "Back": true,
    "Expo": true,
    "Quad": true,
    "Quart": true,
    "PIXI": true,
    "RoughEase": true,
    "process": true
  },
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  rules: {
    // override/add rules settings here, such as:
    'no-unused-vars': 'off',
    'no-debugger': 'off',
    'no-console': 'off',
    "semi": [2],
  },
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  }
};
