let opts = process.argv.slice(2);

if (opts.indexOf('--dev') === -1) {
  runningNightWatch();
} else {
  const webpack = require('webpack');
  const DevServer = require('webpack-dev-server');

  const webpackConfig = require('../../webpack.config');

  let server = new DevServer(webpack(webpackConfig), webpackConfig.devServer)
    .listen(webpackConfig.devServer.port, 'localhost', (err) => {
      if (err) {
        console.log(err);
      }

      console.log(`Listening at localhost:${webpackConfig.devServer.port}`);

      runningNightWatch(server);
    });
}

// to run in additional browsers:
//    1. add an entry in test/e2e/nightwatch.conf.js under "test_settings"
//    2. add it to the --env flag below
// or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
// For more information on Nightwatch's config file, see
// http://nightwatchjs.org/guide#settings-file
function runningNightWatch (server) {
  let opts = process.argv.slice(2);
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'test/e2e/nightwatch.conf.js']);
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome']);
  }

  const spawn = require('cross-spawn');

  const runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' });

  runner.on('exit', (code) => {
    if (server) {
      server.close();
    }
    process.exit(code);
  });

  runner.on('error', (err) => {
    if (server) {
      server.close();
    }
    throw err;
  });
}
