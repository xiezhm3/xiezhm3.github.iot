## 两种appendChild方式性能比较

*@created Sun Sep 30 2018* @JX

一般而言，很多技术博客或者官方文档都会推荐在添加子元素的时候，使用document.createDocumentFragment()的方式，
减少回流的次数，提升页面的性能体验。

但是，总是有这么一个但是，经过我实际的测试（chrome 69 mac version）发现，其实两者的performance是差不多的，
当我循环添加一千万个节点的时候，两者的区别不大，只有4s的差距，具体可以看以下：

###### AppendChild at once：

    window.onload = function () {
        function createDiv(text) {
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(text));
            return div;
        }
    
        var divs = [];
    
        var num = 1000000;
    
        for(var i = 0; i < num; i++) {
            divs.push(createDiv('' + i));
        }
    
        var docFrag = document.createDocumentFragment();
        for(var i = 0; i < divs.length; i++) {
            docFrag.appendChild(divs[i]); // Note that this does NOT go to the DOM
        }
    
        document.body.appendChild(docFrag); // Appends all divs at once
    
    };

![APPENDCHILD AT ONCE](https://raw.githubusercontent.com/xiezhm3/xiezhm3.github.io/master/assets/img/append-child-at-once%40screenshot.jpeg)

###### AppendChild one by one：
        window.onload = function () {
    
            var num = 1000000;
    
            var docFrag = document.createDocumentFragment();
            for(var i = 0; i < num; i++) {
                var div = document.createElement("div");
                div.appendChild(document.createTextNode(i));
                document.body.appendChild(div);
            }
        };

![APPENDCHILD ONE BY ONE](https://raw.githubusercontent.com/xiezhm3/xiezhm3.github.io/master/assets/img/append-child-one-by-one%40screenshot.jpeg)


从两幅截图来看，两者耗费的时间相差并不是特别大，在添加的数量十分大的情况下。

从底下的时间分析来看，这4s的差距实在执行js代码上面的，而不是在重流重绘上。

可以猜测，Chrome在for循环添加子元素上面，是做了优化的。【如何优化？留个坑】

其它的浏览器目前还没有测试。
