import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


function initFontSize() {
  var fontSize = document.documentElement.clientWidth / (1080) * 100;
  var prop = document.documentElement.clientWidth / document.documentElement.clientHeight;
  document.documentElement.style.fontSize = fontSize * (9/16/prop) + 'px';
}
window.onresize = function () {
  initFontSize();
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