const gulp        = require("gulp"),
      path        = require("path"),
      del         = require("del"),
      through2    = require('through2'),
      changed     = require('gulp-changed'),
      size        = require('gulp-size'),
      notify      = require('gulp-notify'),
      debug       = require('gulp-debug'),
      plumber     = require('gulp-plumber'),
      prettyError = require('gulp-prettyerror'),
      log         = require("./gulp/logger.js");

const { src, dest, task, parallel, series, watch } = gulp;

const cfg = {
  profile: "/Users/art/Library/Application Support/Firefox/Profiles/hlq3pnw8.qwe",
  src:     "chrome",
  ignore:  "!**/.git",
  userJs:  './user.js',
  ignoreTmp:  ["!**/css/**", '!**/userChrome/**'],
  dest()   { return path.join(this.profile, this.src) },
  watch()  { return `${this.src}/scripts/**` }
};

task('sync', () => {
  return src(`${cfg.src}/**`)
    .pipe(changed(cfg.dest()))
    .pipe(prettyError())
    .pipe(dest(cfg.dest()))
});

task('userJs', () => {
  src(cfg.userJs)
    .pipe(prettyError())
    .pipe(dest(cfg.profile))
});

task('watch-chrome', () => {
  const watcher = watch([`${cfg.src}/**`, ...cfg.ignoreTmp], series('sync'));

  watcher
    .on('add',    filepath => log.watch(filepath, 'added'))
    .on('change', filepath => log.watch(filepath, 'changed'))
    .on('unlink', filepath => {
      const filePathFromSrc = path.relative(path.resolve(cfg.src), filepath);
      const destFilePath    = path.resolve(cfg.dest(), filePathFromSrc);
      del.sync(destFilePath, {force: true});
      log.watch(filePathFromSrc, 'removed');
    })
    .on('error', error => log.error(`Watcher error: ${error}`));
});

task('watch-user', () => {
  const watcher = watch(cfg.userJs, series('userJs'));

  watcher
    .on('add',    filepath => log.watch(filepath, 'added'))
    .on('change', filepath => log.watch(filepath, 'changed'))
    .on('unlink', filepath => {
      const filePathFromSrc = path.relative(path.resolve(cfg.src), filepath);
      const destFilePath    = path.resolve(cfg.dest(), filePathFromSrc);
      del.sync(destFilePath, {force: true});
      log.watch(filePathFromSrc, 'removed');
    })
    .on('error', error => log.error(`Watcher error: ${error}`));
});

task('watch', parallel('watch-user', 'watch-chrome'));
task('default', series('watch'));

task('watch-test', () => {
  return src('./gulp/**')
    .pipe(prettyError())

});


// task("default", () => {
//   const s = size();

//   return src(cfg.src.path)
//     .pipe(s)
//     .pipe(gulp.dest('dist'))
//     .pipe(notify({
//       onLast: true,
//       message: () => `Total size ${s.prettySize}`
//     }));
// });
