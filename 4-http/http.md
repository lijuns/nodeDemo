### http 超文件传输协议

- 报文
- url 是通过统一资源标识符来标识的 url uri

### 如何获取客户端的请求？

- 获取url 和 查询字符串； request.url
- 获取请求的方法   request.method
- 获取请求头： request.headers

### 如何给客户端响应？

- 设置响应码：response.statusCode = 404;
- 写入数据：response.write();
- 写入响应头：response.setHeader('age','6');
- 多写响应头：response.writeHead(200,{name:'tyh',age:6});


    注意 ：response.writeHead();必须写在 response.write()之前，否则会报错；


