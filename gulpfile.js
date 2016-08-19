var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var mocha = require('gulp-mocha');

gulp.task("build", function () {
  return tsProject.src()
    .pipe(ts(tsProject))
    .js.pipe(gulp.dest("dist"));
});

gulp.task('test', function () {
  var testTsProject = ts.createProject("tsconfig.json");
  //find test code - note use of 'base'
  return gulp.src('./test/**/*.ts', {base: '.'})
  /*transpile*/
    .pipe(ts(testTsProject))
    /*flush to disk*/
    .pipe(gulp.dest('./dist'))
    /*execute tests*/
    .pipe(mocha({
      reporter: 'progress'
    }));
});


gulp.task('default', ['build', 'test']);
