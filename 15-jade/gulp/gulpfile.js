var gulp = require('gulp');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');

gulp.task('jadeCompile', function () {
    return gulp.src('../*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('../jade2html/'))
});

gulp.task('watchJade', function () {
    return gulp.watch('../*.jade', ['jadeCompile'])
});