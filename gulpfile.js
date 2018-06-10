var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compileAssets(watch) {
  var bundler = watchify(browserify('./src/js/main.js', { debug: true }).transform(babel, {"presets": ["es2016", "stage-2"], "plugins": ["transform-decorators-legacy"]}));

  function rebundleAssets() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling assets...');
      rebundleAssets();
    });
  }

  rebundleAssets();
}

function watchAssets() {
  return compileAssets(true);
}
//
// function compileEnvironment(watch) {
//   var bundler = watchify(browserify('./env/main.js', { debug: true }).transform(babel, {"presets": ["es2016", "stage-2"], "plugins": ["transform-decorators-legacy"]}));
//   function rebundleAssets() {
//     bundler.bundle()
//       .on('error', function(err) { console.error(err); this.emit('end'); })
//       .pipe(source('app.environment.js'))
//       .pipe(buffer())
//       .pipe(sourcemaps.init({ loadMaps: true }))
//       .pipe(sourcemaps.write('./'))
//       .pipe(gulp.dest('./dist/js'));
//   }
//
//   if (watch) {
//     bundler.on('update', function() {
//       console.log('-> bundling environment...');
//       rebundleAssets();
//     });
//   }
//
//   rebundleAssets();
// }
//
// function watchEnvironment() {
//   return compileEnvironment(true);
// }

gulp.task('buildAssets', function() { return compileAssets(); });
gulp.task('watchAssets', function() { return watchAssets(); });

// gulp.task('buildEnvironment', function() { return compileEnvironment(); });
// gulp.task('watchEnvironment', function() { return watchEnvironment(); });

gulp.task('buildAll', ['buildAssets', 'buildEnvironment']);
gulp.task('watchAll', ['watchAssets']); //, 'watchEnvironment']);

gulp.task('default', ['watchAll']);
