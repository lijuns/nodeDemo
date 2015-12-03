var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var fileName = '';

function start(request, response) {
    var url = request.url;


    if (url == '/') {
        var indexPage = fs.readFileSync('./index.html');
        response.end(indexPage);

    } else if (url == '/upload') {
        var parser = new formidable.IncomingForm;

        parser.parse(request, function (err, fileds, files) {
            //获取文本信息
            var userName = fileds.userName;
            var userPhone = fileds.userPhone;
            var userSay = fileds.userSay;

            //获取上传的文件
            var filePath = decodeURIComponent(files.myfile.path);
            fileName = decodeURIComponent(files.myfile.name);

            //读取上传文件的内容
            var fileContent = fs.readFileSync(filePath);

            //将上传文件拷贝到当前上传目录,[文件名为时间戳防止命名重复]
            fs.writeFileSync(fileName, fileContent);

            //给客户端响应
            response.end(JSON.stringify({
                    'imgSrc': fileName,
                    'userName': userName,
                    'userPhone': userPhone,
                    'userSay': userSay
                }
            ));
        });
    } else if (decodeURIComponent(url) == '/' + fileName) {
        var fileContent = fs.readFileSync('./' + fileName);
        response.end(fileContent);
    }
}

var server = http.createServer(start);
server.listen(3000);