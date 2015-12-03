/*
 *fs.unlink(path[,callback])或者fs.unlinkSync(path)
 *删除文件
 *
 * */

var fs = require('fs');
if (fs.existsSync('path/pathin1/pathin2/2.txt')) {
    fs.unlink('path/pathin1/pathin2/2.txt', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('删除成功');
        }
    });
}

/*
 * fs.stat 查看文件的状态
 *
 * 在返回对象的属性列表中：
 * stats.size 文件大小
 * stats.atime :access time 最后的访问时间
 * stats.mtime :modify time 最后的修改时间
 * stats.ctime :create time 最后的创建时间
 * stats.birthtime: 出生时间（永远不会变）
 *
 * 在该对象中可以使用：
 * stats.isDirectory(); 判断是否是目录
 * stats.isFile();  判断是否是文件
 *
 * */
fs.stat('fs.js', function (err, stats) {
    if (err) {
        console.log(err);
    } else {
        console.log(stats.isFile());
        console.log(getSize(stats.mtime));
    }
});

fs.lstat('fs.js',function(err,stats){
    console.log(stats);
});

/*
 * 封装一个字节大小函数
 * */
function getSize(size, unit) {
    if (size < 1024 || unit == null) {
        return size + '字节'
    }
    var getKb = parseFloat(size / 1024).toFixed(2);
    var getMb = parseFloat(getKb / 1024).toFixed(2);

    switch (unit) {
        case 'kb':
            return getKb + 'kb';
            break;
        case 'mb':
            return getMb + 'mb';
            break;
        default:
            console.log('单位错误~');
            break;
    }
}

/*
 * fs.realpath('1.txt',function(err,path){
 *
 * });
 * 获取文件的绝对路径
 * 如果文件不存在会报错，存在返回绝对路径
 * */
fs.realpath('test', function (err, path) {
    if (err) {
        console.log(err);
    } else {
        console.log(path);
    }
});

/*
 * fs.rename(oldName,newName,function(err){})
 * 文件重命名
 * 该方法有'剪切'操作，可以直接重命名并将文件移到新文件下
 * 如果文件不存在会报错
 * */

fs.rename('oldname.txt', 'rename.txt', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('重命名成功');
    }
});


/*
 * fs.truncate(filename,newSize,function(err){
 *
 * })
 * 将文件截取到指定大小
 *
 * */
var filename = 'truncate.txt';
fs.stat(filename, function (err, stats) {
    if (err) {
        console.log(err);
    } else {
        console.log('截取前的大小为：' + stats.size);
        fs.truncate(filename, 5, function (err) {
            if (err) {
                console.log(err);
                console.log('截取失败');
            } else {
                console.log('截取成功');
                fs.stat(filename, function (err, stats) {
                    console.log('截取后的文件大小' + stats.size);
                })
            }
        })
    }
});

