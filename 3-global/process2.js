/*
 * 1、事件环
 * node执行顺序
 * process.nextTick(); setImmediate;都是
 * sync > process.nextTick > setImmediate >io (sync)
 *
 * 推荐使用setImmediate代替 setTimeout()
 * 2、console 对象
 * console.time(timer); console.timeEnd(timer); 统计时间
 * */

var fs = require('fs');

console.time('timer');
//异步获取文件信息
fs.readFile('./http/1.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log('来自readFile的信息：' + data);
    }
});

//添加测速代码
var sum = 1;
for (var i = 1; i < 100; i++) {
    sum *= i;
}
console.log('总和是：'+sum);


//setImmediate
setImmediate(function () {
    console.log('来自 setImmediate的信息： ok \n');
    process.nextTick(function () {
        console.log('来自 setImmediate中 nextTick的信息');
    })
});

//process.nextTick
process.nextTick(function () {
    console.log('来自process.nextTick的信息： yes i am \n');
});

//同步获取信息
var data = fs.readFileSync('./http/1.txt', 'utf-8');
console.log(
    '来自readFileSync的信息：' + data
);

console.timeEnd('timer');