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
  profile: "/Users/art/Library/Application Support/Firefox/Profiles/5h4pjeov.default",
  src:     "chrome",
  ignore:  "!**/.git",
  ignoreTmp:  ["!**/css/**", '!**/userChrome/**'],
  dest()   { return path.join(this.profile, this.src) },
  watch()  { return `${this.src}/scripts/**` }
};


task('print', () => src(cfg.watch())
// .pipe(newer(cfg.dest()))
.pipe(through2.obj((file, enc, cb) => {
  if (file.isBuffer()) {
    log.watch(file.path);
  }
  cb(null, file);
})));

task('sync', () => src([`${cfg.src}/**`, ...cfg.ignoreTmp])
  .pipe(changed(cfg.dest()))
  // .pipe(plumber())
  .pipe(prettyError())
  // .pipe(debug())
  .pipe(dest(cfg.dest()))
  // .pipe(log.cmd('sync'))
);

task('watch', () => {
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



task("default", () => {
  const s = size();

  return src(cfg.src.path)
    .pipe(s)
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      onLast: true,
      message: () => `Total size ${s.prettySize}`
    }));
});

// task('default', () => src(cfg.src)
// 	.pipe()
// 	.pipe(dest(cfg.dest))
// );
