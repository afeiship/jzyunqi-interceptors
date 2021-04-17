(function() {
  'use strict';

  const gulp = require('gulp');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', '@jswork/gulp-*']
  });

  gulp.task('scripts', function() {
    return gulp
      .src('src/*.js')
      .pipe($.jswork.pkgHeader())
      .pipe(gulp.dest('dist'))
  });
})();
