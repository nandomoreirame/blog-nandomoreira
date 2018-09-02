<template>
  <div class="Error404">
    <div class="Error404__inner">
      <h1 class="Error404__code">404</h1>
      <p class="Error404__message">
        Oops! Essa é o terrível erro 404, a página que você acessou não foi encontrada ou não existe.
      </p>
      <a class="Error404__link btn btn-outline-secondary" href="/">
        <i class="fa fa-arrow-left"></i> Voltar para a página inicial
      </a>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="sass" scoped>
.Error404
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  &__inner
    max-width: 50rem /* 800/16 */
    margin-right: auto
    margin-left: auto
  &__code
    font-size: 11.25rem /* 180/16 */
    letter-spacing: -0.05rem
  &__message
    font-size: 28px
    font-weight: 300
    width: 80%
    margin-right: auto
    margin-left: auto
</style>
