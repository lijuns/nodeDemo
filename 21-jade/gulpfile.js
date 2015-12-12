var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('jade', function () {
    return gulp.src('./**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'));
});



/*
 * 监听任务实现任务自动执行
 * */
gulp.task('default', function () {
    gulp.watch('./**/*.jade', ['jade']);
});
