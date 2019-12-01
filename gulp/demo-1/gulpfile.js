var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat'); //合并文件
var babel = require("gulp-babel");
var $ = require('gulp-load-plugins')();

var config = {
  srcPath:'src/',
  buildPath:'build/',
  distPath:'dist/'
}

gulp.task('default', function () {
  return  gulp.src(config.srcPath + '/js/*.js')
    .pipe(concat('order_query.js'))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(config.distPath))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(config.distPath))
});

gulp.task('html', function () {
  return  gulp.src(config.srcPath + '/index.html')
    .pipe(concat('order_query.js'))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest(config.distPath))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(config.distPath))
});