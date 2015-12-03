## Stream 流

    Stream把较大的数据，拆成很小的部分。只要命令部署了Stream接口，就可以把一个流的输出接到另一个流的输入。
    Node引入了这个概念，通过Stream为异步读写数据提供的统一接口。无论是硬盘数据、网络数据，还是内存数据，都可以采用这个接口读写。

    1、读写文件的有两种方式：

    一：一种方式是同步处理，即先将数据全部读入内存，然后处理。它的优点是符合直觉，流程非常自然，
        缺点是如果遇到大文件，要花很长时间，可能要过很久才能进入数据处理的步骤

    二：Stream方式，它是系统读取外部数据实际上的方式，即每次只读入数据的一小块，像“流水”一样。
    所以，Stream方式就是每当系统读入了一小块数据，就会触发一个事件，
    发出“新数据块”的信号，只要监听这个事件，就能掌握进展，做出相应处理，这样就提高了程序的性能。

    2、Stream 接口的特点：

        Stream接口最大特点就是通过事件通信，具有readable、writable、drain、data、end、close等事件，
    既可以读取数据，也可以写入数据。
    读写数据时，每读入（或写入）一段数据，就会触发一次data事件，全部读取（或写入）完毕，触发end事件。如果发生错误，则触发error事件。

    3、其他

        一个对象只要部署了Stream接口，就可以从读取数据，或者写入数据。
    Node内部很多涉及IO处理的对象，都部署了Stream接口，比如HTTP连接、文件读写、标准输入输出等。

## 基本用法

```
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        res.end(data);
    });
});
server.listen(8000);
```

> 上面的代码有一个问题，那就是它必须将整个data.txt文件读入内存，然后再输入。
 如果data.txt非常大，就会占用大量的内容。一旦有多个并发请求，操作就会变得非常缓慢，
 用户不得不等很久，才能得到结果。

> http的连接的request是一个可读Stream接口，response是一个可写接口

```
    var http = require('http');
    var fs = require('fs');
    var server = http.createServer(function (req, res) {
        var stream = fs.createReadStream(__dirname + '/data.txt');
        stream.pipe(res);
    });
    server.listen(8000);
```

## 可读流具有的方法、成员和事件

### Readable Stream 可读流

> 事件
- 'data' 事件的回调函数参数默认情况下是一个Buffer对象，如果使用的 setEncoding() 则参数为一个字符串；
- 'error'  数据接收的过程中发生任何错误时，此事件被触发；
- 'end' 数据接收完毕后，流的读取已结束
- 'close' 当底层的文件描述符被关闭时触发此事件，并不是所有流都会触发这个事件。

> 属性
- stream.readable 这是一个布尔值，默认值为true； end 或 error 发生后，这个属性将变成false;

> 方法
- stream.setEncoding(encoding); 默认为Buffer对象，设置编码方式 utf8 ascii base64；
- stream.pause(); 暂停'data'事件；
- stream.resume(); 回复被pause() 调用暂停的'data'事件触发；
- stream.destroy(); 关闭底层的文件描述符，流将不会再触发任何事件；
- stream.pipe(destination[,options]);

    用于将这个可读流和destination目标可写流连接起来，
    传入这个流中的数据将会写入到destination流中。
    通过在必要时暂停和恢复流，来源流和目的流得以保持同步。

### Writable Stream 可写流

> 事件

- 'drain' 事件，write()方法被调用并返回false之后，此事件被触发说明内核缓冲区已空，再次写入是安全的。
- 'error'，发生错误时触发
- 'close' 文件关闭，底层文件描述符被关闭时被触发；
- 'pipe' 可写流作为参数传给一个可读流的pipe方法时触发；

> 属性

- stream.writeable 布尔值默认是true 。在error事件触发或end()/destroy()方法被调用是此属性被设置为 false;

> 方法

- stream.write(string,encoding='utf8'[,fd]);  使用指定编码encoding 将字符串string 写入流中，如果字符串被成功写入内核缓冲区，
    此方法返回true。如果内核缓冲区已满，】此方法返回false，数据将在以后被送出。当内核缓冲区再次被清空后'drain'事件将被触发。
    encoding参数默认为'utf8'`。
- stream(buffer);
- stream.end();






