var http = require('http');
var server = http.createServer(function (request, response) {
    var url = request.url;
    if (url == '/') {
        /*
         * 关于请求
         * */
        console.log(request.url);
        console.log(request.method);
        console.log(request.headers);
        console.log(request.httpVersion);
        /*
         * 关于响应
         * */
        response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        response.end('hello world');
    }
});

server.listen(3000);
