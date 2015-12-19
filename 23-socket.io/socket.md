## socket.io

### 服务端事件

### 客户端事件

### 如何发消息

> 不包括发送者

    不包括发送者
    socket.emit('message','xxxxxxx');

    除发送者其他人都能收到广播信息
    socket.broadcast.emit('message','xxxx');

     向game房间内发送消息,除了发送者该房间内的所有人都可以收到
     socket.broadcast.to('game').emit('message','xxxxxx');

> 包括发送者

    发送给包括发送者在内的所有人
    io.sockets.emit('message', "this is a test");

    发送给包括发送者在内的game房间内的所有人
    io.sockets.in('game').emit('message', 'cool game');

    向特定的人发消息
    io.sockets.socket(socketid).emit('message','xxxxxxx');

> 不分房间

    socket.emit
    socket.emit信息传输对象为当前socket对应的client，各个client socket相互不影响。

    socket.broadcast.emit
    socket.broadcast.emit信息传输对象为所有client，排除当前socket对应的client。

    io.sockets.emit
    信息传输对象为所有client






