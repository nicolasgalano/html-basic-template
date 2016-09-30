var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');


gulp.task('templates', function buildHTML() {
    gulp.src(['src/pug/**/*.pug', '!src/pug/partials/**/*.pug'])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
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

gulp.task('autoprefixer', function () { 
    return gulp.src('./css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
});


