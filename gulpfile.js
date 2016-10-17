var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rev = require('gulp-rev');
var runSequence = require('run-sequence');

/** TODO add:
 * gulp-rev
 * gulp-sass-lint
 * gulp-livereload
 * */

var build = require('./build.config.json');

gulp.task('templates', function buildHTML() {
    var manifest = require('./css/rev-manifest.json');

    gulp.src(build.app_files.pug)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(pug({
            pretty: true,
            locals: {
                css: manifest['app.css']
            }
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('sass', function () {
  return gulp.src(build.app_files.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(rev())
      .pipe(gulp.dest('./css'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./css'));
});

gulp.task('autoprefixer', function () {
    return gulp.src('./css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
});

//gulp.task('default', ['sass', 'templates']);
gulp.task('default', function(callback){
    runSequence('sass',
                'templates',
                callback);
});
//gulp.task('watch', ['sass', 'templates'], function(){
//    var jadeWatcher = gulp.watch('src/pug/**/*.pug', ['templates']);
//    jadeWatcher.on('change', function(event) {
//        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//    });
//	var sassWatcher = gulp.watch('src/sass/**/*.scss', function(callback){
//        runSequence('sass',
//            'templates',
//            callback);
//    });
//    sassWatcher.on('change', function(event) {
//        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//    });
//});
gulp.task('watch', function(callback){
    runSequence('sass',
        'templates',
        function(){
            var jadeWatcher = gulp.watch('src/pug/**/*.pug', ['templates']);
            jadeWatcher.on('change', function(event) {
                console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
            var sassWatcher = gulp.watch('src/sass/**/*.scss', function(){
                runSequence('sass',
                    'templates'
                    );
            });
            sassWatcher.on('change', function(event) {
                console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
        });
});




