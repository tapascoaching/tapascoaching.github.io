var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    cleanCss = require('gulp-clean-css'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

// paths object
var paths = {
  sass: 'src/sass/*.sass',
  html: '*.html',
  images: 'public/images/**/*',
  fonts: ['/public/fonts/*', 'src/fonts/*'],
  js: ['bower_components/jquery/dist/jquery.js', 'src/js/*.js']
}

// SASS TASK
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});
 

// Css Auto Prefix

gulp.task('autoprefixer', function () {
  var autoprefixer = require('autoprefixer');

  return gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'));
});

// HTML TASK
gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(browserSync.stream());
});

// JS TASK
gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
});

// FONTS TASK
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./public/fonts'))
    .pipe(browserSync.stream());
});

// IMAGES TASK
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest('./public/images'))
    .pipe(browserSync.stream());
});

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
  //gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.images, ['images', 'clean']);
});


// BROWSER SYNC TASK
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// clean task
gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

// DEFAULT TASK
gulp.task('default',['sass', 'html', 'js', 'images', 'fonts', 'browser-sync', 'watch']);