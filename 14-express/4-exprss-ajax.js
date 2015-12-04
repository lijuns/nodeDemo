/*
 * express 处理post请求
 * */

//导入组件
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//设置模板引擎
app.set('view engine', 'html'); //设置模板类型
app.set('views', 'view');
app.engine('.html', require('ejs').__express);

app.use(express.static(__dirname + '/view'));
app.use(bodyParser.urlencoded({extended: false}));

//路由控制
app.get('/', function (req, res) {
    res.render('reg2', {'title': '测试多图上传2222'});
});

app.post('/reg', function (req,res) {
    console.log(req.body);  //获取ajax提交的数据
    var arr = [1,2,3];
    res.send(arr);  //给ajax success 返回的数据
});

//错误页面处理要放在最后
app.use(function (req, res, next) { //设置错误页面
    res.status(404).end('Sorry cant find that!');
});

app.listen(3000);