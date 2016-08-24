const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const mocha = require('gulp-mocha');
const del = require('del');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');


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

gulp.task('copy-prod', function () {
    gulp
        .src('dist/src/**/*.js')
        .pipe(gulp.dest('dist/prod'));

    gulp.src('package.json')
        .pipe(gulp.dest('dist/prod'));
});

gulp.task('clean-build', function () {
    runSequence('clean-dist',
        ['build'],
        function () {
            gutil.log('done cleaning and building');
        });
});

// This will run in this order:
// * clean-dist
// * build
// * copy-prod
// * Finally call the callback function
gulp.task('build-prod', function () {
    //run all these in sequence
    runSequence('clean-dist', 'build', 'copy-prod', function () {
    gutil.log("Done building and copying files");

    });
});
gulp.task('default', ['build', 'test']);
