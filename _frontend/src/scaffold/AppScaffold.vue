<template lang="pug">
  #app(:data-browser="env.browser")
    .scaffold
      .main-frame(v-if="is_suportted_env")
        main
          slot
        header(ref="header") header
        footer(ref="header") footer
      .main-frame.unsuportted(v-else)
        | NOT SUPROTTED_ENV
    //- Overlay-Container(ref="app-modal")
</template>

<script>
export default {
  name: 'scaffold',
  props: {
    env: Object
  },
  computed: {
    is_suportted_env() {
      return !['ie'].includes(this.$env.browser);
      // return false;
    },
  },
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
#app {
  height: inherit;
}

.scaffold, 
.main-frame
{
  height: inherit;
}

.scaffold {
  margin: auto;
  max-width: var(--size-xl);
  background-color: hsla(0, 0%, 100%, 0.1);
}
.main-frame {
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