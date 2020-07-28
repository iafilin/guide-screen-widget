import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'

Vue.config.productionTip = false

const wrapper = document.createElement('div');
document.body.append(wrapper);

new Vue({
  el: wrapper,
  render: h => h(App),
});
