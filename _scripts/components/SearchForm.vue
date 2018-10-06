<template>
  <form
    method="get"
    class="search-form navbar-text my-2 my-lg-0">
    <div class="search-area" v-if="showInput" :style="`display: ${(showInput) ? 'block': 'none'};`">
      <div class="search-area-inner">
        <div class="close-btn" @click="toggleInput">
          <i class="mdi mdi-close"></i>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="form-group">
              <input type="search" name="search" id="search" placeholder="What are you looking for?" autofocus>
              <button type="submit" class="submit"><i class="mdi mdi-magnify"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a href="#" class="my-sm-0 search-btn" role="button" @click="toggleInput">
      <i :class="`mdi mdi-${(showInput) ? 'close': 'magnify'}`"/>
    </a>
  </form>
</template>

<script>
export default {
  data () {
    return {
      showInput: false,
      form: {
        query: ''
      }
    }
  },
  methods: {
    toggleInput (event) {
      event.preventDefault()
      this.showInput = !this.showInput
      this.form.query = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.search-form
  .btn.btn-link
    &, &:focus, &:active
      outline: 0 none
      box-shadow: none
</style>
