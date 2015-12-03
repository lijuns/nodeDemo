/*
 * fs.readFile writeFile 先将文件完整的读入到缓存区
 *   1、占用内存
 *   2、速度的控制
 *
 * 流
 * 1、流是一种有序的、有起点和终点的数据传输手段；
 * 2、在网络中传输数据的时候，总是先将文件转化成流数据，也就是字节数组，
 * 再通过流的传输，到达目的地后再转成原始数据
 * 3、流是一个接口，不同的业务有不同的实现，分为可读流、可写流，可读可写流等
 *  以下均继承于 stream.Readable 类
 *  fs.readStream
 *
 *  http.IncomingMessage  客户端请求或客户端响应 request是可读流，response为可写流
 *  process.stdin
 *  process.stderr
 *
 * */

var fs = require('fs');
/*
 * fs.createReadStream(path,options);
 * 创建一个可读流
 * options参数对象可以设置：
 * start: 读取的开始位置
 * end: 读取的结束位置
 * highWaterMark: 每次读取的文件大小，默认是64 * 1024字节 = 64k ;
 *
 * */

var rs = fs.createReadStream('test/index.txt', {
    start: 2,
    end: 3

});
/*
 * 一：流动模式
 * 1. 继承EventsEmitter
 * 2. open 打开这个文件
 * 3. read 读取64k数据到buffer，并且发射data事件
 *
 *
 * */
rs.on('open', function () {
    console.log('文件被打开');
});

rs.pause();

setTimeout(function () {
    rs.resume();
}, 5000);

rs.on('data', function (data) {
    console.log(data);
});
rs.on('end', function () {
    console.log('文件读取完毕');
});

rs.on('close', function () {
    console.log('文件被关闭');
});
rs.on('error', function () {
    console.log('文件读取出错');
});
