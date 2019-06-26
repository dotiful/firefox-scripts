task('print', () => src(cfg.watch())
// .pipe(newer(cfg.dest()))
.pipe(through2.obj((file, enc, cb) => {
  if (file.isBuffer()) {
    log.watch(file.path);
  }
  cb(null, file);
})));
