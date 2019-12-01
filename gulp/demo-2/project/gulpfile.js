var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat'); //合并文件
var babel = require("gulp-babel");
var $ = require('gulp-load-plugins')();
var sass = require('gulp-ruby-sass')
var minifyCSS = require('gulp-minify-css')
var imagemin = require('gulp-imagemin')

var config = {
  srcPath: './src/resource',
  htmlPath: './src',
  distPath: '../'
}


gulp.task('script', function () {
  return gulp.src(config.srcPath + '/js/*.js')
    .pipe(concat('index.all.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.distPath + '/js/'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(config.distPath + '/js/'))
});

gulp.task('sass', function () {
  // console.log(config.srcPath + '/css/');

  return sass(config.srcPath + '/css/*.scss')
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.distPath + '/css/'))
});

gulp.task('images', function () {

  return gulp.src(config.srcPath + '/img/*/*.*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(config.distPath + '/img/'))
})

gulp.task('default', gulp.series('script', 'sass', 'images'));