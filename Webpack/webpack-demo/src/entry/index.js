import _ from 'lodash';
import Vue from 'vue'

import '../static/style/grobal.css';
import '../assets/style/style.css';
import '../assets/sass/color.scss';
import '../assets/sass/weight.scss';
import webPackLogo from "../assets/img/logo.png"
import vueLogo from "../assets/img/vue-logo.png"

import lib from "../components/print"

Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level, // tag name 标签名称
      this.$slots.default // 子组件中的阵列
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    },
  }
})


new Vue({
  el: "#app",
  render: h => {
    console.log(this)
    return h('anchored-heading', {
      props: {
        level: 1,
      }
    }, "This is a Vue program !")
  },
  mounted() { 
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }
})