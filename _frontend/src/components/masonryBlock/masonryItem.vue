<template lang="pug">
  .masonryItem
    slot
</template>

<script>
export default {
  name: 'masonryItem'
}
</script>

<style lang="scss" scoped>
.masonryItem {
  & img {
    max-width: 100%;
  }
}
</style>