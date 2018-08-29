import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store';

import 'normalize.css';
import './style.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
