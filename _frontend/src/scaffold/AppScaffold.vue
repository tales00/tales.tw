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
  watch: { },
  methods: { },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.pageRoot {
  height: inherit;
}
.scaffold,
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
  position: sticky;
  top: 0;
  background-color: var(--primary-dark);
  border-bottom: 0.1rem solid var(--gray-3);
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