<template lang="pug">
  .TabHeader(:style="[CSSvars]")
    .labels
      slot
      .indicator(ref="indicator")
</template>

<script>
let delayTimeout = [];

export default {
  name: 'TabHeader',
  props: {
    idx: {
      type: Number,
      default: 1
    },
    offsetPercent: {
      type: Number,
      default: null
    }
  },
  data() { return {
    tabLabel: {
      all$el: [],
      specArr: [],
    },
    allTab: [],
    keyframes: [],
    indicatorAni: {},
  }},
  computed: {
    CSSvars() {
      return { }
    },
  },
  watch: {
    idx( idx ) {
      const delay = this.offsetPercent? 600 : 300;
      if (delayTimeout['idx']) { clearTimeout(delayTimeout['idx']) }
      delayTimeout['idx'] = setTimeout( () => {
        const keyframe = this.tabLabel.specArr[idx-1].offset;
        const currentOffset = this.indicatorAni.currentTime / 100;
        if( keyframe!== currentOffset ) {
          this.switchLabel( idx );
        }
      }, delay );
    },
    // offsetPercent( percent ) {
    //   if (delayTimeout['offsetPercent']) { clearTimeout(delayTimeout['offsetPercent']) }
    //   delayTimeout['offsetPercent'] = setTimeout( () => {
    //     const trget = this.tabLabel.specArr
    //       .map((label, idx)=>({idx, offset: label.offset}))
    //       .filter(label=>label.offset*0.75< percent / 100)
    //       .reverse();
    //     if(trget.length>0) {
    //       this.switchLabel( trget[0].idx+1 );
    //     } else {
    //       this.switchLabel( this.idx );
    //     }
    //   }, 600 );
    // },
    '$attrs': {
      handler() {
        this.updateUI();
      }
    }
  },
  methods: {
    switchLabel( idx ) {
      const target = this.tabLabel.specArr[idx-1] || this.tabLabel.specArr[this.idx-1] || this.tabLabel.specArr[0];
      if( target ) {
        this.goKeyFrame(target.offset * 100);
        this.$emit('update:idx', idx);
      }
    },
    goKeyFrame( percent ){
      this.indicatorAni.currentTime = percent;
    },
    updateKeyframe() {
      // console.log('updateKeyframe');
      const labels = this.$el.querySelector('.labels');
      this.$set(this.tabLabel, 'all$el', [...labels.querySelectorAll('.TabLabel')]);

      if( this.tabLabel.all$el.length > 0 ) {
        this.tabLabel.specArr = this.tabLabel.all$el
          .reduce((arr, tab, idx)=>{
            const offset = 1 / (this.tabLabel.all$el.length-1) * idx;
            const totalWidth = idx>0? arr[idx-1].totalWidth + arr[idx-1].width : 0;
            arr.push({
              offset,
              totalWidth,
              width: tab.offsetWidth
            });
            return arr;
          }, []);
        
        this.keyframes = this.tabLabel.specArr
        .reduce((arr, tab)=>{
            arr.push({
              offset: tab.offset,
              width: `${tab.width}px`,
              transform: `translateX(${tab.totalWidth}px)`,
            });
            return arr;
          }, [])
  
        this.attechKeyframe();
      }
    },
    updateUI() {},
    attechKeyframe() {
      if( this.keyframes.length > 0 ){
        this.indicatorAni = this.$refs['indicator'].animate(this.keyframes, {
          duration: 100,
          fill: 'both',
          easing: 'linear'
        });
        this.indicatorAni.pause();
      }
    }
  },
  created() {
    window.addEventListener('resize', this.updateKeyframe, {passive: true});
      
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.updateKeyframe);
    });
    this.$once('hook:updated', this.updateKeyframe);
  },
  mounted() {
    this.updateKeyframe();
  },
  updated() {
    // this.updateUI();
    if( this.offsetPercent ) {
      this.goKeyFrame( this.offsetPercent );
    }
  }
}
</script>

<style lang="scss" scoped>
.TabHeader {
  // display: inline-block;
  overflow: hidden;
  max-width: 100vw;
  display: flex;
}
.labels {
  scroll-snap-type: x mandatory;
  position: relative;
  // display: inline-flex;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  // overflow-y: hidden;

}
.TabLabel {
  scroll-snap-align: start;
  flex-shrink: 0;
  text-align: center;
  user-select: none;
}

.indicator {
  position: absolute;
  display: block;
  content: '';
  background-color: red;
  height: 2px;
  bottom: 0;
  width: 4em;
  transform-origin: left;
}


.TabHeader {
  &:not([scroll-bar="show"]) {
    .labels::-webkit-scrollbar { display: none }
  }
  // &:not([control="show"]) {
  //   .sliderController { display: none;}
  // }
  // &:not([indicator="show"]) {
  //   .sliderIndicator { display: none;}
  // }
  &[justify-label="full"] {
    display: grid;
    .TabLabel { flex-grow: 1; }
  }
  &[justify-label="start"] {
    justify-content: flex-start;
  }
  &[justify-label="center"] {
    justify-content: center;
  }
  &[justify-label="end"] {
    justify-content: flex-end;
  }
}
</style>