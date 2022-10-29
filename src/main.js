/*
 * @Description: 
 * @Author: 王毅楠
 * @Date: 2021-09-08 10:04:44
 * @LastEditors: 肖俊男
 * @LastEditTime: 2022-09-16 10:37:28
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引用全局css样式文件
import './assets/css/global.css'

// 引入axios
import axios from 'axios'
// 配置axios
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = 'http://vip.jzab.xyz:8003';
// axios.defaults.baseURL = 'http://192.168.50.198:8888/';

//将全局echarts对象挂载到vue的原型对象上
//在别的组件中 使用echarts直接使用this.$echarts即可
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
