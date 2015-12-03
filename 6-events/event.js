/*
 * @event 事件模块
 * */

var events = require('events');
var util = require('util');
var colors = require('colors'); // colors模块 给控制台加点颜色看看
function Light() {

}
util.inherits(Light, events);
var greenLight = new Light();


function Action(name) {
    this.name = name;
}
Action.prototype.run = function () {
    console.log(this.name + '赶紧跑起来~');
};
Action.prototype.wait = function () {
    console.log(this.name + '安静的等在路口~');
};

var oMan = new Action('小明');
var oCar = new Action('玛莎拉蒂');

/*
 * 给继承events的对象绑定事件
 * eventEimtter.on(event,callback);
 * obj.on();
 * obj.addListener();
 *
 * */
greenLight.on('on', function () {
    console.log('绿灯亮了\n'.green);
    oCar.run();
    oMan.wait();
});

greenLight.addListener('off', function () {
    console.log('红灯亮了\n'.red);
    oCar.wait();
    oMan.run();
});

/*
* 只绑定一次事件，发射之后即销毁
* obj.once(events,fn);
*
* 移除所有的绑定事件
* obj.removeAllListeners();
*
* 设置最大监听数量
* obj.setMaxListeners(int);
*
* 移除指定的事件
* obj.removeListener(event,listen);
*
* */
greenLight.once('broken', function () {
    console.log('oh,华克，灯坏了');
    greenLight.removeAllListeners();
});

/*
 * 发射（触发）事件
 * obj.emit(); 发射事件
 *
 * */

greenLight.emit('on');

setTimeout(function () {
    greenLight.emit('off');
}, 2000);


greenLight.emit('broken');


