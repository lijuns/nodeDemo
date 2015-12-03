var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {
    var urlObj = url.parse(request.url);
    var pathname = urlObj.pathname;
    if (pathname == '/favicon.ico') {
        request.end('file cant find');

    } else if (pathname = '/') {
        console.log(response);
        fs.createReadStream('./page/form.html').pipe(response);
        response.end();
    }
}).listen(3000);