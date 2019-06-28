import gulp from 'gulp';
import { clean, scripts, styles, manifest, watch, bundle } from './tasks';

const { task, parallel, series } = gulp;

task('build', series(clean, parallel(scripts, styles, manifest)));
task('dev', series('build', watch));
task('bundle', series('build', bundle));
