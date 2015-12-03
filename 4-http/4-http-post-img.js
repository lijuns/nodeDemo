var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var formidable = require('formidable');
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
        var parser = new formidable.IncomingForm;

        parser.parse(request, function (err, fields, files) {
            //获取文本信息
            var username = fields.name;
            var paw = fields.password;

            console.log(files);
            //获取上传的文件
            var filepath = files.avatar.path;
            var filename = files.avatar.name;

            //读取文件内容并将文件拷贝到upload 目录下
            fs.createReadStream(filepath).pipe(fs.createWriteStream('./upload/' + filename));

            //给客户端响应
            response.end(username + ' ' + paw + ' ' + filename);
        })
    }
});

server.listen(3000);
