import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
// import 'bootstrap/dist/css/bootstrap.min.css'

import ElementUI from 'element-ui'
// import ElementPlus from 'element-plus'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// import VCharts from 'v-charts'
import * as echarts from '@/utils/echarts.js'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
// Vue.use(VCharts)
Vue.use(echarts)
// Vue.use(ElementPlus)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
