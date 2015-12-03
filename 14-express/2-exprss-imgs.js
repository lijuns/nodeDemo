/*
 * express 处理post请求
 * */

//导入组件
var express = require('express');
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();

//设置模板引擎
app.set('view engine', 'html'); //设置模板类型
app.set('views', __dirname+'/view');

app.engine('.html', require('ejs').__express);

//路由控制
app.get('/', function (req, res) {
    console.log(req.url);
    res.render('reg', {'title': '测试多图上传'});
});

app.use(express.static(__dirname+'/view'));

//设置文件上传的位置和重命名文件
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'view/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

app.post('/reg', upload.array('avatar', 2), function (req, res, next) {
    //响应客户端并渲染页面
    res.render('regshow', {
        username: req.body.username,
        password: req.body.paw,
        imgsrc: 'upload/' + req.files[0].filename
    });
});

//错误页面处理要放在最后
app.use(function (req, res, next) { //设置错误页面
    res.status(404).end('Sorry cant find that!');
});

app.listen(3000);