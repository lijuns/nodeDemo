/**
 * base64编码是把3个8位字节(3*8=24) 转化为4个6位字节(4*6=24)
 * 1. 得到16进制的数字
 * 2. 把16进制转成10进制
 * 3. 把10进制转成二进制
 * 4. 把8位字节拆成6位字节，每字节前面加00
 * 5. 把6位字节转成10进制
 * 6. 用此10进制数字作为索引取得对应的字符拼成一个字符串就是最终的base64编码
 */

var fs = require('fs');
var util = require('util');
var parseInts = [];
fs.readFile('base64/man.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        for (var i = 0; i < data.length; i++) {
            parseInts.push(data[i].toString(2));
        }
    }
    console.log(parseInts);
    var str = parseInts.join('');
    for (var i = 0; i < str.length; i++) {
        if (i % 6 == 0) {
            str[i] = '00' + str[i];
        }
    }
});