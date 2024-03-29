

## 新闻咨询 页面的制作
1. 绘制界面，使用 MUI 中的 media-list.html
2. 使用vue-resource 获取数据
3. 渲染真实数据

## 实现新闻咨询列表点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时，在跳转的时候应该提供唯一的id标识符
2. 创建新闻详情的组件页面 newinfo.vue
3. 在 路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment组件
 + `import comment from './comment.vue' `
 3. 在父组件中，使用 `components`属性，将刚才导入的 comment 组件，注册为自己的子组件
 4. 在注册子组件的时候，注册名称，以标签形式，在页面中引用即可

 ## 获取所有的评论数据，显示到页面中

 ## 实现点击加载更多事件
  1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
  2. 点击加载更多，让pageindex++ ,然后重新调用 this.getcomment()方法重新获取最新一页的数据
  3. 为了防止新数据覆盖老数据的情况，我们再点击加载更多的时候，每当获取到新数据，用该让老数据调用数组的concat方法，拼接上新数组

## 发表评论
1. 把文本框 做双向数据绑定
2. 为 发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则 Toast提示用户评论不能为空
4. 通过 vue-resource 发送一个请求，把内容提交给服务器
5. 当发表评论后，重新刷新


## 改造图片分析 按钮为路由的链接并显示对应的组件页面
## 绘制图片列表 组件页面结构并美化样式
1. 制作 顶部的滑动条
2. 制作 底部的图片列表
参考mui 里面的tab-top-webview
### 制作顶部滑动条的坑
1. 需要把slider区域的 mui-fullscreen 类去掉
2. 滑动条无法正常触发滑动，官方文档表明这是js组件，需要被初始化一下
+ 导入 mui.js
+ 使用官方提供的方式去初始化：
```
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```
3. 我们在初始化滑动条的时候，导入了mui.js,但是控制台报错了:
`Uncaught TypeError: 'caller','callee',and 'arguments' properties may not be accessed on strict mode`
+ 我们推测是mui.js中用到了'caller','callee',and 'arguments' ，但是，webpack 打包好的 bundle.js中，默认秦俑严格模式，所以，这两者冲突了
+ 解决方案：1.把mui.js中的非严格模式的代码改了，但是不现实 2. 把webpack 打包时候的严格模式禁用掉 

+ 在 `.babelrc` 中输入以下进行严格模式的禁用
    "ignore": [
      "./src/lib/js/mui.js"
    ]

4. 当滑动条 调试 好后，发现，tabbar 无法正常工作，这时候，我们需要把每个 tabbar 按钮的 样式中的 ` mui-tab-item` 改一下名字

### 制作图片列表区
 - 懒加载 利用mint-ui 提供的组件 lazy-load
 - 根据 `lazy-load` 的使用文档使用
## 实现 点击图片 跳转到图片详情页面
1. 改造 li 成router-link 的时候，需要使用 tag 属性指定 要渲染为哪种元素 

##实现详情页面的布局和美化,  同时获取数据渲染页面

## 实现图片详情中 缩略图的功能
1. 使用 插件 vue-preview 这个缩略图插件
参考文档 `https://github.com/LS1231/vue-preview`
2. 获取所有的图片列表 

## 绘制商品列表 页面基本结构并美化

## 尝试在手机上 去进行项目的预览和测试
1. 要保证自己的手机可以正常进行；
2. 要保证 手机和 开发项目的电脑 处于同一个 wifi 环境中，也就是说手机可以访问到电脑的 ip
3. 打开自己的项目中 的 package.json 文件，在　dev 脚本中，添加一个 --host 指令，把当前电脑 的 wifi ip 地址设置为 --host的指令值：
 + 如何查看自己电脑所处 wifi 的ip : 在 cmd 终端中运行 `ipconfig` 查看无线网 ip

 ## 如何实现加入购物车时候，拿到选择的数据
 1. 按钮属于 goosinfo 页面，数字属于 numbox 组件
 2. 由于涉及到父子组件的嵌套，所以，无法直接 在 goodsinfo 页面中获取到选中商品的数量值
 3. 涉及到了子组件向父组件传值（事件调用机制）
 4. 事件调用的本质: 父向子传递方法，子调用这个方法，同时把数据当作参数传递给父组件