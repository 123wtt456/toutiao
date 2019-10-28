import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
import axios from './api/index'
Vue.prototype.$http = axios

// ElementUI 是一个插件  集成了很多组件
Vue.use(ElementUI)

Vue.config.productionTip = false
// 根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// main.js的作用是入口文件5
// 职责1：创建一个根实例
// 实例2: 负责全局范围的依赖导入
