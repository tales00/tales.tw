<template lang="pug">
  App-scaffold
    intro(
      slot="intro" 
      @showQRcode="showQRcode"
      @showContact="showContact"
    )
    header-nav(slot="header")
    router-view
</template>

<script>
import { AppScaffold } from '@/scaffold'
import intro from '@/views/intro'
import headerNav from '@/views/header-nav'
import qrcode from '@/views/modal/qrcode'
import contact from '@/views/modal/contact'

export default {
  name: 'app',
  components: {
    AppScaffold,
    intro,
    headerNav
  },
  data() { return { }},
  computed: {},
  methods: {
    showContact() {
      this.$dialog.show( {
        component: contact,
      } );
    },
    showQRcode() {
      this.$dialog.show( {
        component: qrcode,
      } );
    },
  },
  created() {
  },
  
}
</script>
<style lang="scss">
</style>
