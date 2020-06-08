<template lang="pug">
  .pageRoot
    .scaffold
      slot(name="intro")
      .content
        main
          slot
        header(ref="header")
          slot(name="header") header
        footer(ref="footer")
          slot(name="footer") footer
</template>

<script>
export default {
  name: 'scaffold',
  // props: {
  //   autoSkipIntro: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  computed: {},
  watch: {
    '$route': {
      handler() {
        this.scrollViewTop();
      }
    }
  },
  methods: {
    scrollViewTop() {
      if( !this.$route.meta.isIntro ) {
        this.$refs['header'].scrollIntoView({behavior: 'smooth'});
      } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.pageRoot {
  height: inherit;
}
.scaffold, 
.content
{
  height: inherit;
}

.scaffold {
  margin: auto;
  max-width: var(--app-max-width);
}
.content {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    'header'
    'main'
    'footer'
  ;
}

header {
  grid-area: header;
}
footer {
  grid-area: footer;
}
main {
  grid-area: main;
  // padding: 1.5rem;
}

.unsuportted:not(:only-child) {
  display: none;
}
</style>