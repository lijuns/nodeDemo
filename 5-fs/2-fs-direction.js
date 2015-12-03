/*
 * fs 创建目录
 * fs.mkdir(path,function(err){});
 * 只能创建一级目录，不能创建多级目录
 *
 *
 * */

var fs = require('fs');

console.log(fs.existsSync('direction/test'));

if (!fs.existsSync('direction/test')) {
    fs.mkdir('direction/test', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('创建目录成功');
        }
    });

}

/*
 *
 * 导入path模块
 * path.sep 获取本操作系统的文件分割符
 * windows  /分隔符
 * linux|mac \分隔符
 *
 * */
var path = require('path');

fs.mkdirP = function (dir) {
    var parts = dir.split('/');
    for (var i = 0; i < parts.length; i++) {
        var currentPath = parts.slice(0, i + 1).join('/');
        console.log(currentPath);
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
    }
};
fs.mkdirP('1/2/3/4');


/*
 * 删除目录
 * 只能删除空目录
 *
 * */

//fs.existsSync('direction/test') && fs.rmdirSync('direction/test');

/*
 * 封装可删除多级目录的方法
 * dir String 传入父级文件夹，删除所有子文件夹或文件
 * */

fs.rmdirP = function (dir) {
    var files = [];
    if (fs.existsSync(dir)) {
        files = fs.readdirSync(dir);
        files.forEach(function (file) {
            var curPath = dir + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                fs.rmdirP(curPath);
            } else {
                fs.unlinkSync(curPath);
            }

            fs.rmdirSync(curPath);  //此处只能同步删除
            console.log('文件删除成功');
        })
    }
};

//fs.rmdirP('./1');