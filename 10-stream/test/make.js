var fs = require('fs');
fs.writeFile('65.txt', new Buffer(65 * 1024), function (err) {
    if(err){

    }else{
        console.log('文件创建成功~');
    }
});