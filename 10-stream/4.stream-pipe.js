/*
 * 自定义一个文件拷贝方法一
 * */

var fs = require('fs');
fs.simpleCopyFile = function (source, dest) {

    var stats = fs.statSync(source).size;

    var read = fs.createReadStream(source);
    var out = fs.createWriteStream(dest);
    var result = '';
    read.on('data', function (data) {
        result += data;
        console.log(parseInt(result.length / stats *100) +'%');
        out.write(data);
    });
    read.on('end', function () {
        out.end();
        console.log('100%');
    })
};

fs.simpleCopyFile('./test/copy/easyui.psd', './test/copy/dest.txt');

/*
 * 自定义文件拷贝方法2
 *
 * */
fs.standardCopy = function (source, dest) {
    var readStream = fs.createReadStream(source);
    var writeStream = fs.createWriteStream(dest);
    readStream.on('data', function (chunk) {
        if (writeStream.write(chunk) === false) {
            readStream.pause();
        }
    });

    writeStream.on('drain', function () {
        readStream.resume();
    });

    readStream.on('end', function () {
        writeStream.end();
    })
};

// fs.standardCopy('./test/copy/source.txt', './test/copy/dest.txt');

/*
 * readStream.pipe(); 管道
 *
 * */

/*
    var readStream = fs.createReadStream('./test/copy/source.txt');
    var writeStream = fs.createWriteStream('./test/copy/dest.txt');
    fs.perfectCopy = function (source, dest) {
        source.pipe(dest);
    };
    fs.perfectCopy(readStream, writeStream);

*/
