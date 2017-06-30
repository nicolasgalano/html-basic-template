// #############################
// Init Vars.
// #############################
var gulp         = require('gulp'),
    $            = require('gulp-load-plugins')(),
    pug          = require('gulp-pug'),
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    path         = require('path'),
	kss 		 = require('kss'); // kss-node 3.0.0-beta1 and later.
    options      = {};

/** TODO add:
 * gulp-rev
 * gulp-livereload
 * */

//KSS styleguide
// #############################
// Editable paths and options.
// #############################
options.rootPath = {
  project     : __dirname + '/',
  styleGuide  : __dirname + '/styleguide/',
 //theme		  : __dirname + '/',
  src         : __dirname + '/src/'
};

options.theme = {
  name       : 'Mobomo Styleguide :)',
  root       : options.rootPath.project,
  components : options.rootPath.src     + 'sass/components/',
  sass       : options.rootPath.src     + 'sass/',
  css        : options.rootPath.project + 'css/',
  js         : options.rootPath.project + 'js/'
};

options.styleGuide = {
  source: [
    options.theme.sass
  ],
  mask: /\.less|\.sass|\.scss|\.styl|\.stylus/,
  destination: options.rootPath.styleGuide,
  // HERE we can add our own builder, or use the bootstrap one? added below as example. 
  // We should also include it in the repo so its cloned along with the other resources.
  builder: 'kss_mobomo',

  // The css and js paths are URLs, like '/misc/jquery.js'.
  // The following paths are relative to the generated style guide.
  css: [
    path.relative(options.rootPath.styleGuide, options.theme.css + 'app.css'),
    //path.relative(options.rootPath.styleGuide, options.theme.css + 'style-guide/chroma-kss-styles.css'),
    //path.relative(options.rootPath.styleGuide, options.theme.css + 'style-guide/kss-only.css')
  ],
  js: [
  ],

  homepage: 'homepage.md',
  title: 'Test KSS gulp =^..^='
};

// #########################
// Gulp tasks
// #########################
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

gulp.task('lint', ['lint:sass']);

// Lint Sass.
gulp.task('lint:sass', function () {
  return gulp.src(options.theme.components + '**/*.scss')
    .pipe($.sassLint())
    .pipe($.sassLint.format());
});

// Lint Sass and throw an error for a CI to catch.
gulp.task('lint:sass-with-fail', function () {
  return gulp.src(options.theme.components + '**/*.scss')
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
});

gulp.task('sgBuilder', function() {
  // StyleGuide Builder CSS Assets
  gulp.src(['kss_mobomo/kss-assets/css/*.scss'])
  	.pipe($.sass())
    .pipe($.concat('kss.css'))
    .pipe(gulp.dest('styleguide/kss-assets/css'))
});

gulp.task('styleguide', function() {
  return kss(options.styleGuide)
});

// #########################
// Gulp Default and Watch
// #########################
gulp.task('default', ['templates', 'sass']);
gulp.task('watch', ['templates', 'sass','styleguide','sgBuilder'], function(){
    var jadeWatcher = gulp.watch('src/pug/**/*.pug', ['templates']);
    jadeWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
	var sassWatcher = gulp.watch('src/sass/**/*.scss', ['sass']);
    sassWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var builderWatcher = gulp.watch(['kss_mobomo/kss-assets/css/*.scss'], ['sgBuilder']);
    builderWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

	var styleguideWatcher = gulp.watch(['src/sass/**/*.scss', 'kss_mobomo/kss-assets/css/*.scss'], ['styleguide']);
    styleguideWatcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

});
gulp.task('watch:ls', ['templates', 'sass','watch:lint-and-styleguide']);
gulp.task('watch:lint-and-styleguide', ['styleguide', 'lint:sass'], function () {
  return gulp.watch([
    options.theme.components + '**/*.scss',
    options.theme.components + '**/*.twig'
  ], options.gulpWatchOptions, ['styleguide', 'lint:sass']);
});

// #########################
// Task for styleguide debug
// #########################
// Debug the generation of the style guide with the --verbose flag.
gulp.task('styleguide:debug', ['styleguide'], function () {
  options.styleGuide.verbose = true;
  return kss(options.styleGuide);
});
