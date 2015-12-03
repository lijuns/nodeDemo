var fs = require('fs');

/*
 * fs 同步、异步读取文件
 * 读取文件时的options参数，encoding：编码方式
 * flag: 标识的主要参数
 *
 * O_RDONLY 只读
 * 0_SYNC 同步
 * O_RDWR 可读可写
 * ...
 *
 * */
var readData1 = fs.readFileSync('rename.txt', {encoding: 'utf-8'});
console.log(readData1);

fs.readFile('rename.txt', {encoding: 'utf-8', flag: 'r'}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

/*
 * fs 写入文件
 * - fs.writeFile(path,data,encoding,callback);
 *   data 可以有很多种数据类型
 *   直接使用Buffer也可以
 *
 *  注意：如果没有path node会自动创建文件
 *
 * fs 写入追加文件
 * - fs.appendFile(path,data,encoding,callback);
 * - 只是语法糖，它是fs.writeFile('filename',data,{encoding:xxx,flag:'a'});的封装
 *
 * 以下两个方法均已不推荐使用： 推荐使用 fs. stat
 * fs.existsSync(path); 同步判断文件是否存在
 * fs.exists(path,callBack); 异步判断文件是否存在，其返回值作为 callback的参数传过来
 *
 * fs.mkdir(); 创建文件目录，特别注意文件夹的写法
 * fs.mkdirSync(); 同步创建文件夹
 *
 * */

var data = fs.readFileSync('./test/1.txt');

fs.writeFile('./test/target.txt', data, 'utf-8', function () {
    console.log('文件拷贝成功~');
});


fs.appendFile('./test/2.txt', data, 'utf-8', function () {
    console.log('文件追加成功');
});


fs.exists('test/upload', function (exists) {
    if (!exists) {
        fs.mkdir('test/upload', function () {
            fs.writeFile('./test/upload/copy.txt', data, 'utf-8', function () {
                console.log('文件拷贝至新建文件夹成功');
            });
        });
    }
});

/*
 * fs.readdir(path,callback);
 * fs.readdirSync(path);
 * 读取文件夹，返回该文件夹下直接目录中的所有文件夹和文件
 * 如果读取不存在的文件夹，会报错
 * */
fs.readdir('path', function (err, files) {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
    }
});

/*
 * fs.readFile 完整读取文件的流程
 *  1、打开一个文件，得到打开文件的索引
 *  process.stdin process.stdout process.stderr    默认文件描述符
 *  0                    1          2
 *
 *  2、读取文件
 *   fd      文件描述符
 *   buffer  从文件中读到哪个缓存区中
 *   offset  向缓存区中写入数据时的开始位置
 *   length  从文件中读取多少直接
 *   position 从文件中读取到的时候的开始位置
 *
 *  3、关闭文件
 *
 * */

fs.open('rename.txt', 'r', function (err, fd) {
    if (err) {
        console.log(err);
    } else {
        var buffer = new Buffer(256);
        fs.read(fd, buffer, 0, 100, 0, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(buffer.toString() + '文件读取过程~');
                fs.closeSync(fd);
            }
        })
    }
});