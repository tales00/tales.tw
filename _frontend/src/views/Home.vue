<template lang="pug">
  .home
    img(alt="Vue logo" src="../assets/logo.png")
    section
      button(@click="prompt") open prompt
      //- button(@click="slideUpOption") slide up option
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
