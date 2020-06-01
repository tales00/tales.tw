<template lang="pug">
  .SwipeSlider
    .slideHolder(ref="slideHolder")
      slot
    .sliderController(v-if="slideTotal > 1")
      .arrow.last(@click="slideBy(-1)" v-if="idx!==1")
        img(src="./img/arrow_white.svg")
      .arrow.next(@click="slideBy(1)" v-if="idx!==slideTotal")
        img(src="./img/arrow_white.svg")
    .sliderIndicator(v-if="slideTotal > 1")
      .dot(
        v-for="dotIdx in slideTotal"
        @click="slideTo(dotIdx)"
        :class="{active: dotIdx === idx}"
      )
</template>

<script>
// isScrolling
// offsetPercent
// isScrolling
// const _deBounce = function(fn) {
//   let deBounceFrame;
//   return (...params)=>{
//     if(deBounceFrame) { cancelAnimationFrame(deBounceFrame) }
//     deBounceFrame = requestAnimationFrame( ()=>{ fn(...params); } );
//   }
// };
// const _delayBounce = function (fn, delay = 100) {
//   let delayTimeout;
//   return (...params) => {
//     if (delayTimeout) { clearTimeout(delayTimeout) }
//     delayTimeout = setTimeout( () => { fn(...params) }, delay );
//   }
// };


export default {
  name: 'SwipeSlider',
  props: {
    idx:           { type: Number,   default: 1 },
    onScrollStart: { type: Function, default: null },
    onScrollMove:  { type: Function, default: null },
    onScrollEnd:   { type: Function, default: null },
    onTouchStart:  { type: Function, default: null },
    onTouchMove:   { type: Function, default: null },
    onTouchEnd:    { type: Function, default: null },
    onResize:      { type: Function, default: null },
    isScrolling:   { type: Boolean,  default: false },
    isTouching:    { type: Boolean,  default: false },
    offsetPercent: { type: Number,   default: 0 },
  },
  data() { return {
    slideTotal: 0,
    slide: {
      isScrolling: false,
      isTouching: false,
      offsetPercent: 0,
      offsetWidth: 0,
      scrollWidth: 0,
    }
  }},
  computed: {
    isTouchAble() { return ( 'ontouchstart' in window ) || ( (navigator.maxTouchPoints||navigator.msMaxTouchPoints) > 0 ); }
  },
  watch: {
    idx: {
      immediate: false,
      handler( idx ) {
        this.switchTo( idx );
      }
    },
    // 'slide.isScrolling': {
    //   handler( isScrolling ) {
    //     this.$emit('update:isScrolling', isScrolling);
    //     if( !isScrolling ) {
    //       this.slideTo( this.calcIdx() );
    //     }

    //   }
    // },
    // 'slide.isTouching': {
    //   handler( isTouching ) {
    //     this.$emit('update:isTouching', isTouching);
    //     if( !isTouching ) {
    //       this.slideTo( this.calcIdx() );
    //     }
    //   }
    // },
    // 'slide.offsetPercent' : {
    //   handler( offsetPercent ) {
    //     this.$emit('update:offsetPercent', offsetPercent );
    //   }
    // }
  },
  methods: {
    calcIdx() {
      const {offsetWidth, scrollWidth, scrollLeft} = this.$refs['slideHolder'];
      return Math.floor( Math.round( scrollLeft / offsetWidth) % ( scrollWidth / offsetWidth ) ) + 1;
    },
    // slideTo(idx) {  
    //   if( Number.isInteger(idx) ) {
    //     const holder = this.$refs['slideHolder'];
    //     holder.scrollTo({
    //       left: (idx - 1) * holder.offsetWidth,
    //       behavior: 'smooth'
    //     });
    //   }
    // },
    // slideTo(idx) {
    //   if( !(this.isTouchAble && this.slide.isTouching) && !this.slide.isScrolling ) {
    //     this.$emit('update:idx', idx);
    //   }
    // },
    slideBy(offset) {
      if( typeof offset === 'number') {
        this.slideTo( this.idx + Math.round(offset) );
      }
    },
    updateSlideTotal() {
      const {slideHolder=false} = this.$refs;
      this.$set(this.$data, 'slideTotal', slideHolder.querySelectorAll('.slide').length || 0);
    },
    updateUI() {
      const { offsetWidth, scrollWidth } = this.$refs['slideHolder'];
      this.$set(this.slide, 'offsetWidth', offsetWidth);
      this.$set(this.slide, 'scrollWidth', scrollWidth);
    },
  },
  // mounted() { },
  // updated() { }
}
</script>

<style lang="scss" scoped>
.SwipeSlider {
  // height: inherit;
  min-height: inherit;
  max-height: inherit;

  display: grid;
  grid-template-rows: auto 1fr auto auto;
  grid-template-areas: 
    '...'
    'control'
    '...'
    'indicat'
  ;
}

.slideHolder {
  grid-area: 1 / 1 / -1 / -1;
  overflow-x: auto;
  display: flex;
  flex-wrap: nowrap;
  scroll-snap-type: x mandatory;
}

.sliderController {
  position: relative;
  grid-area: 1 / 1 / -1 / -1;
  // grid-area: control;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 
    'last ... next'
  ;
  align-items: center;

  pointer-events: none;
  .arrow {
    cursor: pointer;
    pointer-events: auto;
    opacity: 0.6;
    padding: 1rem;
    filter: drop-shadow(0 1px 2px hsla(0, 0%, 0%, 0.8));

    &.last { grid-area: last; }
    &.next { grid-area: next; transform: rotateY(180deg); }

  }
}
.sliderIndicator {
  position: relative;
  grid-area: indicat;
  display: grid;
  grid-template-columns: repeat(auto-fit, 1.6em);
  justify-content: center;
  align-items: center;

  pointer-events: none;
  
  font-size: 1.4rem;
  
  padding-bottom: 1rem;

  .dot {
    cursor: pointer;
    pointer-events: auto;
    color: #fff;
    opacity: 0.3;
    line-height: 1;

    background-color: hsl(0, 0%, 100%);
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.8);
    text-shadow: 0px 1px 3px hsla(0, 0%, 0%, 0.75);
    border-radius: 0.4rem;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 0.8rem;
    height: 0.8rem;

    &:hover {
      opacity: 0.5;
      // span {}
    }
    &.active {
      opacity: 0.8;
      transform: scale(1.2);
      // span {}
    }
  }
}

.SwipeSlider {
  &:not([scroll-bar="show"]) {
    .slideHolder::-webkit-scrollbar { display: none }
  }
  &:not([control="show"]) {
    .sliderController { display: none;}
  }
  &:not([indicator="show"]) {
    .sliderIndicator { display: none;}
  }
}
</style>