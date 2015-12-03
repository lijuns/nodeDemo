### jade 简明教程

### API
> 标签

    普通标签 html        => <html></html>

    带id标签 div#main    => <div id="main"></div>

    带id和class标签 div.user-detail  => <div class="user-detail"></div>

                    div#foo.bar.baz  => <div class="bar baz" id="foo"></div>

    省略div的标签
    #foo
    .var        ==> <div id="foo"></div><div class="var"></div>


> 标签文本

    短文本  p wahoo  => <p>wahoo</p>

    长文本     p
                | foo baz bar
                | shjshjhsjhj sss
                | super cool
    数据绑定  {username}    转义 \不解析 {}

    内联标签及属性  label
                     span 用户名
                     input(type="text",placeholder='请输入用户名')

                   注意：如果使用 | 表示只包含文本信息


> 注释

    单行注释  //
    如果注释不需要解析 加一个短横 -       => //-

    块注释
        //
            换行写代码，为多行注释

> 写法

    块级嵌套
        ul.first
            li
                a(href="#") foo
            li
                a(href="#") baz

    块展开

        ul
            li.first: a(href="#") foo
            li:a(href="#") bat
            li.last:a(href="#") baz

### 过滤器

### 代码

    jade 支持三种类型的可执行代码

    第一种前缀 - ，这是不会输出的
    - var foo = 'bar';
    - for (var key in obj)
      p = obj[key]

    - if(foo)
        ul
            li yyyaya
            li aolioao
            li kjkjkjk
    - else
        p oh no !didnt work

    第二种转义输出的代码，比如我们的返回值，只要前缀一个 =

    - var foo = 'bar';
    = foo
    h1 = foo






