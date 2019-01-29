import Vue from 'vue';
import '@/common/css/base.css';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from './store';
import base from '@/common/js/base.js';
Vue.prototype.base = base;

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
