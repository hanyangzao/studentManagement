import Vue from 'vue'
import App from './App'

//引入uview
import uView from "uview-ui";
Vue.use(uView);
// //引入uview分享模板
// let mpShare = require('uview-ui/libs/mixin/mpShare.js');
// Vue.mixin(mpShare);


//引入lodash
import lodash from 'lodash'
let _= require('lodash');
//引入公用方法
import {utilFn} from './util/util.js'
Vue.prototype.$utilFn= utilFn
//接口信息导入
import {myRequest} from './api/api.js'
Vue.prototype.$myRuquest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
