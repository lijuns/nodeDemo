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


var urlencodedParser = bodyParser.urlencoded({extended: true});

//路由控制
app.get('/', function (req, res) {
    res.render('reg', {title: '测试ejs'});
});

//接受get|post数据
app.post('/reg', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.query.id);
    console.log(req.body);
    res.send('welcome, ' + req.body.username);
});

//错误页面处理要放在最后
app.use(function (req, res, next) { //设置错误页面
    res.status(404).end('Sorry cant find that!');
});

app.listen(3000);