### 基础面试题

- nodejs 适合什么样的系统？
    - io密集型 √
    - 计算密集型 ×
    - 高并发 √
    - 长连接 √

- 关于模块以下说法正确的是：
    - Node程序由多个模块组成，每个模块就是一个文件。 √
    - Node模块采用CommonJS规范。 √
    - 在一个文件中通过var定义的变量都是私有的，在其他模块四不可见的。√
    - 使用exports = 'hello'; 能将该字符串导出。 ×
    - module.parent 返回一个数组，表示该模块用到的其他模块。×

- fs模块说法正确的是：
    - fs.readFileSync方法用于同步读取文件，返回一个字符串。√
    - fs.exists(path,callback); 用同步的方式一个文件是否存在。 ×
    - readdir方法用于读取目录，返回一个包含文件和子目录的数组。 √
    - 由于node是单线程所以 不可以同时读取多个文件。 ×

- 关于进程说法正确的是：
    - process对象时Node的一个全局对象，提供当前node进程的信息； √
    - process.env；返回当前进程命令行参数的数； ×
    - stdout内部调用的是 process.stderr.write();×
    - process.exit方法用来退出当前进程； √

- 关于Buffer说法正确的是：
    - Buffer是node提供的原生全局对象，可以全局使用； √
    - Buffer支持包括gbk在内的编码；   ×
    - console.log(Buffer.byteLength('我爱北京天安门'),'utf-8');会输出7; ×
    - Buffer.copy();方法会将一组Buffer对象合并为一个Buffer对象；×

- 关于event说法正确的是：
    - Node内置模块util的inherits方法实现继承后可以让子类继承父类的私有变量；×
    - on和addListener方法功能完全相同;   √
    - once类似on方法，但是回调只执行一次; ×
    - listeners方法接受一个事件名称作为参数，返回该事件所有回调函数数组的数量； ×

- nodejs版本偶数是稳定版，奇数是非稳定版
