## Notes @Chapter 09 class

### `1.为何使用类语法`

> 类声明仅仅是基于已有自定义类型声明的语法糖。typeof PersonClass 最终返回的结果是"function",所以 PersonClass 声明实际上创建了一个具有构造函数方法行为的函数。

但是类与自定义类型之间存在一下的差异：

    · 函数声明可以被提升，而类声明与 let 声明类似，不能被提升；真正执行声明语句之前，它们会一直存在临时死区中；
    · 类声明中的所有代码将自动运行在严格模式下，而且无法强行让代码脱离严格模式执行；
    · 类中所有方法都是不可枚举的，而在自定义类型中需要通过Object.defineProperty()方法手工指定某个方法不可枚举；
    · 每个类都有一个名为[[Construct]]的内部方法，通过关键字new调用那些不含[[Construct]]的方法会导致程序抛出错误；
    · 使用除了new关键之以外的方式调用类的构造函数会导致程序抛出错误；
    · 在类中修改类名会导致程序出错。

### `2. 类表达式`

#### `基本的类表达式`:类表达式不需要标识符在类后。

    let PersonClass = class {
        constructor(name) {
            this.name = name;
        }
        sayName() {
            console.log(this.name);
        }
    };

#### `命名类表达式`

    let PersonClass = class PersonClass2 {
        constructor(name) {
            this.name = name;
        }
        sayName() {
            console.log(this.name);
        }
    };
    typeof PersonClass; // 'function'
    typeof PersonClass2; // 'undefined'

> 在上面的实例中，类表达式被命名为 PersonClass2, 由于标识符 PersonClass2 只存在于类定义之中，因为它可以被用在像 sayName()中，而在类的外部，由于不存在一个名为 PersonClass2 的绑定，因而 typeof PersonClass2 的值为'undefined'.

即：

    let PersonClass = (function() {
        'use strict';
        const PersonClass2 = function(name) {
            if(typeof new.target === 'undefined') {
                throw new Error('need to use new');
            }
            this.name = name;
        }
        Object.defineProperty(PersonClass2.prototype, 'sayName', {
            value: function() {
                if(typeof new.target !== 'undefined') {
                    throw new Error('cannot use new to call');
                }
                console.log(this.name);
            },
            enumerable: false,
            writable: true,
            configurable: true
        });
        return PersonClass2;
    }());

### `3. 作为一等公民的类`

> 在程序中，一等公民是指一个可以传入函数，可以从函数返回，并且可以赋值给变量的值。

    function createObject(classDef) {
        return new ClassDef();
    }
    let obj = createObject(class {
        sayHi() {
            console.log('hi!');
        }
    });
    obj.sayHi(); // 'hi!'

另一种是通过立即调用类构造函数可以创建单例。

    let person = new class{
        constructor(name) {
            this.name = name;
        }
        sayName() {
            console.log(this.name);
        }
    }('Nicolas');
    person.sayName(); // 'Nicolas'

### `4. 访问器属性`

> 类支持直接在原型上定义访问器属性。

    class CustomHTMLElement {
        constructor(element) {
            this.element = element;
        }
        get html() {
            return this.element.innerHTML;
        }
        set html(value) {
            this.element.innerHTML = vaule;
        }
    }

等价于：

    let CustomHTMLElement = (function() {
        'use strict';
        const CustomHTMLElement = function(element) {
            if(typeof new.target === 'undefined') {
                throw new Error('use new !');
            }
            this.element = element;
        };
        Object.defineProperty(CustomHTMLElement.prototype, 'html', {
            enumerable: false,
            configurable: true,
            get: function() {
                return this.element.innerHTML;
            },
            set: function(value) {
                this.element.innerHTML = value;
            }
        });
        return CustomHTMLElement;
    }());

### `5. 可计算成员名称`

    let propertyName = 'html';
    class CustomHTMLElement {
        constructor(element) {
            this.element = element;
        }
        get [propertyName]() {
            return this.element.innerHTML;
        }
        set [propertyName](value) {
            this.element.innerHTML = vaule;
        }
    }

### `5. 生成器方法`

> 在对象字面量中，可以通过在方法名前附加一个星号(\*)的方式来定义生成器，在类中也是如此，可以将任何方法定义为生成器。

    class MyClass{
        *createIterator() {
            yield 1;
            yield 2;
        }
    }

如果你的类是用来表示值的集合，那么为它定义一个默认迭代器会更有用。通过 Symbol.iterator 定义生成器方法即可为类定义默认迭代器：

    class Collection {
        constructor() {
            this.items = [];
        }
        *[Symbol.iterator]() {
            yield *this.items.values();
        }
    }
    var collection = new Collection();
    collection.items.push(1);
    collection.items.push(2);
    collection.items.push(3);
    for(let x of collection) {
        console.log(x); // 1 2 3
    }

### `6. 静态成员`

静态方法注释： static

类中所有的方法和访问器属性都可以用 static 关键字来定义，唯一的限制是不能将 static 用于定义构造函数方法。

    class PersonClass {
        constructor(name) {
            this.name = name;
        }
        sayName() {
            // ...
        }
        static create(name) {
            return new PersonClass(name);
        }
    }

### `7. 继承与派生类`

es5 继承方式：

    function Parent(name) {
        this.name = name;
    }
    Parent.prototype.getName = function() {
        return this.name;
    };

    function Child(name, age) {
        Parent.call(this, name);
        this.age = age;
    }
    Child.prototype = Object.create(Parent.prototype, {
        constructor: {
            value: Child,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    var child = new Child('Nick', 24);

es6:

    class Parent {
        constructor(name) {
            this.name = name;
        }
        getName() {
            return this.name;
        }
    }
    class Child extends Parent {
        constructor(name, age) {
            super(name);
            this.age = age;
        }
    }
    var child = new Child('Nick', 24);

> 可以看到使用 class 可以更加轻松的实现继承，但注意这其实是一个语法糖。

> 继承自其他类的类被称作派生类。如果在派生类中指定了构造函数则必须要调用 super(),否则程序会出错。如果选择不使用构造函数，则当创建新的类实例时会自动调用 super()并传入所有参数。

    class Child extends Parent {
        // no constructor here
    }

    // equal to
    class Child extends Parent {
        constructor(...args) {
            super(...args);
        }
    }

#### `super()小贴士`

    · 只可在派生类的构造函数中使用super(),否则会报错；
    · 在派生类构造函数中访问this之前一定要调用super(), 它负责初始化this，如果在调用super()之前尝试访问this会导致程序出错；
    · 如果不想调用super(),唯一的办法是让类的构造函数返回一个对象。

#### `类方法遮蔽`

即派生类中的同名方法会覆盖基类的方法。如果想使用基类中的方法，则使用 super.[methodName]()即可。

    class Parent {
        constructor(name) {
            this.name = name;
        }
        getName() {
            return this.name;
        }
    }
    class Child extends Parent {
        constructor(name, middleName) {
            super(name);
            this.middleName = middleName;
        }
        getName() {
            return super.getName() + this.middleName;
        }
    }

> 使用 super 引用，this 值会被自动正确设置，然后就可以进行简单的方法调用。

#### `静态成员继承`

    class Parent {
        constructor(name) {
            this.name = name;
        }
        getName() {
            return this.name;
        }
        static create(name) {
            return new Parent(name);
        }
    }
    class Child extends Parent {
        constructor(name, age) {
            super(name);
            this.age = age;
        }
    }
    var child = Child.create('ddd');
    child instanceof Parent; // true
    child instanceof Child; // false

### `派生类自表达式的类`

> 只要表达式可以被解析为一个函数并且具有[[Construct]]属性和原型，那么就可以使用 extends 进行派生。

    function Parent(name) {
        this.name = name;
    }
    Parent.prototype.getName = function() {
        return this.name;
    };

    class Child extends Parent {
        constructor(name, age) {
            super(name);
            this.age = age;
        }
    }

> extends 强大的功能使得类可以继承自任意类型的表达式。例如动态地确定类的继承目标：

    function Parent(name) {
        this.name = name;
    }
    Parent.prototype.getName = function() {
        return this.name;
    };

    function getBase() {
        return Parent;
    }

    class Child extends getBase() {
        constructor(name, age) {
            super(name);
            this.age = age;
        }
    }

由于可以动态确定使用哪个基类，因而可以创建不同的继承方法：

    let SerializableMixin = {
        seriliaze() {
            return JSON.stringify(this);
        }
    };

    let AreaMixin = {
        getArea() {
            return this.length * this.width;
        }
    };

    function mixin(...args) {
        var base = function() {};
        Object.assign(base.prototype, ...args);
        return base;
    }

    class Square extends mixin(SerializableMixin, AreaMixin) {
        constructor(length) {
            super();
            this.length = length;
            this.width = length;
        }
    }

### `内建对象的继承`

在 es5 以及之前的版本中，使用继承的方式继承的内建对象的派生类的行为无法和内建对象保持一致。

如数组：

    var a = [];
    a.push(1);
    a.length; // 1
    a.length = 0;
    console.log(a[0]); // 'undefined'

    // ES5 继承数组
    function MyArray() {
        Array.apply(this, arguments);
    }
    MyArray.prototype = Object.create(Array.prototype, {
        constructor: {
            value: MyArray,
            enumerable: true,
            configurable: true,
            writable: true
        }
    });
    var arr = new MyArray();
    arr[0] = 'll';
    console.log(arr.length); // 0

    arr.length = 0;
    console.log(arr[0]); // 'll'

可以看出行为不一致。这是因为通过传统 js 继承形式石显的数组继承没有从 Array.apply()或原型赋值中继承相关功能。

而 ES6 与之不同，主要体现在两个方面：

    1. es5的继承方式是先由派生类型创建this值，然后调用基类的构造函数（Array.apply()）.这意味着，this的值一开始指向的是MyArray实例，但是随后会被来自Array的其他属性所修饰
    2. es6中的继承与之相反，先由基类（Array）创建this的值，然后派生类的构造函数再修改这个值。所以一开始可以通过this访问基类的所有内建功能，然后再正确的接收所有与之相关的功能

    class MyArray extends Array {
        // ...
    }
    var arr = new MyArray();
    arr[0] = 1;
    arr.length; // 1

    arr.length = 0;
    console.log(arr[0]); // 'undefined'

### `Symbol.species属性`

> 内建对象继承的一个实用之处是，原本在内建对象中返回实例自身的方法将自动返回派生类的实例。如下：

    class MyArray extends Array {
        // ...
    }
    let items = new MyArray(1,2,3,4),
        subItems = items.slice(1, 3);

    console.log(items instanceof MyArray); // true
    console.log(subItems instanceof MyArray); // true

> 在浏览器引擎背后是通过 Symbol.species 属性实现这一行为的。

> Symbol.species 被用于定义返回函数的静态访问器属性。被返回的函数是一个构造函数，当要在一个实例的方法中（不是构造函数中）创建类的实例时必须使用这个构造函数。

    · Array
    · ArrayBuffer
    · Map
    · Promise
    · RegExp
    · Set
    ` Typed arrays

上面的每种类型都有一个默认的 Symbol.species 属性，该属性的返回值为 this。这也意味着该属性总会返回构造函数。

自定义的类中实现此功能，大概如此：

    class MyClass {
        static get [Symbol.species]() {
            return this;
        }
        constructor(v) {
            this.value = v;
        }
        clone() {
            return new this.constructor[Symbol.species](this.value);
        }
    }

> Symbol.species 被用来给 MyClass 赋值静态访问器属性。只有 getter，没有 setter，因为不能改变类的种类。调用 this.constructor[Symbol.species]返回 MyClass.

> 通过 Symbol.species 可以定义当派生类的方法返回实例时，应该返回的值的类型。

    class MyArray extends Array {
        static get [Symbol.species]() {
            return Array;
        }
    }
    let items = new MyArray(1,2,3,4);
    let subItems = items.slice(1, 3);

    items instanceof MyArray; // true
    subItems instanceof MyArray; // false
    subItems instance of Array; // true

> 一般来说，只要想在类方法中调用 this.constructor，就应该使用 Symbol.species 属性，从而让派生类重写返回的类型。

### `在类的构造函数中使用new.target`

> new.target 会根据函数被调用的方式而改变。函数不是通过 new 调用的， new.target 为 undefined.
>
> 在类的构造函数中也可以通过 new.target 来确定类是如何被调用的。在简单的情况下，new.target 就相当于类的构造函数。

    class Parent {
        constructor() {
            console.log(new.target === Parent);
        }
    }
    var p = new Parent(); // true

> 每个构造函数都可以根据自身被调用的方式改变自己的行为。 例如可以用 new.target 来创建抽象基类：

    class Shape() {
        constructor() {
            if(new.target == Shape) {
                throw new Error('this class cannot be instanced.');
            }
        }
    }
    class Rectangle extends Shape {
        constructor(length, width) {
            super();
            this.length = length;
            this.width = width;
        }
    }

##### 因为类必须通过 new 关键字才能调用，所以在类的构造函数中，new.target 属性永远不会是 undefined.
