# SimpleScroller
一个不依赖任何第三方框架库的简易垂直轮播组件

## 快速开始 ##

+ 直接从上面下载
+ 克隆项目：https://github.com/YunyChan/SimpleScroller.git

## 使用 ##

首先在页面中引入`SimpleScroller.js`JS文件

```html
<script src="SimpleScroller.js"></script>
```

然后通过创建SimpleScroller的实例并传入相应的参数来插入并使用组件

```html
<div id="scroller"></div>
<script src="SimpleScroller.js"></script>
<script>
    var oData = [{
        name: 'test1',
        age: 15
    }, {
        name: 'test2',
        age: 20
    }, {
        name: 'test3',
        age: 25
    }, {
        name: 'test4',
        age: 30
    }, {
        name: 'test5',
        age: 35
    }
    ];
    var oScroller = new SimpleScroller({
        height: 50,
        scrollHeight: 18,
        data: oData,
        item: function(nIndex, oData){
            return 'Name：' + oData.name + ' & Age:' + oData.age + '.';
        }
    }).render(document.getElementById('scroller'));
    oScroller.run();
</script>
```

下面是组件的配置参数说明：


+ `height` - __必须__, 视窗高度
+ `scrollHeight` - __必须__, 滚动高度
+ `unit` - _default: px_, 样式单位px/rem
+ `data` - __必须__, 数据源
+ `item` - __必须__, 每项模板
+ `interval` - _default: 4000_, 轮播间隔（单位ms）
+ `animationDuration` - _default: 1000_, 动画时长（单位ms）

APIs
* `render(DOM)` - 渲染组件
    * `DOM` - 需要插入组件的DOM元素对象
* `run()` - 启动轮播
* `stop()` - 暂停轮播

## 作者 ##

Yuny Chan

+ [GitHub：https://github.com/YunyChan](https://github.com/YunyChan)
+ [博客：http://yuny.me/](http://yuny.me/)