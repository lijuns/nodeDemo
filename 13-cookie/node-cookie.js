/*
 * 1、cookie 是web服务器向浏览器发送的一段ASCII文本
 * 2、客户端一旦收到cookie，浏览器会保存在本地 key=value格式
 * 3、以后客户端向服务器发请求，都需要把之前的cookie发给服务器
 *
 * 设置cookie的属性
 *
 * key=value
 * 名称=值，这个是必须的参数
 *
 * path：指定该域名下的路径才具有该 cookie
 *  Path = /a; 当前目录下的 /a 路径
 *
 * domain：指定该域名下下 才具有该cookie
 *  Domain = school.infonx.com
 *
 * expires|max-age :指定cookie的失效时间，如果没有指定失效时间，那么cookie不会写入硬盘
 *  Expires = new Date(new Date().getTime()+3600*1000.toGMCString());   //单位为毫秒
 *  Max-age = '20'; //单位为秒
 *
 * httpOnly
 *  如果值为true, 表示不能在js中操作cookie
 *
 *
 * */

var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if ('/favicon.ico' == pathname) {
        return res.end('404');
    } else if (pathname == '/write') {
        /*
        * 设置cookie
        * */
        res.setHeader("Set-Cookie", ["name=tyh;Max-age=20","age=18","test=abc"]);
        res.writeHead(200, {'Content-Type': 'text/html'});

        res.end('hello');
    } else {
        var cookie = req.headers.cookie;
        var cookieObj = querystring.parse(cookie, '; ');
        res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
        if (cookieObj.name) {
            res.end('欢迎老朋友');
        } else {
            res.end('欢迎新朋友');
        }
    }

});

server.listen(3000);