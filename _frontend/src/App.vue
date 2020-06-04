<template lang="pug">
  App-scaffold
    intro( slot="intro" @showQRcode="showQRcode")
    router-view
</template>

<script>
import { AppScaffold } from '@/scaffold'
import intro from '@/views/intro'
import qrcode from '@/views/modal/qrcode'

export default {
  name: 'app',
  components: {
    AppScaffold,
    intro
  },
  data() { return { }},
  computed: {},
  methods: {
    showQRcode() {
      this.$dialog.show( {
        component: qrcode,
        // paramObj: {}
      } );
    }
  },
  created() {
  },
  
}
</script>
<style lang="scss">
</style>
