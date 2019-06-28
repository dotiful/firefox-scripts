import gulp from 'gulp'
import { paths } from './cfg'
import del from 'del'

export function clean() {
  return del(['build'])
}
