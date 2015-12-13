var gulp = require('gulp');
/*
 * @name 复制单个文件
 * */
gulp.task('copySingle', function () {
    return gulp.src('source/test.js').pipe(gulp.dest('dest'));
});


/*
 * @name 复制多个文件
 * */
gulp.task('copyFiles', function () {
    return gulp.src(['app/style/**/*.css', 'app/script/**/*.js'], {base: 'app'}).pipe(gulp.dest('dest'));
});

/*
 * 执行多个任务
 * */
gulp.task('default', ['copyFiles', 'copySingle'], function () {
    console.log('==============任务全部执行完毕=============');
});

/*
 * 监听任务实现任务自动执行
 *
 * */
gulp.task('default', function () {
    gulp.watch('source/test.js', ['copySingle']);
});

/*
 * 使用gulp-load-plugins 这个插件自动加载package.json中的gulp插件
 * var $ = require('gulp-load-plugins')();
 * 安装 gulp-load-plugins 模块
 * */

var $ = require('gulp-load-plugins')();

/*
 * gulp-connect 运行本地服务器
 * 安装 gulp-connect 模块
 * */
var connect = require('gulp-connect');
gulp.task('server', function () {
    connect.server({
        root: 'app',  //服务器根目录
        port: 3000
    });
});


/*
 * 配置scss文件编译后，压缩，重命名后 浏览器实时刷新
 * 安装 gulp-ruby-sass 模块
 * 安装 gulp-rename 模块
 * 安装 gulp-minify-css 模块
 *
 * */

var sass = require('gulp-ruby-sass');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('sassCompile', function () {
    return sass('app/style/**/*.scss')
        .on('error', sass.logError)
        .pipe(minify())
        .pipe(rename('page.min.css'))
        .pipe(gulp.dest('app/style/'))
        .pipe(connect.reload());    //自动刷新
});


gulp.task('watchCss', function () {
    return gulp.watch('app/style/**/*.scss', ['sassCompile'])
});

gulp.task('serverLoadAuto', function () {
    connect.server({
        root: 'app',
        port: 8080,
        livereload: true    //自动刷新
    });
});

gulp.task('auto', ['serverLoadAuto', 'watchCss']);

/*
 * 文件合并、压缩js
 *
 * 安装 文件合并 gulp-concat　模块
 * 安装 文件压缩 gulp-uglify 模块
 *
 * */

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('concat', function () {
    return gulp.src(['app/script/**/*.js'])
        .pipe(concat('app.js')) //合并之后的文件名
        .pipe(uglify()) //压缩文件
        .pipe(gulp.dest('app/gulp'))
});

/*
 * html文件压缩
 * 安装 gulp-minify-html 插件
 * */

var minifyHtml = require('gulp-minify-html');
gulp.task('minifyHtml', function () {
    return gulp.src('app/*.html')
        .pipe(minifyHtml()) //压缩
        .pipe(gulp.dest('dest/html'));
});

/*
 * 1、image 图片压缩并加密等
 * 安装 gulp-imagemin 模块
 *      2、给文件名加md5后缀
 *      3、路径替换
 * 需要再安装 gulp-rev模块
 * 再安装 gulp-rev-collector模块
 *
 * */

var imagemin = require('gulp-imagemin');

var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

gulp.task('minImage', function () {
    return gulp.src('app/**/*.{jpg,png}')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('dest/images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev'))
});

gulp.task('rev',function(){
    gulp.src(['./rev/*json','app/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dest/htmlZip'))
});

gulp.task('imgZip', ['minImage', 'rev']);