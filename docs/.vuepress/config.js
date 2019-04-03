const webpack = require('webpack');
const path = require('path');

const striptags = require('./strip-tags');

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

module.exports = {
  title: "Guideline",
  description: '前端项目指南',
  dest: 'vuepress',
  base: '/',
  head: [],
  serviceWorker: true,
  chainWebpack: (config, isServer) => {
    config.resolve.alias
      .set('element-ui', path.resolve(__dirname, '../..', 'src/element-ui'))
      .set('vue$', 'vue/dist/vue.common.js')
      .set('types', path.resolve(__dirname, '../..', 'src/store/mutation-types.js'))
      .set('@', path.resolve(__dirname, '../..', 'src'));

    config.merge({
      externals: {
        'root': 'window'
      },
    });


    config.plugin('provide')
      .use(webpack.ProvidePlugin, [{
        Vue: ['vue/dist/vue.esm.js', 'default'],
        mapState: ['vuex', 'mapState'],
        mapGetters: ['vuex', 'mapGetters'],
        jQuery: 'jquery',
        $: 'jquery',
        'window.jQuery': 'jquery',
        _: 'lodash',
        Velocity: 'velocity-animate',
        Raven: 'raven-js',

        main: 'main',
        'element-ui': 'element-ui',
        types: 'types',
      }]);

    // config.module
    //   .rule('pdf')
    //   .test(/\.pdf$/)
    //   .use('url-loader')
    //   .loader('url-loader')
  },

  markdown: {
    config: md => {
      md.use(...[require('markdown-it-container'), 'demo', {
        validate: function(params) {
          return params.trim().match(/^demo\s*(.*)$/);
        },

        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

          console.log('aaaaaa', tokens[idx].info.trim());
          if (tokens[idx].nesting === 1) {
            var description = (m && m.length > 1) ? m[1] : '';
            var content = tokens[idx + 1].content;
            var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
            var script = striptags.fetch(content, 'script');
            var style = striptags.fetch(content, 'style');
            var jsfiddle = { html: html, script: script, style: style };
            var descriptionHTML = description
              ? md.render(description)
              : '';

            jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

            return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                            <div class="source" slot="source">${html}</div>
                            ${descriptionHTML}
                            <div class="highlight" slot="highlight">`;
          }
          return '</div></demo-block>\n';
        }
      }]);
      // .use(require('markdown-it-container'), 'tip')
      // .use(require('markdown-it-container'), 'warning');
    }
  },

  themeConfig: {
    // repo: 'http://gitlab.5x5x.com/global/guideline',
    // editLinks: true,
    docsDir: 'docs',
    sidebar: {
      '/forehead/': [
        {
          title: '前端指南',
          collapsable: false,
          children: [
            '',
            'update-log',
            'structure',
            'icon',
            'basic-components',
            'advance-components',
            'effect-components',
            // 'notice',
            'dialog',
            'notice-alert',
            'unit-test',
            'e2e'
          ]
        }
      ]
    }
  }
};
