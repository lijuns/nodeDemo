/*
 * 二: 非流动模式，暂停模式
 *
 * */
var fs = require('fs');
var rs = fs.createReadStream('test/65.txt');
var arr = [];

rs.on('readable', function () {
    var data;
    while (null != (data = rs.read())) {  //从缓冲区里读取1个字节，可以传参数表示要读取多少个字符
        arr.push(data);
        console.log(data.length);
    }
});

rs.on('end', function () {
    var b = Buffer.concat(arr);
    console.log(b.length);
});
