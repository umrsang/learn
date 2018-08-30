import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


function initFontSize() {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / (1080) * 100 + 'px';
  window.onresize = function () {
      document.documentElement.style.fontSize = document.documentElement.clientWidth / (1080) * 100 + 'px';
  }
}
initFontSize();
window.onresize = initFontSize;
document.body.addEventListener('touchstart', function () {});

new Vue({
  render: h => h(App),
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }

}).$mount('#app')