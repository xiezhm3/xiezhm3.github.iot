# 两种appendChild方式性能比较

*@created Sun Sep 30 2018* @JX

一般而言，很多技术博客或者官方文档都会推荐在添加子元素的时候，使用document.createDocumentFragment()的方式，
减少回流的次数，提升页面的性能体验。

但是，总是有这么一个但是，经过我实际的测试（chrome 69 mac version）发现，其实两者的performance是差不多的，
当我循环添加一百万个节点的时候，两者的区别不大，只有4s的差距，具体可以看以下：


[!APPENDCHILD AT ONCE]()

[!APPENDCHILD ]()


