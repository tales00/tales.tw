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
      @showQRcode="showQRcode"
      @showContact="showContact"
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
  watch: {
    '$route.name': {
      immediate: false,
      handler( routeName )  {
        switch ( routeName ) {
          case 'qrcode':
            this.showQRcode();
            break;

          case 'contact':
            this.showContact();
            break;
        }
      }
    }
  },
  methods: {
    scrollToIntro() {
      window.scrollTo({behavior: 'smooth'});
    },
    scrollToTop() {
      this.$refs['header'].$el.scrollIntoView({behavior: 'smooth'});
    },
    showContact( isDirectOpen = false ) {
      this.$dialog.show( {
        component: contact,
        paramObj: {
          hook: {
            beforeOpen: () => {
              if( isDirectOpen ) { 
                window.addEventListener('popstate', this.$dialog.hide, {once: true});
              }
            },
            beforeClose: () => {              
              if( isDirectOpen ) { this.$router.push({ name: 'main' }); }
            },
            closed: () => {
              if( isDirectOpen ) {
                window.removeEventListener('popstate', this.$dialog.hide);
              }
            }
          }
        }
      } );
    },
    showQRcode( isDirectOpen = false ) {
      this.$dialog.show( {
        component: qrcode,
        paramObj: {
          hook: {
            beforeOpen: () => {
              if( isDirectOpen ) { 
                window.addEventListener('popstate', this.$dialog.hide, {once: true});
              }
            },
            beforeClose: () => {              
              if( isDirectOpen ) { this.$router.push({ name: 'main' }); }
            },
            closed: () => {
              if( isDirectOpen ) {
                window.removeEventListener('popstate', this.$dialog.hide);
              }
            }
          }
        }
      } );
    },
  },
  created() {
    switch ( this.$route.name ) {
      case 'qrcode':
        this.showQRcode( true );
        break;

      case 'contact':
        this.showContact( true );
        break;
    }
  },
}
</script>
<style lang="scss">
</style>
