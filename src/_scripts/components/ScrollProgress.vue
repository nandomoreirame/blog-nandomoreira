<template>
  <span v-bind:class="classes">
    <span class="Progress__indicator" :style="fullStyle"></span>
  </span>
</template>

<script>
let scrollContainer;
const minSize = 1;

export default {
  name: 'ScrollProgress',
  props:  {
    spy: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: ''
    },
    extraClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    getChildrenHeight ( childrenList ) {
      //first run
      if(childrenList.length && this.childrenArrayLength === 0){
        this.childrenHeight = this.iterateChildren(childrenList);
        this.childrenArrayLength = childrenList.length;
      }
      //assume that child elements size wasn't changed
      if(childrenList.length === this.childrenArrayLength){
        return this.childrenHeight;
      }
    },
    iterateChildren ( childrenList ) {
      let summ = 0;
      for ( var i = 0; i < childrenList.length; i++ ) {
        var childElHeight = childrenList[ i ].getBoundingClientRect().height;
        if ( childElHeight >= 0 ) summ += childElHeight;
      }
      return summ;
    },
    calculateScrollRatio (){
      let viewed = scrollContainer.scrollTop + scrollContainer.getBoundingClientRect().height;
      let total = this.childrenHeight || this.getChildrenHeight( scrollContainer.children );
      let ratio = ( viewed / total ) * 100 ;
      return (parseInt(ratio) >= 100 ? 100 : parseInt(ratio));
    },
    handleScroll () {
      const result = this.calculateScrollRatio();
      this.fullStyle = `width:${(result || minSize)}%;background-color:${this.colorStyle};`;
    },
    handleInitialProps (){
      //following props colud have some validation
      if(this.color) this.colorStyle = this.color;
      if(this.extraClass) this.classes += ' ' + this.extraClass;
    }
  },
  data () {
    return {
      fullStyle: 0,
      colorStyle:'',
      classes: 'Progress',
      childrenArrayLength:0,
      childrenHeight:0
    };
  },
  mounted () {
    if ( !this.spy ) throw new Error('No scroll container provided');
    scrollContainer = document.querySelectorAll( this.spy )[ 0 ];
    scrollContainer.addEventListener('scroll', this.handleScroll, false);
    this.handleInitialProps();
  },
  beforeDestroy () {
    scrollContainer.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style lang="sass" scoped>
.Progress
  // background: linear-gradient(to right, #F9EC31 var(--scroll), transparent 0)
  // background-repeat: no-repeat
  position: fixed
  top: 100px
  height: 4px
  background: transparent
  width: 100%
  z-index: 10000
  &__indicator
    width: 0
    background: #fc0
    height: 4px
    transition: width .3s
</style>
