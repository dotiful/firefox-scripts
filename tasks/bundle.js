import gulp from 'gulp'
import { paths } from '../gulpfile'
import del from 'del'
import zip from 'gulp-zip'
import fancyLog from 'fancy-log'
import chalk from 'chalk'
import pkg from '../package.json'

function zipFiles() {
  return gulp.src('build/**/*')
    .pipe(zip(`${pkg.name}.zip`))
    .pipe(gulp.dest('build'))
}

function cleanZippedFiles() {
  return del(['build/*', '!build/*.zip'])
}

async function logBundle() {
  fancyLog()
  fancyLog(chalk.green(`Bundle successful!`))
  fancyLog(chalk.cyan(`The zip is ready to be published`))
  fancyLog()
  fancyLog(`  ${chalk.gray(`build/`)}${pkg.name}.zip`)
  fancyLog()
}

export const bundle = gulp.series(zipFiles, cleanZippedFiles, logBundle)
