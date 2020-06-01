<template lang="pug">
  App-scaffold(:env="$env")
    intro(slot="intro")
    router-view
</template>

<script>
import { AppScaffold } from '@/scaffold'
import intro from '@/views/intro'

export default {
  name: 'app',
  components: {
    AppScaffold,
    intro
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
