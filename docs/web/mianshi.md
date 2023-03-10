# 前端常见面试题

## js 深拷贝浅拷贝有哪几种方式?

- 使用递归的方式实现深拷贝
- 通过 jQuery 的 extend 方法实现深拷贝

  ```js
  var array = [1, 2, 3, 4];
  var newArray = $.extend(true, [], array);
  ```

- JSON.stringify
  有四大缺陷
  1. 对象中有时间类型的时候，序列化之后会变成字符串类型。
  2. 对象中有 undefined 和 Function 类型数据的时候，序列化之后会直接丢失。
  3. 对象中有 NaN、Infinity 和-Infinity 的时候，序列化之后会显示 null。
  4. 对象循环引用的时候，会直接报错。

## 判断数组的几种方式

```
let arr = [];
Array.isArray(arr)
Object.prototype.toString.call(arr) === '[object Array]'
Object.getPrototypeOf(arr) === Array.prototype
Array.prototype.isPrototypeOf(arr)
arr.constructor === Array
arr instanceof Array
typeof arr
```

- typeof 返回一个对象的类型的名字，即返回一个字符串
- instanceof 用来判断左边的值是否属于右边的类型，返回布尔值 true 或 false（严谨地说是：“左值是否为右值的实例”）
- constructor 则比较单纯，返回当前对象的构造方法

### Object.prototype.toString.call()

**原理:**

- 每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [Object type]，其中 type 为对象的类型。
- 但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用 call 或者 apply 方法来改变 toString 方法的执行上下文。

**优点:**

这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。

```js
const an = ["Hello", "An"];
an.toString(); // "Hello,An"
Object.prototype.toString.call(an); // "[object Array]"
Object.prototype.toString.call("An"); // "[object String]"
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call(Symbol(1)); // "[object Symbol]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call({ name: "An" }); // "[object Object]"
```

## instanceof

**原理:**

- instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

- 使用 instanceof 判断一个对象是否为数组，instanceof 会判断这个对象的原型链上是否会找到对应的 Array 的原型，找到返回 true，否则返回 false。

- [] instanceof Array; // true

**缺点:**

- 但 instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

- [] instanceof Object; // true
- new Date() instanceof Object //true
- new Object() instanceof Object //true
- {} instanceof Object //true
- new Object() instanceof Array //false

### Array.isArray

功能：用来判断对象是否为数组

### instanceof 与 isArray

当检测 Array 实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以检测出 iframes

```js
var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length - 1].Array;
var arr = new xArray(1, 2, 3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr); // true
Object.prototype.toString.call(arr); // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```

### Array.isArray() 与 Object.prototype.toString.call()

Array.isArray()是 ES5 新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

```js
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
}
```

### 伪数组

定义：

1. 拥有 length 属性，其它属性（索引）为非负整数(对象中的索引会被当做字符串来处理，这里你可以当做是个非负整数串来理解)
2. 不具有数组所具有的方法

**伪数组，就是像数组一样有 length 属性，也有 0、1、2、3 等属性的对象，看起来就像数组一样，但不是数组，比如**

```js
var fakeArray = {
  length: 3,
  0: "first",
  1: "second",
  2: "third",
};

for (var i = 0; i < fakeArray.length; i++) {
  console.log(fakeArray[i]);
}
```

常见的伪数组 arguments，DOM 对象列表（比如通过 document.getElementsByTags 得到的列表），jQuery 对象（比如 $("div")）。

```js
// 伪数组是一个 Object，而真实的数组是一个 Array
fakeArray instanceof Array === false;
Object.prototype.toString.call(fakeArray) === "[object Object]";

//常用于将伪数组转换为数组
Array.prototype.slice.call(arguments);
```

## prototype 和 **proto**

- 原型对象 prototype
  - 每个函数都有一个 prototype 属性，可以称之为**显式原型属性**。
- 每个实例对象都有一个 **proto**属性，可以称之为**隐式原型属性**。
- 实例对象的隐式原型的值和其构造函数的显式原型的值所对应。
  - f.**proto** === F.prototype
- prototype 用于构造函数
- **proto**用于原型链查找

[prototype 和**proto**原型链：参考-非常好](https://blog.csdn.net/weixin_44384728/article/details/125951909)

## 改变 this 指向 call apply bind

```
apply  最多两个参数   新this  和 一个数组（多个参数都写入数组）
call   多个参数      新this  和参数   多个参数逗号隔开
bind   参数和call一样

bind是返回对应函数，便于稍后调用，apply、call是立即调用；
bind()方法会创建一个原函数的拷贝，并拥有指定的 this 值和初始参数，称为绑定函数，不会改变原函数。所以一般需要接受返回的新函数
```

### apply

```js
/*
 * 编写代码让f1继承f2的所有成员
 * */
function fn1() {
  this.a1 = 1;
  this.b1 = 2;
  fn2.apply(this); //改变this指向   将fn1的this传入fn2  代替fn2的this
}

function fn2() {
  this.a2 = 3;
  this.b2 = 4;
}

var f1Obj = new fn1();
console.log(f1Obj.a1); //1
console.log(f1Obj.a2); //3
console.log(f1Obj.b1); //2
console.log(f1Obj.b2); //4

var f2Obj = new fn2();
console.log(f2Obj.a1); //undefined
console.log(f2Obj.a2); //3
console.log(f2Obj.b1); //undefined
console.log(f2Obj.b2); //4
```

### bind

```js
/*
 * 编写代码让f1继承f2的所有成员
 * */

function example0() {
  function fn1() {
    this.a1 = 1;
    this.b1 = 2;
    fn2.bind(this); //
  }

  function fn2() {
    this.a2 = 3;
    this.b2 = 4;
  }

  var f1Obj = new fn1();
  console.log(f1Obj.a1); //1
  console.log(f1Obj.a2); //undefined
  console.log(f1Obj.b1); //2
  console.log(f1Obj.b2); //undefined

  var f2Obj = new fn2();
  console.log(f2Obj.a1); //undefined
  console.log(f2Obj.a2); //3
  console.log(f2Obj.b1); //undefined
  console.log(f2Obj.b2); //4
}

//    example0 ()
```

```html
<div id="example1">
  <button id="button">我是小按钮</button>
  <text id="text">我是text</text>
</div>
```

```js
function example1() {
  var button = document.getElementById("button"),
    text = document.getElementById("text");
  button.onclick = function () {
    alert(this.id); // 弹出text
  }.bind(text);
}
//    example1 ()
```

```js
/*由于ie6~ie8不支持bind  模拟bind   */
//http://blog.csdn.net/u014267183/article/details/52610600
function example2() {
  if (!function () {}.bind) {
    Function.prototype.bind = function (context) {
      var self = this,
        args = Array.prototype.slice.call(arguments); //把arguments这个类数组转化为真正的数组副本args    slice就是这么牛逼
      //arguments  中包含第一个参数 this
      return function () {
        return self.apply(context, args.slice(1)); //从1开始,把this排除  slice返回的是一个新数组
      };
    };
  }

  var button = document.getElementById("button"),
    text = document.getElementById("text");
  button.onclick = function () {
    alert(this.id); // 弹出text
  }.bind(text);
}
example2();
```

```js
// bind在react中的应用场景
constructor(props) {
    super(props);
    /*第三种绑定this的方式*/
    this.say3 = this.say3.bind(this, "我是参数1张三", "我是参数2李四")
}
```

### call

```js
/*
 * 编写代码让f1继承f2的所有成员
 * */
function fn1() {
  this.a1 = 1;
  this.b1 = 2;
  fn2.call(this); //改变this指向   将fn1的this传入fn2  代替fn2的this
}

function fn2() {
  this.a2 = 3;
  this.b2 = 4;
}

var f1Obj = new fn1();
console.log(f1Obj.a1); //1
console.log(f1Obj.a2); //3
console.log(f1Obj.b1); //2
console.log(f1Obj.b2); //4

var f2Obj = new fn2();
console.log(f2Obj.a1); //undefined
console.log(f2Obj.a2); //3
console.log(f2Obj.b1); //undefined
console.log(f2Obj.b2); //4
```

```js
var obj = { name: "李四", age: 20 };
function foo(a, b) {
  document.writeln(this.name);
  document.writeln(a);
  document.writeln(b);
}
// 改变this引用为obj，同时传递两个参数
foo.call(obj, 12, true); // 李四 12 true
```

```js
//常用于将伪数组转换为数组
Array.prototype.slice.call(arguments);
```

[参考](https://www.cnblogs.com/pssp/p/5215621.html#1)

## ES5/ES6 的继承除了写法以外还有什么区别？

### 区别一 : **proto**指向不一致

ES5 原型链继承里的
`child.__proto__ === Function.prototype`

ES6 的 class 里的
`child.__proto__ === Parent //子类可以直接通过 proto 寻址到父类`

### 区别二 :子类 this 生成顺序不同

- ES5 和 ES6 子类 this 生成顺序不同。
- ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，
- ES6 的继承先生成父类实例，再调用子类的构造函数修饰父类实例

## js 七种继承方式介绍及优缺点

### class 继承

Class 可以通过 extends 关键字实现继承

ES6 规定，子类必须在 constructor()方法中调用 super()，否则就会报错。这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用 super()方法，子类就得不到自己的 this 对象。

### 原型链继承

**将 Children 的原型对象指定为 Parent 的实例:**
`Children.prototype = new Parent();`

- 优点：

```
    写法简单、容易理解。
```

- 缺点：

```
    1、引用类型的值会被所有实例共享；

    2、在子类实例对象创建时，不能向父类传参；
```

```js
//原型链继承
function Parent() {
  this.parentPrototype = "parent prototype";
  //验证这种继承方法的确定，如果父类示例中存在一个引用类型的属性，将会被所有子类共享
  this.parentObj = {
    info: "我是 parent 引用属性parentObj中的 info",
  };
}

function Children() {}
//将Children的原型对象指定为Parent的实例，通过原型链，将Parent中的属性赋值给Children示例
Children.prototype = new Parent();
const a = new Children();
console.log(a.parentPrototype); // parent prototype
//缺点
const b = new Children();
//在a示例中改动继承的引用属性
a.parentObj.info = "我是a示例中 引用属性parentObj中的 info";
//b与a示例共享引用属性
console.log(b.parentObj.info); // 我是a示例中 引用属性parentObj中的 info
```

```js
//函数Dog  继承   函数speak
function Dog(name) {
  this.name = name;
  this.type = "Dog";
}
Dog.prototype.speak = function () {
  alert("wang");
};
var doggie = new Dog("jiwawa");
doggie.speak(); //wang
```

### 构造函数继承

**主要是在子类中通过 call 或者 apply 指向父类**
`function Children() {
  Parent.call(this);
}`

- 优点：

```
    1.避免了子类示例共享引用属性的情况

    2.可以在实例化时给 Parent 构造函数传递参数
```

- 缺点：

```
   如果Parent中存在一个函数，那么每次实例化Children的时候，
   都会创建一个同样函数，函数的复用性就难以体现
```

```js
function Parent() {
  this.parentPrototype = "parent prototype";
  this.obj = {
    info: "parent obj info",
  };
  this.fn = function () {
    console.log("打印功能");
  };
}

function Children() {
  Parent.call(this);
}

const a = new Children();
console.log(a.parentPrototype); // parent ptototype

//缺点 此时Parent()会再次创建一个fn函数，这个是没有必要的
const b = new Children();
a.obj.info = "a obj info";
//优点 避免了子类实例共享引用属性
console.log(b.obj.info); // parent obj info;
```

### 组合继承（原型继承+构造继承）

- 优点：

```
    融合原型链和借用构造函数的优点，是js中最常用的继承方式；
    避免了子类共享引用属性同时避免了父类构造函数重复对function属性的创建
```

- 缺点：

```
   无论什么情况下，父类构造函数都会被调用两次，一是创建子类原型对象时，二是子类构造函数内部。
```

```js
function Parent() {
  this.parentPrototype = "我是Parent 中的属性";
}
//Parent中的方法，在原型上定义
Parent.prototype.pFn = function () {
  console.log("我是Parent中的方法");
};

function Children() {
  //Parent中的属性仍然在构造函数中继承
  Parent.call(this);
}
//将Children的原型对象赋值为 Parent实例，这样Parent中的方法也能够被Children继承
Children.prototype = new Parent();
const c = new Children();
console.log(c.parentPrototype); //我是Parent 中的属性
c.pFn(); //我是Parent中的方法
```

### 原型式继承（注意：是原型式而非原型链，这种方法使用较少）

- 优点：

```
   不需要单独创建构造函数
```

- 缺点：

```
   和原型链继承一样，后代实例会共享父类引用属性
```

```js
function objFn(o) {
  o.objFnPrototype = "我是 objFnPrototype";
  function F() {}
  F.prototype = o;
  return new F();
}

let a = objFn({
  name: "name1",
});
console.log(a.name); //name1
console.log(a.objFnPrototype); //我是 objFnPrototype
```

### 寄生式继承

- 优点：

```
   不需要单独创建构造函数
```

- 缺点：

```
   1、方法在构造函数中，每次创建实例对象时都会重新创建一遍。
   2、和原型链继承一样，parent中的引用属性，会被所有示例共享
```

```js
function createObje(obj) {
  let clone = Object.assign(obj); //接受到对象后，原封不动的创建一个新对象
  clone.prototype1 = "我是新增的prototype1"; //在新对象上新增属性，这就是所谓的寄生
  return clone; //返回新对象
}
const parent = {
  parentPrototype: "parentPrototype",
};
//c实例，就继承了parent的所有属性
let c = createObje(parent);
console.log(c.parentPrototype); //parentPrototype
```

### 寄生组合继承

- 优点：

```
   高效率只调用一次父类构造函数，并且避免了子类原型对象上不必要、多余的属性，
   同时，还能将原型链保持不变，因此能使用instanceof 和 isPrototypeOf。
```

- 缺点：

```
   代码复杂
```

```js
function inherProto(superType, subType) {
  //拷贝一个超类的原型副本
  let proto = {
    ...superType.prototype,
  };
  //将原型的超类副本作为子类的原型对象，也就是第一种中的原型链继承方式，只不过继承的是超类原型的副本
  subType.prototype = proto;
  //这一步比较迷，官方的说法是，我们在拷贝超类的原型的时候，拷贝的proto对象，将会丢失默认自己的构造函数，也就是superType，
  //所以我们这里将它的构造函数补全为subType。貌似不做这一步也没啥问题，但是缺了点东西可能会有其他的副作用，所以还是补上
  proto.constructor = subType;
}

function Super() {
  this.superProto = "super proto";
  this.colors = ["red", "yelloy"];
}

function Sub() {
  this.subProto = "sub proto";
  this.name = "sub name";
  //这里还是借用构造函数的套路
  Super.call(this);
}
Super.prototype.getName = function () {
  console.log(this.name);
};
//这里要在定义完Super的属性后执行，因为继承的是超类原型的副本，与Super.prototype是两个对象，在这之后再改变Super.prototype，就已经不会在影响到Sub所继承的副本超类原型对象了
inherProto(Super, Sub);

let a = new Sub();
console.log(a.getName);
```

### 补充： Object.create 继承

```js
var obj = Object.create({ name: "johan", age: 23 }); // obj 继承了属性name 和 age
var obj2 = Object.create(null); // obj2 不继承任何属性和方法
var obj3 = Object.create(Object.prototype); // 与 {} 和 new Object() 一个意思
var obj4 = Object.create(
  {},
  {
    property1: {
      value: true,
      writable: true,
    },
  }
); // 第二个参数与 Object.defineProperties() 一致
```

```js
var banana = {
  color: "yellow",
  getColor: function () {
    return this.color;
  },
};
//创建对象sub_banana
var sub_banana = Object.create(banana);
console.log(sub_banana.color); //yellow
console.log(sub_banana.getColor()); //yellow
```

## Object.create 和 new obj()的区别

所创建对象继承的原型不同：

- new Object()的原型继承内置对象 Object；
- 而 Object.create()的原型则是继承指定对象，新创建对象本身并没有直接继承 Object.prototype 的属性和方法。
- 当 Object.create()的必传参数 proto 为 null 时，则会创建以 null 为原型的对象，没有继承 Object.prototype 的任何对象方法

```js
// Object.create的实现核心代码
Object.create = function (o) {
  var F = function () {};
  F.prototype = o;
  return new F();
};
```

```js
// new obj()的核心实现代码:
var o1 = new Object();
o1.[[Prototype]] = Base.prototype;
Base.call(o1);
```

## CommonJS, AMD, CMD,ES6 模块化是什么及区别

**现在一般只有 CommonJS 和 ES6 模块化了**

- CommonJS 是服务器端 js 模块化的规范，NodeJS 是这种规范的实现。
  - exports module.exports require。
- AMD(异步模块定义)和 CMD(通用模块定义)都是浏览器端 js 模块化的规范。

  - 1.AMD 规范 => 只需要引入 requireJs 库即可在浏览器直接使用

  - 2.CMD 规范 => 只需要引入 seaJs 库即可在浏览器直接使用

- ES6 模块化采用静态编译，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西

[参考](https://www.cnblogs.com/beyonds/p/8992619.html)
