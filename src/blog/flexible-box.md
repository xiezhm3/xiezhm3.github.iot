## Flex Box 
*Edited Sat Sep 29 2018*
> Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

```
.box {
    display: flex | inline-flex;
    display: -webkit-flex; /*Safari*/
}
```
> 设为Flex布局之后，子元素的*float*, *clear*和*vertical-align*属性将失效。

**Basic Concepts**

- **Flex Container** （Flex 容器）：采用Flex布局的元素，称为"容器"
- 它的所有子元素自动成为容器成员，称为Flex item（Flex项目）；

**容器的属性**

- **flex-direction**：row | row-inverse | column | column-reverse 决定主轴的方向
- **flex-wrap**: nowrap | wrap | wrap-reverse 默认情况下，项目都排在一条线上，flex-wrap定义如果一条轴线排不下如何换行。
- **flex-flow**：flex-direction和flex-wrap属性的简写形式，默认值为 row nowrap.
- **justify-content**：flex-start | flex-end | center | space-between | space-around | space-evenly 定义了项目在主轴上的对齐方式
- **align-items**：flex-start | flex-end | center | baseline | stretch 定义项目在交叉轴上如何对齐;如果**项目未设置高度或设为auto**，将占满整个容器的高度
- **align-content**：flex-start | flex-end | center | space-between | space-around | stretch 定义多根轴线的对齐方式；如果项目只有一根轴线，该属性不起作用

**项目的属性**

- **order**: 定义项目的排列顺序；数值越小排列越靠前，默认为0
- **flex-grow**: 定义项目的放大比例，默认为0，即如果有剩余空间，也不放大
- **flex-shrink**:定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
- **flex-basis**:定义在分配多余空间之前，项目占据的主轴空间（main size）。浏览器据此计算主轴是否有多余空间。默认值为 auto，即项目的本来大小。
- **flex**: flex-grow flex-shrink 和 flex-basis的缩写，默认值为 0 1 auto; 后两个属性可选；两个快捷值：**auto**(1 1 auto) 和 **none**(0 0 auto)
- **align-self**:允许单个项目有与其他项目不一样的对齐方式，可覆盖flex-items属性；默认值为 auto, 表示继承父元素的align-items属性，如果没有父元素，相当于 stretch

**For more details, css-tricks.com has [a guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).**
