## Notes @ Chapter 06 Symbol

### `创建Symbol`

> 所有原始值，除了 Symbol 以外都有各自的字面形式。

可以通过全局的 Symbol 函数创建一个 Symbol：

    let firstName = Symbol();
    const person = {
        [firstName]: 'Nicolas'
    };
    console.log(person[firstName]);

> 由于 Symbol 是原始值，因此不能使用 new 来调用，否则会出错。

Symbol 接受一个可选参数，用于描述即将创建的 Symbol:

    let firstName = Symbol('first name');

    console.log(firstName); // 'Symbol(first name)'

Symbol 的描述被存储在内部的[[Description]]属性中，只有当调用 Symbol 的 toString()方法时才能读取这个属性。注意不能使用 （“” + Symbol()）的方式。

#### `辨识Symbol`

    let symbol = Symbol('test');
    console.log(typeof symbol); // 'symbol'

### `Symbol的使用方法`

> 所有使用可计算属性名的地方，都可以使用 Symbol。

    let firstName = Symbol('first name');

    let person = {
        [firstName]: 'Nick'
    };

    // read only
    Object.defineProperty(person, firstName, {
        writable: false
    });

    let lastName = Symbol('last name');

    Object.defineProperties(person, {
        [lastName]: {
            value: 'Zakas'
            wirtable: false
        }
    });

### `Symbol共享体系`

可以在不同的代码中共享一个 Symbol => Symbol.for('id')

    let uid = Symbol.for('uid');
    let obj = {};

    obj[uid] = '123';

    console.log(obj[uid]); // '123'
    console.log(uid); // 'Symbol(uid)'

> Symbol.for()方法首先在全局 Symbol 注册表中搜索键值为‘uid’的 Symbol 是否存在。如果存在，直接返回已有的 Symbol；否则，创建一个新的 Symbol，并使用这个键在 Symbol
> 全局注册表中注册，然后返回新创建的 Symbol。

可以使用 Symbol.keyFor()在 Symbol 全局注册表中检索与 Symbol 有关的键：

    let uid = Symbol.for('uid');
    console.log(Symbol.keyFor(uid)); // 'uid'

    let uid2 = Symbol.for('uid');
    console.log(Symbol.keyFor(uid2)); // 'uid'

    let uid3 = Symbol('uid');
    console.log(Symbol.keyFor(uid3)); // undefined *

### `Symbol与强制类型转换`

使用 toString()方法输出[[Description]]属性信息； 不能使用字符串拼接； 不能强制转换为数字类型；逻辑操作符=> 等价为 true

### `Symbol属性检索`

Object.keys() => 返回所有可枚举的属性名；

Object.getOwnPropertyNames() -> 不考虑属性的可枚举性一律返回

但是这两个方法都不支持 Symbol 属性：

---> Object.getOwnPropertySymbols(): 返回一个包含所有 Symbol 自有属性的数组：

    let uid = Symbo.for('uid');
    let obj = {
        [uid]: '123'
    };
    let symbols = Object.getOwnPropertySymbols(obj);

    symbols[0]; // 'Symbol(uid)'

> 所有对象一开始都没有自己独有的属性，但是对象可以从原型链中继承 Symbol 属性。

### `well-known Symbol`

#### `Symbol.hasInstance`

> 一个在执行 instanceof 时调用的内部方法，用于检测对象的继承信息：
>
> 每个函数都有一个 Symbol.hasInstance 方法，用于确定对象是否为函数的实例；
>
> 为了确保 Symbol.hasInstance 不会被以外重写，该方法被定义为不可写，不可配置以及不可枚举

    let obj = [];

    obj instanceof Array;
    // 等价于
    Array[Symbol.hasInstance](obj);

假如想定义一个无实例的函数，可以将 Symbol.hasInstance 的返回值硬编码为 false:

    function MyObj = {
        // ...
    };

    Object.defineProperty(MyObj, Symbol.hasInstance, {
        value: function(v) {
            return false;
        }
    });

    let obj = new MyObj();

    console.log(obj instanceof MyObj); // false

即使 obj 确实是 MyObj 的实例，但是调用 instanceof 返回 false
