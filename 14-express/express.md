## express

### middleware 中间件的用法

- 中间层函数
- use 方法不仅可以调用中间件，还可以根据请求的网址，返回不同的网页内容
- 中间件的放置顺序很重要，等同于执行顺序。而且，中间件必须放在HTTP动词方法之前，否则不会执行。

```
app.use(function(request, response, next){
    if(request.url == '/'){
        response.send('welcome to the homepage');
    }else{
        next();
    }
})
app.use(function(request, response, next) {
　　if(request.url == "/about") {
　　　　response.send("Welcome to the about page!");
　　}else {
　　　　next();
　　}
});
app.use(function(request, response) {
　　response.send("404 error!");
});

```

### request

> req.post 获取主机名
> req.path 获取url的路径名

> req.query 获取get请求路径参数的对象属性，包括被解析过的请求参数对象，默认为{}
  value = req.query.参数名

        请求地址为:/shoes?order=desc&shoe[color]=blue&shoe[type]=converse
        req.query.order 获取query的值了

> req.param 和req.query一样，通过req.param 我们也可以获取被解析过的请求参数对象的值
  value = req.param('参数名');

        请求地址为：/user/mike
        app.get('/user/:name',function(req,res){
            console.log(req.param(name));
         })

> req.params 是可以解析包含着复杂命名路由规则的请求对象的属性
        value = req.params.参数名

        app.get('/user/:name/:id',function(req,res){    //假设请求的地址为 /user/mike/123
            console.log(req.params.id);
        })

### response

> res.send() 方法向浏览器发送一个响应信息，并可以智能处理不同类型的数据；
    res.send([body|status],[body]);

    1、当参数为一个String的时候，Content-type默认设置为'text/html';

    res,send('hello world'); //hello world

    2、当参数为array或json express会返回一个json

    res.send([1,2,3]);  //[1,2,3]

    3、参数为Number 时，Express会帮你设置一个响应体，比如，200返回字符OK 等

> res.download(); 提示下载文件

> res.end(); 终结响应处理流程

> res.json(); 发送一个JSON格式的响应

> res.jsonp();

> res.redirect(); 重定向请求

> res.render(); 发送各种类型的响应

> res.sendStatus(); 设置状态码


### body-parse

    express 获取form表单文本信息的中间件

    bodyParser.json();  支持json格式文件
    bodyParser.urlencoded({extended:true}); 支持 url-encoded数据

    使用req.body 获取数据

### multer

    express 处理文件上传的中间件

### express 处理各种请求的时候

    get  => req.param.xxx

    post => 使用multer、body-parse 插件

    ajax => 提交的方法必须和后台一致，然后使用body-parse插件



