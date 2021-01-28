const gulp = require('gulp')

//Pug2html
const pug = require('gulp-pug')
const htmlBeautify = require('gulp-html-beautify')

const pugfunction = function pug2html(cb) {
  var htmlBeautifyOptions = {
    "indent_size": 2
  };
  return gulp.src('./src/index.pug')
    .pipe(pug())
    .pipe(htmlBeautify(htmlBeautifyOptions))
    .pipe(gulp.dest('./build/'))
}

//Sass function
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const postcss = require('gulp-postcss')
const sortMediaQueries = require('postcss-sort-media-queries')

const sassfunction = function () {
  var processors = [
    sortMediaQueries({
      sort: 'desktop-first'
    })
  ]
  return gulp.src('./src/style.sass')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./src/'));
}
//Оптимизация картинок
const imagemin = require('gulp-imagemin')
const imgCompress = require('imagemin-jpeg-recompress')
const cache = require('gulp-cache');

const imgfunction = function () {
  return gulp.src('./src/img/**/*.*')
    .pipe(
      cache(
        imagemin([
          imgCompress({
            loops: 4,
            min: 75,
            max: 80,
            quality: 'high'
          }),
          imagemin.gifsicle(),
          imagemin.optipng(),
          imagemin.svgo()
        ])
      )
    )
    .pipe(gulp.dest('build/img/'));
}
//CleanFunction
const GulpClean = require('gulp-clean')

const cleanfunction = function () {
  return gulp.src('./src/style.css', {read: false})
  .pipe(GulpClean())
}
//Sass and pug functions
const sassandpugfunction = gulp.series(sassfunction, pugfunction, cleanfunction)
//Sass watch function
const sasswatchfunction = function () {
  gulp.watch('src/style.sass', { events: 'all' }, sassandpugfunction)
}
//Pug watch function
const pugwatchfunction = function () {
  gulp.watch('src/index.pug', { events: 'all' }, sassandpugfunction)
}
//Img watch function
const imgwatchfunction = function () {
  gulp.watch('./src/img/**/*', { events: 'all' }, imgfunction)
}
//Final task
const build = gulp.series(imgfunction, sassfunction, pugfunction, cleanfunction)
const watch = gulp.parallel(sasswatchfunction, pugwatchfunction, imgwatchfunction)
module.exports = gulp.series(build, watch)