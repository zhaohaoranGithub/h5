const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const minimist = require('minimist');
const buffer = require('vinyl-buffer');

const _ = require('underscore');

const runSequence = require('run-sequence');

// css sprite
const spritesmith = require('gulp.spritesmith');

svgSprite = require('gulp-svg-sprite');

const webpack = require('webpack');

const Fontmin = require('fontmin');
const zip = require('gulp-zip');
const fs = require('fs');
const rename = require('gulp-rename');
const fontConfig = require('./font-config.json');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

gulp.task('release', (cb) => {
  runSequence(
    'release.build',
    'zip',
    cb
  );
});

gulp.task('webpack', (callback) => {
  const webpackConfig = require('./webpack.config');

  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
    }));

    gulp.pipe(stats.toJson())
      .dest('./stats.json');

    callback();
  });
});

gulp.task('image.min', () => {
  del('./minImages');
  gulp.src('./src/**/*.{png,jpg,gif,ico}')
    .pipe(cache(
      imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ])
    ))
    .pipe(gulp.dest('./src/'));
});

gulp.task('build.sprite', (callback) => {
  const spriteConfig = require('./sprites-config');

  const args = minimist(process.argv.slice(1));

  const spriteTarget = args.target;

  const total = spriteConfig.length;
  let finished = 0;
  // process.exit()

  _(spriteConfig).each((info) => {


    if (spriteTarget !== 'all' && info.name !== spriteTarget) {
      finished += 1;
      return;
    }
    const spriteData =
      gulp.src([`./src/base/images/${info.name}/*.png`, `./src/base/images/${info.name}/*/*`])
        .pipe(spritesmith({
          imgName: `${info.name}.png`,
          cssName: `_${info.name}.scss`,
          cssFormat: 'scss',
          imgPath: `~base/images/${info.name}.png`,
          imgOpts: {quality: 75},
          algorithm: 'binary-tree',
          cssSpritesheetName: info.name,
          cssVarMap(sprite) {
            sprite.name = `sfa-${sprite.name}`;
          },
        }));

    const imgStream = spriteData.img
      .pipe(buffer())
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 5}),
      ]))
      .pipe(gulp.dest('./src/base/images'));
    spriteData.css
      .pipe(gulp.dest('./src/base/styles'));

    finished += 1;
    if (finished === total) {
      callback();
    }
  });
});

// 编译生产版本
gulp.task('release.build', (callback) => {
  del(`./www/main/*`);

  const webpackConfig = require('./webpack.config');

  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
    }));
    callback();
  });
});


// 打压缩包，打www/main程序包
gulp.task('zip', () => {
  return gulp.src(['www/main/*', '!www/main/*.map', '!www/main/*.map.gz', '!www/main/*.css.map', '!www/main/*.css.map.gz'])
    .pipe(zip('user-h5.zip')
    )
    .pipe(gulp.dest('www'));
});

//编译dll
gulp.task('dll:prepare', function (callback) {
  const dllConfig = require('./webpack.dll.config');

  del(`./src/dll/${process.env.NODE_ENV}/*`);

  webpack(dllConfig, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    callback();
  });
});


//字体提取格式转换，原生字体推荐ttf原生格式
gulp.task('font.min', (cb) => {
  runSequence(
    'font.minimal',
    'font.dest',
    cb
  );
});

gulp.task('font.minimal', (cb) => {
  const total = fontConfig.length;
  let finished = 0;
  _(fontConfig).each((fontInfo) => {
    const fontmin = new Fontmin()
      .src(`./src/themes/fonts/origins/${fontInfo.font}`)
      .use(Fontmin.glyph({
        text: fontInfo.text,
        hinting: false,
      }));
    if (fontInfo.font.indexOf('otf') > -1) {
      fontmin.use(Fontmin.otf2ttf());
    }
    if (_(fontInfo.targets).contains('eot')) {
      fontmin.use(Fontmin.ttf2eot());
    }


    if (_(fontInfo.targets).contains('woff')) {
      fontmin.use(Fontmin.ttf2woff({
        deflate: true, // deflate woff. default = false
      }));
    }

    if (_(fontInfo.targets).contains('svg')) {
      fontmin.use(Fontmin.ttf2svg());
    }

    fontmin.use(Fontmin.css({
      fontPath: '~@/themes/fonts/', // location of font file
      // base64: true,           // inject base64 data:application/x-font-ttf; (gzip font with css).
      //                         default = false
      // glyph: true,            // generate class for each glyph. default = false
      // iconPrefix: 'my-icon',  // class prefix, only work when glyph is `true`. default to "icon"
      // fontFamily: 'myfont',   // custom fontFamily, default to filename or get from analysed ttf file
      asFileName: true, // rewrite fontFamily as filename force. default = false
      local: true, // boolean to add local font. default = false
    }))
      .dest('./src/themes/fonts');

    fontmin.run((err, files) => {
      if (err) {
        throw err;
      }
      finished += 1;

      // 此处有bug
      if (finished === total) {
        cb();
      }
      // cb()
      // => { contents: <Buffer 00 01 00 ...> }
    });
  });
});

gulp.task('font.dest', (callback) => {
  const imports = [];
  _(fontConfig).each((fontInfo) => {
    gulp.src(`./src/themes/fonts/${fontInfo.target}.css`)
      .pipe(rename(`${fontInfo.target}.scss`))
      .pipe(gulp.dest('./src/base/styles/fonts'));

    del([`./src/base/fonts/${fontInfo.target}.css`]);

    imports.push(`"fonts/${fontInfo.target}"`);
  });

  fs.writeFile('./src/base/styles/_fonts.scss', `@charset "UTF-8";\n@import\n${imports.join(',\n')};`, callback);
});
