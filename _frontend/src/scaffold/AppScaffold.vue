<template lang="pug">
  .pageRoot
    .scaffold
      slot(name="intro")
      .content
        main
          slot
        header
          slot(name="header") header
        footer
          slot(name="footer") footer
</template>

<script>
export default {
  name: 'scaffold',
  computed: {},
  watch: {},
  methods: { },
  created() {},
  mounted() {},
}
</script>

<style lang="scss" scoped>
.pageRoot, .scaffold {
  height: inherit;
}

.scaffold {
  margin: auto;
  max-width: var(--app-max-width);
}
.content {
  min-height: 100vh;
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
  position: sticky;
  top: 0;
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