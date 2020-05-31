<template lang="pug">
  .TabLabel(@click="handelClick")
    slot
</template>

<script>
export default {
  name: 'TabLabel',
  methods: {
    handelClick() {
      if( 'click' in this._events ) {
        this.$emit('click');
      }
    }
  }
}
</script>