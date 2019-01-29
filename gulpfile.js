// Load dependancies
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
// Create server browser-sync
var browserSync = require('browser-sync').create();
// Path variables
var src = './app/src'; // dossier de travail
var dest = './app/dist'; // dossier à livrer
/*
* Name: sass
* Description: Compiles Sass to CSS
*/
gulp.task('sass', function () {
    return gulp.src(`${src}/assets/sass/style.scss`)
        .pipe(plugins.sass())
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify({indent: '  '}))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(`${dest}/assets/css/`))
        .pipe(browserSync.stream());
});
/*
* Name: minify
* Description: Minification CSS
*/
gulp.task('minify', function () {
    return gulp.src(`${dest}/assets/css/*.css`)
      .pipe(plugins.csso())
      .pipe(plugins.rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(`${dest}/assets/css/`));
});
/*
* Name: build
* Description: Compiles Sass to CSS
*/
gulp.task('build', ['sass']);
/*
* Name: prod
* Description: Build and optimizes all assets for production
*/
gulp.task('prod', ['build',  'minify']);
/*
* Name: default
* Description: Default task
*/
gulp.task('default', ['build']);
/*
* Name: watch
* Description: Automatically build when scss change
*/
gulp.task('watch', function () {
    gulp.watch(`${src}/assets/sass/*.scss`, ['build']);
});
/*
* Name: serve
* Description: Build and Refreshes the browser automatically whenever you save a file
*/
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch(`${src}/assets/sass/*.scss`, ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});