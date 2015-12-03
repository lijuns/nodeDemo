/*
 * http 建立一个客户端
 * 模拟客户端向http-post发送json数据
 * */

var http = require('http');
var options = {
    host: 'localhost',
    port: '3000',
    path: '/reg',
    method: 'POST',
    headers: {'Content-Type': 'application/json'} //务必设置请求体的文件类型，此类型为json
};

/*
 * response 是一个流对象，可读可写的流
 * */

var request = http.request(options, function (response) {
    /*
     *  客户端接受数据
     * */
    response.on('data', function (chunk) {
        console.log(chunk.toString());
    });
});

request.on('error', function (err) {
    console.log(err);
});

request.write('{"name":"tyh","age":6}');    //发送请求数据

request.end();  //真正发起向服务器的请求
