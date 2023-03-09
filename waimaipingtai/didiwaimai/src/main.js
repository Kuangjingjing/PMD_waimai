// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
// 的导入图片懒加载依赖包
import VueLazyload from 'vue-lazyload'
// 导入懒加载图片
import loading from './common/images/loading.gif'
// 引入 mint-ui组件库的button按钮
import {Button} from 'mint-ui'
// vue中注册button
Vue.component(Button.name, Button)
// 在vue中使用懒加载包
Vue.use(VueLazyload, {
  loading
  })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
// 屏蔽push
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}
