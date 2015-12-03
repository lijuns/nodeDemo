/*
 * 创建一个可写流
 * fs.createWriteStream(path,{options})
 * 把数据写入到文件中，path就是目标文件，写入成功会返回true 不成功返回false;
 *
 * */

var fs = require('fs');
var out = fs.createWriteStream('./test/write.txt');

for (var i = 0; i < 1000; i++) {
    var flag = out.write(i.toString() + '\n');
    console.log(flag);
}

/*
 * 操作系统缓存区抽干的时候触发
 * */

out.on('drain', function () {
    console.log('drain===========================');
});

out.end();

