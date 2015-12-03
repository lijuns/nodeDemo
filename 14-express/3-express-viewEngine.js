var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'html');
app.set('views', __dirname + '/view');
app.engine('.html', require('ejs').__express);

var urlencodedParser = bodyParser.urlencoded({extended: true});

var users = {
    'username': 'tyh',
    'password': '123'
};

app.get('/', function (req, res) {
    res.render('index');
});

app.use(express.static(__dirname + '/view'));

app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/home', urlencodedParser, function (req, res) {
    console.log(req.url);
    res.render("home");

});

app.post('/home', urlencodedParser, function (req, res) {
    if (req.body.username == users.username && req.body.password == users.password) {
        res.status(200).send({
            message:'登录成功'
        });
    } else {
        res.end("failed",{
            message:'登录失败'
        });
    }
});


app.listen(3000);