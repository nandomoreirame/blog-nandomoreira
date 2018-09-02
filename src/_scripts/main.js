import Vue from 'vue'
import axios from 'axios'
import lozad from 'lozad'
import { VueMasonryPlugin } from 'vue-masonry'

window._ = require('lodash')
window.Popper = require('popper.js').default
window.Vue = Vue
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

try {
  window.$ = window.jQuery = require('jquery')
  require('bootstrap')
} catch (e) {}

(($) => {
  $(document).ready(() => {
    const observer = lozad('.lozad', {
      threshold: 0.1 // ratio of element convergence
    })
    observer.observe()
  })
})(jQuery)

Vue.use(VueMasonryPlugin)
Vue.component('cp-search-form', require('@/components/SearchForm.vue'))
Vue.component('cp-error-404', require('@/components/Error404.vue'))
Vue.component('cp-scroll-progress', require('@/components/ScrollProgress.vue'))

new Vue({ // eslint-disable-line
  el: '#site'
})

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js')
//     .then(registration => {
//       console.log('offline worker registered!')
//     })
// }
