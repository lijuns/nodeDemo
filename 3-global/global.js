/*
 * global 对象
 * __filename
 * __dirname
 *
 * */
global.a = 'hello world http';
var http = require('http');

http.createServer(function (request, response) {

    response.writeHead('Content-Type', 'text/html;charset=utf-8');//设置解析文件模式

    response.write(a);
    response.write(__filename + '\n' + __dirname);
    response.end();

}).listen(3000);

