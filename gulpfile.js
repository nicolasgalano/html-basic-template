var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rev = require('gulp-rev');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

/** TODO add:
 * gulp-rev | done
 * gulp-sass-lint
 * gulp-livereload
 * */

var build = require('./build.config.json');

gulp.task('templates', function () {
    var manifest = requireUncached('./css/rev-manifest.json');

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

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

gulp.task('sass', function () {
  return gulp.src(build.app_files.sass)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer( build.autoprefixerOptions ))
      .pipe(rev())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./css'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('./css'));
});


gulp.task('default', function(callback){
    runSequence('sass',
                'templates',
                callback);
});

gulp.task('watch', function(){
    runSequence('sass',
        'templates',
        function(){
            var pugWatcher = gulp.watch('src/pug/**/*.pug', ['templates']);
            pugWatcher.on('change', function(event) {
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
        }
    );
});




