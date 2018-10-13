## querySelectorAll与getElementBy\*区别

*@created at Sat Oct 6, 2018 @JX*


#### 1. 规范

首先，querySelector()和querySelectorAll()是W3C的[Selectors API Level 1规范](https://www.w3.org/TR/selectors-api/)（Selectors API Level 2规范中包含了这两种之外还有find和findAll），
而getElementBy\*是W3C DOM的规范。两者所属的规范不一样。

所以这也导致了，两种方法传入的selector不一样。querySelector*传入的参数必须符合CSS Selector规范，对于ID为'#ab.c'，必须使用转义符'\\'进行转义才符合CSS Selector规范，
即'#ab\\\\.c'; 而getElementBy\*传入的参数只能是className, ID, Element。

由于支持CSS Selector语法，在选择元素的时候将会更加灵活，可以直接获取到想要的元素，而不用多余的代码，Selectors API Level 1规范里也说，
'With these methods, it is easier to match a set of Element nodes based on specific criteria, than having to 
subsequently filter the result of calling other methods like getElementsByTagName().'

    var cells = document.querySelectorAll("#score>tbody>tr>td:nth-of-type(2)"); // EXAMPLE OF THE NORMATIVE

#### 2. 返回值

首先，querySelectorAll系列返回的是[object NodeList]，而getElementsByTagName返回的值的类型是[object HTMLCollection]。

NodeList和HTMLCollection之间有什么区别和联系呢？

我们来看DOM Core规范里面是怎么写的。先上[domcore#concept-collection](https://www.w3.org/TR/domcore/#concept-collection)。

NodeList和HTMLCollection都是属于collection的范围。 

> 两者的本质上差别在于，HTMLCollection 是属于 Document Object Model HTML 规范，而 NodeList 属于 Document Object Model Core 规范。

> A collection is an object that represents a lists of DOM nodes. A collection can be either live or static. Unless otherwise stated, a collection must be live.

也就是说，默认情况下获得到的DOM nodes是'live'的。'live'的意思是说，你对目标元素的操作会反应到你之前获取到的DOM nodes collection上，如果是'static'的话，
那就是一个'snapshot'，可以理解为深度克隆了一份，你之后不管怎么操作，你之前获取到的nodelist都不会改变。

规范里面说，

> A NodeList object is a collection of nodes.

而
> An HTMLCollection object is a collection of elements.

也就是说，NodeList包含的内容会比collection多。

再看W3C Selectors level 1规范，

>The NodeList object returned by the querySelectorAll() method must be static, not live ([DOM-LEVEL-3-CORE], section 1.1.1).
 Subsequent changes to the structure of the underlying document must not be reflected in the NodeList object. 
 This means that the object will instead contain a list of matching Element nodes that were in the document at the time the list was created.

所以，querySelector系列返回的是'static'的DOM nodes collection，这个list不会随着操作dom而发生改变；而getElementBy\*系列返回的是'live'
DOM nodes collection，也就是DOM规范里面默认的属性，这个返回值可以理解为一个引用，当dom发生改变的时候，如果涉及到该collection元素，那么该collection
会发生改变。所以说是动态的（'live'）。

#### 3. 几个例子

下面的例子其实都来自W3C Selectors Level 1规范。学知识，最好的方式是看规范。（我只是搬运工...

    <html>
      <head>
        <title>Selectors API Example</title>
      </head>
      <body>
        <div id="foo">
          <p class="warning">This is a sample warning</p>
          <p class="error">This is a sample error</p>
        </div>
        <div id="bar">
          <p>...</p>
        </div>
      </body>
    </html>
    <script>
    
    var alerts = document.querySelectorAll("p.warning, p.error"); // [1]
    
    var x = document.querySelector("#foo, #bar"); // [2]
    
    var x = document.querySelector("#bar, #foo"); // [3]
    
    function handle(evt) { // [4]
      var x = evt.target.querySelector("span");
      ...
      // Do something with x
    }
    
    var div = document.getElementById("bar"); // [5]
    var p = div.querySelector("body p");
    
    var lis = document.querySelectorAll("ul.nav>li"); // [6]
    for (var i = 0; i < lis.length; i++) {
      process(lis.item(i));
    }
    
    function process(elmt) { // [7]
      elmt.parentNode.removeChild(elmt);
    }    
    </script>

[1]返回所有符合selector条件的p元素；

[2]和[3]返回根据dom tree order第一个出现的符合selector里的元素，与selector写的顺序无关；

[4]和[5]表示，querySelector会在document的范围去寻找，然后将符合条件的元素进行交集计算，看是否是当前元素的子元素，如果是的话，则返回。
如果是getElementBy\*系列，这样操作会获取不到元素，甚至报错；

[6]和[7]，由于querySelectorAll返回的是一个static collection，所以对dom的任何操作该返回值都是不会更改的。所以做for循环不用担心会陷入死循环；
[7]其实更有意思，即使将元素在dom中全部移除了，但是lis里面还是保持最初获取到的值。而这些，在getElementBy\*系列里面是实现不了的。

#### 4. 性能

其实从前面的这么多的描述就可以预测，NodeList是一个'snapshot'，要'深度克隆'一份当前目标DOM，然后返回的是nodes，而不是elements;
NodeList 对象会包含文档中的所有节点，如 Element、Text 和 Comment 等。HTMLCollection 对象只会包含文档中的 Element 节点。这个性能消耗就会比
返回elements的getElementBy\*要高了。

[JSPerf](https://jsperf.com/getelementsby-vs-queryselectorall/1)现在挂了，不知道为何，所以只好自己写点简单的测试代码来测试一下性能。

【2018-10-13update】 JSPERF IS OK NOW.

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>dif</title>
    </head>
    
    <body>
    <div id="foo">
        <p class="warning">This is a sample warning</p>
        <p class="error">This is a sample error</p>
    </div>
    <div id="bar">
        <p>...</p>
    </div>
    
    <script>
    
        window.onload = function (ev) {
    
            var times = 10000000;
    
            var s1 = new Date().getTime();
            for(var i = 0; i < times; i++) {
                document.querySelectorAll('div');
            }
            var e1 = new Date().getTime();
            console.log('querySelectorAll Time Waste: ' + (e1 - s1));
    
    
            var s2 = new Date().getTime();
            for(var i = 0; i < times; i++) {
                document.getElementsByTagName('div');
            }
            var e2 = new Date().getTime();
            console.log('getElementsByTagName Time Waste: ' + (e2 - s2));
    
            var s3 = new Date().getTime();
            for(var i = 0; i < times; i++) {
                document.querySelector('#foo');
            }
            var e3 = new Date().getTime();
            console.log('querySelector Time Waste: ' + (e3 - s3));
    
    
            var s4 = new Date().getTime();
            for(var i = 0; i < times; i++) {
                document.getElementById('foo');
            }
            var e4 = new Date().getTime();
            console.log('getElementById Time Waste: ' + (e4 - s4));
        };
    
    </script>
    </body>
    </html>

循环遍历一千万次，在chrome下测试的结果(单位：ms)：

`querySelectorAll Time Waste: 5848 `

`getElementsByTagName Time Waste: 316`

`querySelector Time Waste: 661`

`getElementById Time Waste: 271`

从结果来看，也证实了之前的猜测是正确的。

尽管相对来说querySelector的性能不佳，但是我个人还是觉得用querySlectorALL更好，一是可以减少
代码陷入死循环的可能性，另一个是它支持css selector的形式，更加灵活。在平时的dom操作过程中，这些性能
上的差异其实是可以忽略的。

欢迎提issue。：）
