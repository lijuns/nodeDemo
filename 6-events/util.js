/*
 * util 工具包
 *
 * child继承父类，仅仅继承公有的方法（原型上的方法）
 * util.inherits(child,parent);
 *
 * */
var util = require('util');

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.say = function () {
        console.log('my name is ' + this.name);
    }
}

Person.prototype.run = function () {
    console.log('i can run to anywhere~');
};

function Teacher() {
    this.job = '老师';
    Person.apply(this, arguments);
}

util.inherits(Teacher, Person);

var boy = new Teacher('teacher', 20);

boy.say();
boy.run();


/*
* 将任意对象转化成字符串的方法
* showHidden: 是否显示隐藏属性
* depth：显示对象的层级
* colors:终端以彩色显示
* util.inspect(obj,{showHidden:boolean,depth:int,colors:string});
* */

function Animal() {
    this.name = '喵星人';
    this.type = '猫科动物';
    this.child = {
        name: '松鼠',
        type: '灵长类猫科动物'
    };
}

var dog = new Animal();

console.log(util.inspect(dog, {showHidden: true,colors: 'red'}));

/*
* util工具类还带有很多判断数据类型的方法
* util.isArray();
* util.isObject();
* util.isRegExp();
* util.isString();
* util.isNumber();
* ↓
* ↓
* 更多请关注API文档
*
* */

