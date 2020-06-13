<template lang="pug">
  App-scaffold
    intro(
      slot="intro" 
      @showQRcode="showQRcode"
      @showContact="showContact"
    )
    header-nav(
      slot="header"
      ref="header"
      @showQRcode="showQRcode"
      @showContact="showContact"
    )
    router-view(
      @scrollToIntro="scrollToIntro"
      @scrollToTop="scrollToTop"
    )
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
    scrollToIntro() {
      console.log('scrollToIntro');      
      window.scrollTo({behavior: 'smooth'});
    },
    scrollToTop() {
      console.log('scrollToTop');
      this.$refs['header'].$el.scrollIntoView({behavior: 'smooth'});
    },
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
