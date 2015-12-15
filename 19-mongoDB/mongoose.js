var mongoose = require("mongoose");
//连接数据库
var db = mongoose.connect("mongodb://127.0.0.1:27017/blog");
//连接判断
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("数据库连接成功");
});

//定义集合的存储数据结构
var PersonSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    time: {type: Date, default: Date.now},
    email: {type: String, default: ''}
}, {collection: 'person'});

// 给实例定义方法
PersonSchema.method('addAge', function () {
    return ++this.age;
});

PersonSchema.method('savedb', function () {
    this.age = this.addAge(this.age);
    return this.save(function (error, doc) {
        if (error) {
            console.log("error :" + error);
        } else {
            console.log(doc);
        }
    })
});

// 创建Model
var PersonModel = db.model("person", PersonSchema);

// 创建实例
var personEntity = new PersonModel({
    name: "zfpx",
    age: 99,
    email: "zfpx@qq.com"
});

// 保存数据
personEntity.savedb();
