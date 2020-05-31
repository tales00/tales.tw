<template lang="pug">
  .slide
    slot
</template>

<script>
export default {
  name: 'SlideTag'
}
</script>

<style lang="scss" scoped>
.slide {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  flex: 1 0 100%;

  &>* { margin: auto; }
  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

</style>