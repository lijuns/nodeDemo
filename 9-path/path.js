var path = require('path');  //处理路径
var fs = require('fs');

/*
 * path.normalize(); 将非标准路径转化为标准路径
 * 规则：
 * 1、 . .. 分别解析上级、本机目录
 * 2、多个杠转成一个杠
 * 3、window下的杠 \ 转成linux的杠 /
 * 4、如果以康结尾，保留结尾的扛
 * */

console.log(path.normalize('.//a//b/////c/../../d/'));

/*
 * path.join()
 * 拼接路径，将多个参数字符串合并一个路径字符串
 *
 * */
console.log(path.join(__dirname, 'a', 'b', '..', 'msg'));

/*
 * path.resolve();  ≈ 空目录约等于 __dirname
 * 以应用程序根目录为起点，根据参数的值解析出一个绝对路径
 * 1、依程序根目录为起点
 * 2、 .. .
 * 3、普通字符串代表当前目录的字符串
 * 4、/绝对路径，代表盘符根目录
 * 5、如果没有下一个参数，返回当前目录
 * */
console.log('==============================\n');
console.log(path.resolve('/a', '..', 'b', 'c'));
console.log(path.resolve('.', 'b', '..', 'c'));

/*
 * path.dirname();
 * 返回所属目录，
 * 参数是目录，返回父级目录
 * 参数是文件，也返回它的直属目录
 * */
console.log(path.dirname(__dirname));
console.log(path.dirname(__filename));
console.log(path.dirname('path.txt'));

/*
 * path.basename(path);
 * 获取文件名字和文件的后缀名
 *
 * 如果不想获取文件后缀名，可以添加到第二个参数(.后缀名)
 *
 * path.extname();
 * 获取文件后缀名
 *
 * */
console.log(path.basename('./ab/s/s/d/d/path.txt'));
console.log(path.basename('./ab/s/s/d/d/path.txt', '.txt'));
console.log(path.extname('./ab/s/s/d/d/path.txt.abc'));

/*
 * path.sep;
 * 属性，用于获取路径分隔符
 *
 * path.delimiter;
 * 属性，环境变量路径分隔符
 * windows 下是 ；
 * mac和linux下是 ：
 *
 * */
console.log(
    '路径分隔符：' + path.sep,
    '环境变量分隔符：' + path.delimiter
);

/*
 * path.relative(from,to); 获取两个路径之间的相对路径
 * 返回的是在第一个路径中，如何使用相对路径 去引用第二个路径
 * */
console.log(path.relative(__dirname, 'b'));