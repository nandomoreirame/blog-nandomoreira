import Vue from 'vue'
import axios from 'axios'

window._ = require('lodash')
window.Popper = require('popper.js').default
window.Vue = Vue
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

try {
  window.$ = window.jQuery = require('jquery')
} catch (e) {}

(($) => {
  $(document).ready(() => {
    console.warn('jQuery loaded...')
  })
})(jQuery)

Vue.component('blc-search-form', require('@/components/SearchForm.vue'))

new Vue({ // eslint-disable-line
  el: '#app'
})
