var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    postcss = require('gulp-postcss'),
    imagemin = require('gulp-imagemin'),
    cleanCss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

// PATHS OBJECT
var paths = {
  sass: 'src/scss/**/*.scss',
  html: './src/*.html',
  images: ['./src/images/**/*', './public/images/*'],
  fonts: ['./src/fonts/**/*', './public/fonts/*'],
  js: 'src/js/**/*.js'
}

// SASS TASK
gulp.task('sass', function () {
  return gulp.src('./src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

// CSS AUTO PREFIX
gulp.task('autoprefixer', function () {
  var autoprefixer = require('autoprefixer');

  return gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'));
});

// HTML TASK
// gulp.task('html', function() {
//   return gulp.src(paths.html)
//     .pipe(browserSync.stream());
// });

gulp.task('htmlMinify', function() {
  return gulp.src(paths.html)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

// ES6 TASK
gulp.task('es6', () => {
  return gulp.src(paths.js)
    .pipe(babel().on('error', function(err) {
      console.error(err.message);
      this.emit('end');
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(uglify().on('error', function(err) {
      console.error(err.message);
      this.emit('end');
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
})

// FONTS TASK
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./public/fonts'))
    .pipe(browserSync.stream());
});

// IMAGES TASK
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin().on('error', function(err) {
      console.error(err.message);
      this.emit('end');
    }))
    .pipe(gulp.dest('./public/images'))
    .pipe(browserSync.stream());
});

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['htmlMinify']);
  gulp.watch(paths.js, ['es6']);
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
gulp.task('default',['sass', 'htmlMinify', 'es6', 'images', 'fonts', 'browser-sync', 'watch']);
