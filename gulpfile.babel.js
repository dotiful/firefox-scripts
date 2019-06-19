import gulp        from 'gulp';
import path        from 'path';
import del         from 'del';
import through2    from 'through2';
import changed     from 'gulp-changed';
import prettyError from 'gulp-prettyerror';
import { log }     from "./gulp/logger.js";
// import babel    from 'gulp-babel';

const { src, dest, task, parallel, series, watch } = gulp;


const paths = {
  profile: {
    src: 
  },
  styles: {
    src: 'chrome/css/**',
  },
  scripts: {
    src: 'chrome/scripts/**',
  }
};

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ 'assets' ]);

/*
 * You can also declare named functions and export them as tasks
 */
export styles() => {
  src(paths.styles.src)
    .pipe(dest(paths.styles.dest));
}

export scripts() => {
  src(paths.scripts.src)
    .pipe(changed(cfg.dest()))
    .pipe(dest(paths.scripts.dest));
}

 /*
  * You could even use `export as` to rename exported tasks
  */
function watchFiles() {
  watch(paths.scripts.src, scripts);
  watch(paths.styles.src, styles);
}
export { watchFiles as watch };

const build = series(clean, parallel(styles, scripts));
/*
 * Export a default task
 */
export default build;
