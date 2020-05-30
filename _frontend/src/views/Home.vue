<template lang="pug">
  .home
    section( v-for=" idx in 6 " :style="{background: `var(--gray-${idx-1})`}")
      | gray-{{ idx-1 }}
    button(@click="prompt") open prompt
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  methods: {
    prompt() {
      this.$dialog.prompt( {
        // caption: true,
        message: [
          {
            heading: 'heading 1',
            text: 'text 1'
          },
          {
            heading: 'heading 2',
            text: 'text 2'
          },
          {
            heading: 'heading 1',
            text: 'text 1'
          },
          {
            heading: 'heading 2',
            text: 'text 2'
          },
          {
            heading: 'heading 1',
            text: 'text 1'
          },
          {
            heading: 'heading 2',
            text: 'text 2'
          },
          {
            heading: 'heading 1',
            text: 'text 1'
          },
          {
            heading: 'heading 2',
            text: 'text 2'
          },
          {
            heading: 'heading 1',
            text: 'text 1'
          },
          {
            heading: 'heading 2',
            text: 'text 2'
          },
          {
            heading: 'heading 1',
            text: 'text 1'
          },
          {
            heading: 'heading 2',
            text: 'text 2'
          },
        ],
        button: '知道了'
      } )
    }
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>

</style>