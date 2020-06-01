<template lang="pug">
  .pageRoot
    .scaffold
      slot(name="intro")
      .content
        main
          slot
        header(ref="header") header
        footer(ref="header") footer
</template>

<script>
export default {
  name: 'scaffold',
  computed: {},
  methods: {},
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
  max-width: var(--size-xl);
  // background-color: hsla(0, 0%, 100%, 0.1);
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