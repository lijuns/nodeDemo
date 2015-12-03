/*
 * 会话 session
 * 辩明用户身份，每个session 需要一个sessionId
 * 服务端根据sessionId 来获取对应的session
 *
 * 1、 数据存放在客户端，客户端无法篡改
 * 2、数据不需要每次传递
 *
 * 原理解析：
 * 1、首次访问服务器的时候，服务器通过Set-Cookie 写入客户端一个id
 * 2、以后每次访问服务器，客户端都要将此sessionId 返回
 * 3、服务器需要维护sessionId和此用户的关系
 * */


var http = require('http');
var url = require('url');
var querystring = require('querystring');
var SESSION_KEY = 'sessionKey';
var session = {};
http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    var now = new Date().getTime();
    if(pathname=='/favicon.ico'){
        return res.end('404');
    }else{
        var cookie = req.headers.cookie;
        var cookieObj = querystring.parse(cookie,'; ');
        res.writeHead(200,{'Content-Type':"text/html;charset=utf-8"});

        if(cookieObj[SESSION_KEY]){
            var id = cookieObj[SESSION_KEY];
            var obj = session[id];
            if(obj){
                if(obj.mny<=0){
                    res.end("你的余额已经不足，请及时冲值");
                }else{
                    obj.mny -= 10;
                    res.end('欢迎你，老顾客，你的余额是'+obj.mny);
                }

            }else{
                var sessionId = now+'_'+Math.random();//卡号
                var sessionObj = {mny:100};//会员卡的信息
                session[sessionId] = sessionObj;
                res.writeHead(200,{'Content-Type':"text/html;charset=utf-8","Set-Cookie":SESSION_KEY+'='+sessionId});
                res.end('欢迎你，老顾客，但你的会员卡我们找不到对应关系了，再送你一张新会员卡，余额是100');
            }

        }else{//没有访问过
            var sessionId = now+'_'+Math.random();//卡号
            var sessionObj = {mny:100};//会员卡的信息
            session[sessionId] = sessionObj;
            res.writeHead(200,{'Content-Type':"text/html;charset=utf-8","Set-Cookie":SESSION_KEY+'='+sessionId});
            res.end('欢迎你，新顾客，送你一张会员卡，余额是100');
        }

    }
}).listen(3000);