/*
 * 创建Buffer的三种方式
 * 1、new Buffer(size); 创建一个长度为size的buffer对象
 * 2、new Buffer(Array); 从数组中创建buffer对象
 * 3、new Buffer(String); 新建一个保存指定字符串的buffer对象
 *
 * */

/*
 * 将一个utf8的字符串写入buffer
 * buf.write(string, offset, length, encoding);
 * string 是要写入的字符串
 * offset 写入的起始位置
 * length 要写入的长度
 * encoding 编码方式
 * */

var buf = new Buffer(256);
len = buf.write('珠峰培训');
console.log(len);


/*
 * buffer转化为字符串
 * buffer.toString();
 *
 * buffer连接
 * buffer.concat([buf1,buf2],length);
 * */
var buf1 = new Buffer([0xe7, 0x8f, 0xa0, 0xe5, 0xb3, 0xb0, 0xe5]);
var buf2 = new Buffer([0x9f, 0xb9, 0xe8, 0xae, 0xad]);
console.log(buf1.toString());
console.log(buf2.toString());
Buffer.concat([buf1, buf2], 12);
console.log(Buffer.concat([buf1, buf2], 12).toString());

/*
 * buffer拷贝
 * 在两个buffer之间执行内存拷贝
 * buffer.copy(targetBuffer,targetStart,sourceStart,sourceEnd=buffer.length);
 *
 * */

Buffer.prototype.cp = function (targetBuffer, targetStart, sourceStart, sourceEnd) {
    targetStart = targetStart || 0;
    sourceStart = sourceStart || 0;
    sourceEnd = sourceEnd || this.length;

    var count=0;
    var newBuffer = new Buffer(sourceEnd);
    for (var i = sourceStart; i < sourceEnd; i++) {
        newBuffer[count++] = this[i];
    }

    for (var i = 0; i < newBuffer.length; i++) {
        targetBuffer[targetStart++] = newBuffer[i];
    }
    return targetBuffer.toString();
};

var zf1 = new Buffer('w上海');
var zf2 = new Buffer('安徽合肥');
console.log(zf1.cp(zf2, 6));

/*
* Buffer 在处理上传较大文件或者未知大小文件时
* */