import gulp from 'gulp'
import syncy from 'syncy'

export function sync(done) {
  return syncy(['node_modules/gulp/**'], 'dest')
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
}
