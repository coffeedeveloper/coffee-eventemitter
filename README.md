# 一个简易的事件对象

专门用于给对象添加订阅事件功能

## API说明

### 初始化

原生对象继承

```js
var foo = Object.create(SimpEvent);

//如果是比较低级一点的浏览器或者说有用到jQuery或者lodash之类的类库，可以用extend方法
var boo = $.extend({}, SimpEvent);
var bar = _.extend({}, SimpEvent);
```

函数继承
```js
function Foo() {
}

Foo.prototype = SimpEvent;
Foo.prototype.constructor = Foo;

var foo = new Foo();
```


### on

注册事件监听事件，`on(事件名称，处理函数)`

```js
foo.on('test', function() {
  console.log(arguments);
});
```

### once

同`on`，只是会触发一次

### off

取消监听事件，`off(事件名称，处理函数)`，如果不带处理函数则取消该事件下的所有监听函数。

特别注意**匿名函数**是不可以取消的。

```js
function haha() {}

foo.on('haha', haha);
foo.off('haha', haha);
```

### emit

触发监听函数，`emit(事件名称, 参数)`。

```js
foo.emit('haha', 1, 2, 3);
```
