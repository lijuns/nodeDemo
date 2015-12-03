/*
 * tcp 传输进制协议，是一个可靠的面向连接传输层协议
 * 1、让数据从一台计算机传到另一个计算机；
 * 2、内置机制保障了丢包率不高，且可以控制速度；
 * 3、对字符编码完全无知；
 * 4、传输前要经过三次 ‘握手’
 * 5、当会话过程中，双方都提供一个 套接字 socket ，实现服务端和客户端的连接
 *
 * socket 是一个可读可写流，具有 on('data')方法 ， write方法，但是它读写的都是网络字节码
 *
 * */

/*
 * 下面的小例子是搭建一个简单的TCP聊天室
 *
 * */

var net = require('net');
var fs = require('fs');

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};


var chatLog = fs.createWriteStream('chat.log');
var count = 0;  //初始化聊天室人数为0
var clients = {};
function broadcast(msg) {
    for (var name in clients) {
        clients[name].write(msg);
    }
}

var server = net.createServer(function (socket) {
    socket.setEncoding('utf8');
    var nickname = '';
    count++;
    socket.write('欢迎来到聊天室，当前聊天室中有 ' + count + '个小伙伴，请设置昵称：');
    socket.on('data', function (chunk) {
        if (nickname) {
            broadcast(nickname + '：' + chunk);
            chatLog.write(chunk);
        } else {
            if (clients[chunk]) {
                socket.write('此用户名已被占用~');
            } else {
                nickname = chunk;
                clients[chunk] = socket;
                broadcast('管理员：欢迎' + chunk + '来到聊天室~')
            }
        }
    });

    socket.on('close', function () {
        console.log('close');
        count--;
        broadcast('管理员:' + nickname + '离开了聊天室~');
        socket.destroy();//销毁socket
    });

    socket.on('error', function (err) {
        console.log(err);
    })
});


server.listen(3000, function () {
    console.log('server started');
});
