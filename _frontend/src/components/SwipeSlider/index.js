import SwipeSlider from './SwipeSlider.vue';
import SlideContainer from './SlideContainer.vue';

export {
  SwipeSlider,
  SlideContainer
}

/*
<script>
import { SwipeSlider, SlideContainer } from '@/components/SwipeSlider';

components: {
  SwipeSlider,
  SlideContainer
},
data() { return {
  slider: {
    idx: 1,
    isScrolling: false,
    scrollOffset: 0,
  }
}},
methods: {
  sliderGoLast() {
    this.slider.idx --;
  },
  sliderGoNext() {
    this.slider.idx ++;
  },
  sliderGoTo( idx ) {
    this.slider.idx = idx;
  },
  onScrollStart() {},
  onScrollMove() {},
  onScrollEnd() {},
  onTouchStart() {},
  onTouchMove() {},
  onTouchEnd() {},
  onResize() {},
}


<template>
swipe-slider(
  ref="picSlider"
  :idx.sync="slider.idx"
  :isScrolling.sync="slider.isScrolling"
  :scrollOffset.sync="slider.scrollOffset"
  :onScrollStart="onScrollStart"
  :onScrollMove="onScrollMove"
  :onScrollEnd="onScrollEnd"
  :onTouchStart="onTouchStart"
  :onTouchMove="onTouchMove"
  :onTouchEnd="onTouchEnd"
  :onResize="onResize"
  scroll-bar="hide"
  indicator="show"
  control="show"
)
  slide-container(
    v-for="pic_url in (new Array(10).fill(1).map((el,idx)=>`https://via.placeholder.com/800x600?text=${idx+1}`))"
  )
    img(:src="pic_url")
*/