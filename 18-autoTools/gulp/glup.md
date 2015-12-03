## Gulp教程

    Gulp是可以自动化执行任务的工具。在平时开发的流程里面，一定有一些动作需要手工的重复的去执行，比如:

- 把一个文件拷贝到另外一个位置
- 把多个 JS 或者 CSS 文件合并成一个文件
- 对JS文件和CSS进行合并压缩
- 把Sass或者Less文件编译成 CSS
- 压缩图像文件
- 创建一个可以实时刷新页面内容的本地服务器等等。

### 安装
 $ npm install -g gulp --registry=http://registry.npm.taobao.org

### 初始化
 $ npm init 初始化项目
 和发布npm一样，都需要输入一些package.json的信息

```
name: (tyh) learngulp //项目名字，npm init会自动取当前目录名作为默认名字，这里不需要改，直接确认即可
version: (1.0.0) 1.0.0   //项目版本号，这个大家按自己习惯来定就可以
description: learn gulp //项目说明
entry point: (index.js) index.js // 入门文件 npm start 会执行此文件
test command: test.js //测试脚本 npm test 会执行此文件
git repository: ... //模块的git仓库，选填。npm的用户一般都使用github做为自己的git仓库
keywords: node.js gulp  //在npmjs官网搜索时的关键字
author: admin //项目作者名字
license: (ISC) MIT //授权协议
About to write to D:\learnglup\package.json:

{
  "name": "learngulp",
  "version": "1.0.0",
  "description": "learn gulp",
  "main": "index.js",
  "dependencies": {
    "gulp": "^3.9.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "test.js"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": [
    "node.js",
    "gulp"
  ],
  "author": "admin",
  "license": "MIT"
}


Is this ok? (yes) yes //对以上内容确认无误后，就可以直接回车确认了

```

> 注意：npm install glup --save-dev ; glup作为项目的开发依赖（只在开发时用，不会发布到线上）

### glup运行

- 创建gulpfile.js文件，和nodejs一样，导入模块

- 创建glup任务

```
var gulp = require('gulp');
gulp.task('hello', function () {
    console.log('您好');
});
```

    创建hello任务，打开命令行工具，运行gulp hello任务

- 执行其他任务

    gulp <task> <othertask>

### glup 命令行

- -v 或 --version 会显示全局和项目本地所安装的 gulp 版本号
- --require 将会在执行之前 reqiure 一个模块。这对于一些语言编译器或者需要其他应用的情况来说来说很有用。你可以使用多个--require
- --gulpfile 手动指定一个 gulpfile 的路径，这在你有很多个 gulpfile 的时候很有用。这也会将 CWD 设置到该 gulpfile 所在目录
- --cwd dirpath 手动指定 CWD。定义 gulpfile 查找的位置，此外，所有的相应的依赖（require）会从这里开始计算相对路径
- -T 或 --tasks 会显示所指定 gulpfile 的 task 依赖树
- --tasks-simple 会以纯文本的方式显示所载入的 gulpfile 中的 task 列表
- --color 强制 gulp 和 gulp 插件显示颜色，即便没有颜色支持
- --no-color 强制不显示颜色，即便检测到有颜色支持
- --silent 禁止所有的 gulp 日志

### 工作流程

> 在介绍gulp API之前，我们首先来说一下gulp.js工作方式。 在gulp中，使用的是Nodejs中的stream(流)
>，首先获取到需要的stream，然后可以通过stream的pipe()方法把流导入到你想要的地方，比如gulp的插件中，
    经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到文件中。 所以gulp是以stream为媒介的，
    它不需要频繁的生成临时文件，这也是我们应用gulp的一个原因。

> gulp的使用流程一般是：首先通过gulp.src()方法获取到想要处理的文件流， 然后把文件流通过pipe方法导入到gulp的插件中，
    最后把经过插件处理后的流再通过pipe方法导入到gulp.dest()中， gulp.dest()方法则把流中的内容写入到文件中。例如：

```
    var gulp = require('gulp');
    gulp.src('script/src.js')         // 获取文件的流的api
    .pipe(gulp.dest('dist/dest.js')); // 写文件的api

```
### globs语法

    gulp 内部使用node-glob模块来实现其文件的匹配功能，我们可以使用下面这些特殊字符来匹配我们想要的文件；

- \*             匹配文件中一个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾
- \**            匹配路径中的0个或多个目录及子目录，需要单独出现，即它的左右不能有其他东西
- ?              匹配文件路径中的一个字符，不包括路径分隔符
- [...]          匹配方框中字符的任意一个，如果方框中第一个字符为^表示不匹配方框中的任意字符
- !(patter|patter) 匹配任何与括号中给定的任一模式都不匹配的
- ?(patter|patter) 匹配括号中给定的任一模式0次或1次，类似js正则中(patter|patter)+
- +(patter|patter) 匹配括号中给定的任一模式至少1次，类似js正则中(patter|patter)*
- \*(patter|patter) 匹配括号中给定的任一模式的0次或多次，类似js正则中(patter|patter)*
- @(patter|patter) 匹配括号中给定任一模式1次，类似于js正则中(patter|patter)



### gulp语法

> 1、gulp.src(globs[,options]); 正是用来获取流的；

- globs
    - 类型：String 或 Array
    - 所要读取的glob或者包含globs的数组
    - glob 返回匹配指定模式的文件名或目录，该函数返回一个包含匹配文件/目录的数组，如果出错返回false

- options
    - 类型：String ,设置输出路径以某个路径的某个组成部分为基础向后拼接；

```
gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'

gulp.src('client/js/**/*.js', { base: 'client' })
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'
```

> 2、gulp.dest(path[,options])

    path 为写入文件的路径，options 为一个可选的参数对象，以下为选项参数

- options.cwd

        类型：String 默认值：process.cwd();输出目录的cwd参数，只在所给的输出目录是相对路径时候有效
        能被pipe进来，并且将会写文件，如果文件夹不存在，将会自动创建它


```
var gulp = require('gulp');
var less = require('gulp-less');

/**
 * main.less
 * @color: #ffffff;
   #header {color: @color;}
 */
gulp.task('default',function(){
    gulp.src('client/main.less')
        .pipe(less())
        .pipe(gulp.dest('build',{cwd:'css'}));  //写入css目录下的build目录
});

```

> 3、gulp.task(name[,deps],fn);

    定义一个实现的任务（task）

   - name(任务的名字，注意不要有空格)
   - deps

    类型：Array 是当前任务以来的其他任务，其他所依赖的任务执行完毕后再执行该任务，没有则省略这个参数；

```
gulp.task('mytask',['array','of','task','names'],function(){

   //want do something

});
```

> 4、gulp.watch(glob[,options],tasks);

    用来监视文件的变化，当文件发生改变时，我们可以利用它执行相应的任务，例如文件压缩等；
    glob 类型String of Array

    options:Object传入gaze参数

    tasks :类型 Array；需要文件变动后执行的一个或多个gulp.task创建的task的名字

> 5、gulp.watch(glob[,options],cb);

    cb(event) 为回调函数，该对象包含了文件变化的一些信息，type属性为变化的类型,
    可以是：added,changed,deleted；path属性为发生变化时的文件的路径；

```gulp.watch('js/**/*.js',function(event){
        console.log('file'+event.path+'was'+event.type+',running tasks...');
    })
```

> 6、gulp.run(); 表示要执行的任务，可能会是单个参数的形式传递的多个任务

### 复制单个文件

    任务目标：把source文件夹中的test.js 复制到dest文件夹中

- 编写任务
    - 先给任务起个名字：copySingle
    - 再写一个匿名函数
    - 先用return
    - gulp.src(); 获取文件 .pipe(gulp.dest()); 复制到目标文件

```
gulp.task('copySingle', function () {
    return gulp.src('source/test.js').pipe(gulp.dest('dest'));
});
```

### 复制多个文件

### 执行多个任务

### 监听任务

    执行监听任务时，终端命令不会停止，直到我们按下Ctrl+c时，才会终止任务；

### gulp插件的使用
````
> [插件列表](http://gulpjs.com/plugins/)

- 编译sass =>   gulp-sass
- 合并文件 =>   gulp-concat
- 压缩js文件 => gulp-uglify
- 重命名js文件=> gulp-rename
- 优化图片大小=>  gulp-imagemin
- 压缩css文件=>  gulp-minify-css
- 创建本地服务器=>gulp-connect
- 实时预览 => gulp-connect
- 文件名md5加密 => gulp-rev
- 文件加密替换  => gulp-rev-collector

> 1、npm install xxx --save-dev 安装插件
> 2、在gulpfile.js　顶部引入此插件
> ３、创建任务时候使用此插件

> 安装gulp-load-plugin 自动加载package.json文件中依赖的gulp插件

    编译sass也可以使用 gulp-ruby-sass 插件，语法稍微与 gulp-sass 有点不一样

> 关于各大插件如何使用 详细请看 gulpfile.js中的写法