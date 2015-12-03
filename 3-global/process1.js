/*
* 进程
* process 全局对象
*
* */

//标准输出流
process.stdout.write('hello i am process');

//标准输入流，监听repl数据输入
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    process.stdout.write(data);
});

/*
 * 监听终止和中断操作
 * 在终端程序中才可以查看
 * */

process.on('exit', function () {
    console.log('node really exit');
});

process.on('SIGINT', function () {
    console.log('node pause then exit');
    process.exit();
});

/*
 * process.argv
 * 返回命令行参数 数组
 *
 * */
console.log(process.argv);

/*
 * process.cwd();
 * 返回执行当前文件的命令的路径
 *
 * 改变当前进程的目录
 * process.chdir();
 *
 * */

console.log(process.cwd());
process.chdir('..');
process.stdout.write(process.cwd()+'\n');

/*
 *
 *
 * */

/*
 * process.pid(); 当前进程的pid
 * process.kill(pid); 关闭某个进程
 *
 * process.memoryUsage();  node当前消耗内存情况
 *
 * */
console.log(
    '常驻内存:'+process.memoryUsage().rss+'byte\n',
    '堆:'+process.memoryUsage().heapTotal+'byte\n',
    '堆的使用量：'+process.memoryUsage().heapUsed+'byte\n'
);

