import Vue from 'vue'
import axios from 'axios'
import lozad from 'lozad'
import { VueMasonryPlugin } from 'vue-masonry'

window._ = require('lodash')
// window.Popper = require('popper.js').default
window.Vue = Vue
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

var anchorJS = require('anchor-js');
var anchors = new anchorJS();

try {
  window.$ = window.jQuery = require('jquery')
  // require('bootstrap')

  anchors.options.placement = 'left';
  anchors.add('.postSingle__body > h2, .postSingle__body > h3, .postSingle__body > h4, .postSingle__body > h5, .postSingle__body > h6');

  (function ($) {
    $('.header')
      .addClass('header--original')
      .clone()
      .appendTo('body')
      .addClass('header--cloned')
      .removeClass('header--original');

    var iScrollPos = 0;

    $(window).scroll(function () {
      var orgElementPos = $('.header--original').offset();
      var orgElementTop = orgElementPos.top;
      var windowPosition = $(this).scrollTop();

      if (windowPosition >= (orgElementTop + $('.header--original').height())) {
        if(windowPosition > iScrollPos) {
          $('.header--cloned')
            .removeClass('header--show');
        } else {
          $('.header--cloned')
            .addClass('header--show');
        }

        iScrollPos = windowPosition;

        $('.header--original')
          .css({ 'visibility':'hidden' });

      } else {
        $('.header--cloned')
          .removeClass('header--show');

        $('.header--original')
          .css({ 'visibility':'visible' });
      }
    });
  })(jQuery);
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
