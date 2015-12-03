/*
 * 关于url模块的一些用法
 * url.parse(); 解析url地址
 * url.format(); 将对象转化成字符串
 *
 * */
var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function (request, response) {
    console.log(request.method);
    var requestHeader = request.headers;
    if (request.url == '/favicon.ico') {
        response.end('file cant find~!');
        return;
    }
    var urlObj = url.parse('http://tyh:123456@infonx:3000' + request.url, true);
    fs.writeFile('header.json', JSON.stringify(requestHeader), function () {
        console.log('header.json创建成功');
    });
    fs.writeFile('urlObj.json', JSON.stringify(urlObj), function () {
        console.log('urlObj.json创建成功');
    });

    response.end('http');
});

server.listen(3000);

server.on('connection', function () {
    console.log('connect');
});

server.on('error', function (err) {
    console.log(err);
});

server.on('close', function () {
    console.log('close');
});

/*
*  keep-alive 长连接之后会自动断开连接
* */
server.setTimeout(3000, function () {
    console.log('超时了~');
});

