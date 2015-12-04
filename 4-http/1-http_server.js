/*
 * @http模块
 * https://nodejs.org/api/http.html
 *
 * @fs模块：file system
 * fs.readFile(path,[options],fn); 异步读取文件
 * data = fs.readFileSync();    同步读取文件
 *
 * */

var http = require('http');
var mime = require('mime');
var path = require('path');
var fs = require('fs');

var server = http.createServer(function (request, response) {
    var url = request.url;
    if (url == '/') {
        route('index.html', response);
    } else if (url == '/favicon.ico') {
        response.end('file cant find!');
    } else {
        route(url.slice(1), response);
    }
});

server.listen(3000);

function route(url, response) {
    var type = mime.lookup(url);
    fs.readFile('./test/' + url, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            response.writeHead(200,{'Content-Type': type + ';charset=utf-8'});
            response.end(data);
        }
    });
}