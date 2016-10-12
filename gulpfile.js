var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

/** TODO add:
 * gulp-rev
 * gulp-sass-lint
 * gulp-livereload
 * */

var build = require('./build.config.json');


gulp.task('templates', function buildHTML() {
    gulp.src(build.app_files.pug)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('sass', function () {
  return gulp.src(build.app_files.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('autoprefixer', function () {
    return gulp.src('./css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
});

gulp.task('default', ['templates', 'sass']);
gulp.task('watch', ['templates', 'sass'], function(){
    var jadeWatcher = gulp.watch('src/pug/**/*.pug', ['templates']);
    jadeWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
	var sassWatcher = gulp.watch('src/sass/**/*.scss', ['sass']);
    sassWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});




