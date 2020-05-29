<template lang="pug">
  App-scaffold(:env="$env")
    router-view
</template>

<script>
import { AppScaffold } from './scaffold'

export default {
  name: 'app',
  components: {
    AppScaffold
  },
  data() { return { }},
  computed: {
    
  },
  methods: {
  },
  created() {
  },
  
}
</script>
<style lang="scss">
</style>
