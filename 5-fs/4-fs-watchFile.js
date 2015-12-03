/*
 * 监听文件，发生改变，触发回调
 * current 当前的状态
 * previous 修改之前的状态
 *
 * Date.parse(dataString); 用于分析一个包含日期的字符串，并返回该日期与1970年1月1日之间相差的毫秒数
 *
 * */

var fs = require('fs');

var func1 = function (curr, prev) {
    console.log(curr);
    if (Date.parse(prev.ctime) == 0) {
        console.log('文件被创建');
    } else if (Date.parse(curr.ctime) == 0) {
        console.log('文件被删除了');
    } else {
        console.log('被修改了');
    }
};

var func2 = function () {
    console.log('我也监听了');
};

fs.watchFile('watchFile.txt', {interval: 1000}, func1);
fs.watchFile('watchFile.txt', {interval: 0}, func2);

setTimeout(function () {
    fs.unwatchFile('watchFile.txt', func2);
}, 3000);

