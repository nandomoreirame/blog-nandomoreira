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

function updateProgressBar() {
  let scrollSpace = document.body.scrollHeight - window.innerHeight
  let read = window.scrollY / scrollSpace * 100
  $('.bar').css({ 'width': `${read}%` })
}

(($) => {
  $(document).ready(() => {
    const observer = lozad('.lozad', {
      threshold: 0.1 // ratio of element convergence
    })
    observer.observe()
  })

  window.addEventListener('scroll', () => updateProgressBar() )
  window.addEventListener('resize', () => updateProgressBar() )
  updateProgressBar()
})(jQuery)

Vue.use(VueMasonryPlugin)
Vue.component('cp-search-form', require('@/components/SearchForm.vue'))
Vue.component('cp-error-404', require('@/components/Error404.vue'))

new Vue({ // eslint-disable-line
  el: '#site'
})

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js')
//     .then(registration => {
//       console.log('offline worker registered!')
//     })
// }
