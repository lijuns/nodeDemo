var os = require('os');
var http = require('http');
http.createServer(function (request, response) {
    if (request.url == '/') {
        response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
        response.write('系统主机名:' + os.hostname());
        response.end();
    }
}).listen(8080);

/*
*
* os 上的很多方法都是关系操作系统的，实际业务操作上用处不大，
* 以下为常用的一些：
* */
console.log({
    '操作系统默认临时文件目录': os.tmpdir(),
    'CUP的字节序(BE/LE)': os.endianness(),
    '系统主机名': os.hostname(),
    '系统类型': os.type(),
    '系统平台': os.platform(),
    'CPU架构': os.arch(),
    '操作系统运行时间': os.uptime(),
    '系统内存总量': os.totalmem(),
    '系统空闲内存': os.freemem(),
    'cpus':os.cpus()

});
/*
* os.networkInterfaces  输出网络接口的一些信息
*
* */
console.log({
    'ip地址：': os.networkInterfaces().WLAN[0].address,
    'mac地址：': os.networkInterfaces().WLAN[0].mac
});