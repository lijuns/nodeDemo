### 指令

- ng-app angular  解析入口

- ng-model    数据模板

        1、angular 加载完成之后会启动，首先找ng-app指令
        2、找到后认为 ng-app 里面的所有内容都归angular管理
        3、找子层标签里的所有指令，然后可以找到ng-model
        4、生成数据模型，挂到根作用域上
        5、然后里面所有的标签都可以读取 ng-model上的数据


- ng-bind     数据绑定（angular解析完再显示）

        使用{{}} 花括号语法时，浏览器因为要先加载页面，渲染它，再angularjs才能把它解析成你期望的内容；
        所以对于首个页面的数据绑定操作，和建议采用ng-bind

- ng-click,ng-mousedown，ng-mouseover  （ng事件）

- ng-hide （DOM显示隐藏）

- ng-repeat (name in names)  （ng循环）

- ng-repeat  | filter:query   （ng 过滤器）

- ng-include  （ng include 参数如果是字符串要加上单引号  ''）

- ng-class 动态自定义dom元素的className

> 创建指令

    1、必须使用模块的 directive(); 方法注册服务
    2、必须用对象工厂的方式/ factory 方法定义服务实现
    3、对象工厂必须返回一个指令定义对象

    angular.module('directiveName',directiveFactory);

    指令对象的常用属性如下：

    template:string; 使用template 指定的html标记替换指令内容；
    restrict:string; 用来限定指令在html模板出现的位置；
        E 可以作为html元素使用
        A 可以作为html 属性使用
        C 可以作为css类使用
        M 可以在html注释中使用

    replace:true|false; 指明template的替换方式；
        true表示替换元素本身

    scope:true | false; 是否创建私有作用域；
    link:function(){scope,element,attrs}; 指令中操作DOM树，实现数据绑定
    transclude:true | false | 'element'; 允许指令包韩版其他html元素

### mvvm

    不要试图去复用controller,一个控制器一般只负责一小块视图
    不要在controller中操作DOM，这不是控制器的职责，是指令的职责。
    不要在controller里做数据格式化，ng有很好用的过滤器实现此功能。
    不要在controller里面做数据过滤操作，ng有 $filter 服务
    一般来说，controller 是不会互相调用的，控制器这间的交互是通过事件进行的。

    向父级递事件，向子级传递事件

### 依赖注入


### 引导过程

### 服务


### 过滤器

> 565556 | currency:￥; 使用 currency 过滤

> 378787 | date:'yyyy-MM-dd hh:mm:ss EEEE' 年月日 小时 分钟 秒 星期

> 'ababs'| filter:'query';  根据query 过滤数组数据中字符串内容

> jsonTest | json  没有参数，将json转化为json字符串，可以作为调试使用

> array | limitTo:2 (限制数组长度或字符串长度)

> string | lowercase 转化成小写

> string | uppercase 转化成大写

> number | number:2; 格式化为数字，带参数表示精确的小数位数

> array | orderBy:age 数组根据某个属性值进行排序

### 路由

### 表单验证

> form 上要加上name属性
> form 标签上加 novalidate 属性，这将禁止浏览器自带的验证功能，从而使用angular的验证
> 所有输入的字段可以进行基本的验证，比如 最大长度、最小长度

    必填：required
    最小长度： ng-minlength 最小长度
    最大长度：ng-maxlength 最大长度
    正则匹配：ng-pattern = '/a-zA-Z/';

    email验证：type=emial
    数字验证 ：type=number
    url验证：type=url

    自定义验证：比如实现验证用户名是否可用（在数据库中不重复）

```
var app = angular.module('validationExample', []);

app.directive('ensureUnique', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {
        $http({
          method: 'POST',
          url: '/api/check/' + attrs.ensureUnique,
          data: {'field': attrs.ensureUnique}
        }).success(function(data, status, headers, cfg) {
          c.$setValidity('unique', data.isUnique);
        }).error(function(data, status, headers, cfg) {
          c.$setValidity('unique', false);
        });
      });
    }
  }
}]);

```
> advance skill

    未修改过的表单： formName.inputFieldName.$pristin  返回 true表示未修改 false表示已修改；

    修改的表单： formName.inputFieldName.$dirty 当且仅当用户实际已经修改过的表单，不管表单是否验证通过；

    经过验证的表单：formName.inputFieldName.$valid  布尔型属性，它指示表单是否通过验证，验证通过返回true

    未通过验证的表单：formName.inputFieldName.$invaild 未通过验证的表单

    错误：formName.inputfieldName.$error  验证失败返回true 成功返回true

    无害的样式：

    .ng-pristine{};     原始的
    .ng-dirty{};        修改过
    .ng-valid{};        验证通过
    .ng-invaild{};      字段无效
    .ng-invalid-required
    .ng-invalid-minlength
    .ng-valid-max-length

    示例：
    <span class="glyphicon glyphicon-ok form-control-feedback" ng-show="formSign.name.$dirty && formSign.name.$valid"></span>
    <span class="glyphicon glyphicon-remove form-control-feedback" ng-show="formSign.name.$pristine || formSign.name.$invalid"></span>












