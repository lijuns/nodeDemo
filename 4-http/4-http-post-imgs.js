var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var formidable = require('formidable');
var path = require('path');
/*
 * todo
 * 接受post提交的数据
 * 提交的数据类型可能是字符串，json，图片等
 *
 * */

var server = http.createServer(function (request, response) {
    var url = request.url;
    if (url == '/') {
        fs.createReadStream('./test/register2.html').pipe(response);
    } else if (url == '/favicon.ico') {
        response.end('file cant find!');
    } else if (url == '/reg') {
        var parser = new formidable.IncomingForm();
        //获取多张图片
        parser.parse(request, function (err, fields, files) {

            //获取文本信息
            var filenames = [];
            var username = fields.name;
            var paw = fields.password;

            for (var filename in files) {
                fs.createReadStream(files[filename].path).pipe(fs.createWriteStream('./upload/' + new Date().getTime() + '.' + path.extname(files[filename].name)));
                filenames.push('/upload/' + files[filename].name);
            }

            //响应
            console.log(filenames);
            response.end(JSON.stringify(filenames));

        })
    }
});

server.listen(3000);
