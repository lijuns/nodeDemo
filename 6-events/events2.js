var events = require('events');
var util = require('util');

function Girl() {

}

function Boy(name, response) {
    this.name = name;
    this.response = response;
}

util.inherits(Girl, events.EventEmitter);
var g1 = new Girl();

var b1 = new Boy('小王', function () {
    console.log(this.name + '送来了鸡腿');
});

var b2 = new Boy('小明', function () {
    console.log(this.name + '送来了乌龟');
});

var b3 = new Boy('老王', function () {
    console.log(this.name + '送来了香吻');
});

//注册事件
g1.addListener('ele', function () {
    b1.response();
    b2.response();
});

//绑定事件
g1.emit('ele');

//定义绑定响应的个数
g1.setMaxListeners(3);

//增加绑定
g1.addListener('ele', b3.response);

//注册了一个新的监听事件，会触发这个事件·
g1.on('newListener', function (events) {

});
