 /* 粘性定位 相对定位与固定定位的结合 */
  position: sticky;
  
  /* 显示的优先级参数 */
  z-index: 999;

  box-sizing: border-box; 不正常盒子
  width , height = margin + padding + content
  content-box 是正常盒子

  axios:
  主要是用于向后台发起请求的，还有在请求中做更多可控功能。
  特点：支持浏览器和node.js,支持promise,能拦截请求和响应,能转换请求和响应数据,能取消请求,自动转换JSON数据,浏览器支持防止CSRF

  :class="{'filterBold':currentFilter == index}"
  给class绑定一个对象

  v-if 和 v-show:
  相同点：v-if与v-show都可以动态控制dom元素显示隐藏
  不同点：v-if显示隐藏是将dom元素整个添加或删除，而v-show隐藏则是为该元素添加css--display:none，dom元素还在。
  v-if直接从代码中删除了，v-show只是通过display来切换状态，因此建议频繁切换的话用v-show比较好

  /* 让所有弹性盒模型对象的子元素都有相同的长度，忽略它们内部的内容 */
  flex: 1;
  
  !important 表示优先调用

   text-overflow: ellipsis; 省略号修剪文本