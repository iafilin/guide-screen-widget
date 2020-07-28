import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'

Vue.config.productionTip = false

const wrapper = document.createElement('div');
document.body.append(wrapper);

window.guide_screen_widget = new Vue({
  el: wrapper,
  ...App
});
