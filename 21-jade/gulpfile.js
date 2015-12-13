var gulp = require('gulp');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber')


gulp.task('jade', function () {
    return gulp.src('./**/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty:true
        }))
        .pipe(gulp.dest('./dist/'));
});

/*
 * 监听任务实现任务自动执行
 * */
gulp.task('default', function () {
    gulp.watch('./**/*.jade', ['jade']);
});
