var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var mocha = require('gulp-mocha');
const del = require('del');
const runSequence = require('run-sequence');

const BUILD_DIRECTORY = './dist';

gulp.task("build", function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest("dist"));
});

gulp.task('test', function () {
    var testTsProject = ts.createProject("tsconfig.json");
    //find test code - note use of 'base'
    return gulp.src('./test/**/*.ts', {base: '.'})
    /*transpile*/
        .pipe(ts(testTsProject))
        /*flush to disk*/
        .pipe(gulp.dest(BUILD_DIRECTORY))
        /*execute tests*/
        .pipe(mocha({
            reporter: 'progress'
        }));
});

gulp.task('watch-test', ['build', 'test'], function () {
    gulp.watch('./test/**/*.ts', ['build', 'test']);
});

gulp.task('clean-dist', function () {
    del.sync([BUILD_DIRECTORY], function () {
        console.log('finished cleaning.');
    })
});

gulp.task('clean-node-modules', function () {
    del.sync(['./node_modules'], function () {
        console.log('finished cleaning.');
    })
});

/*gulp.task('clean-build', function(cb) {
 runSequence('build-clean',
 ['build-scripts', 'build-styles'],
 'build-html',
 callback);
 });*/

gulp.task('clean-build', function () {
    runSequence('clean-dist',
        ['build'],
        function () {
            console.log('done cleaning and building');
        });
});
gulp.task('default', ['build', 'test']);
