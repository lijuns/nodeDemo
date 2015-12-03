var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

/*
 * 接受post提交的数据
 * 提交的数据类型可能是字符串，json，图片等
 *
 * */

var server = http.createServer(function (request, response) {
    var url = request.url;
    if (url == '/') {
        fs.createReadStream('./test/register.html').pipe(response);
    } else if (url == '/favicon.ico') {
        response.end('file cant find!');
    } else if (url == '/reg') {
        request.setEncoding('utf8');
        var result = '';
        request.on('data', function (chunk) {
            result += chunk;
        });
        request.on('end', function (err) {
            if (err) {
                console.log(err);
            } else {
                if (request.headers['content-type'] == 'application/json') { //获取content-type，以对应返回响应的数据 注意获取content-type都小写
                    request.body = JSON.parse(result);
                } else if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
                    request.body = querystring.parse(result);
                }
                response.setHeader('Content-Type','text/html;charset=utf8');
                response.end(JSON.stringify(request.body));
            }
        })
    }
});

server.listen(3000);