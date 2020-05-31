<template lang="pug">
  .home
    section
      swipe-slider()
        slide-container( v-for=" illust in pixiv.illusts.slice(0,5) ")
          img(no-referrer :src="`https://pixiv.cat/${illust.id}${illust.pageCount>1?'-1':''}.jpg`")
    button(@click="prompt") open prompt
</template>

<script>
// @ is an alias to /src
import { talesAPI } from '@/api'
import { SwipeSlider, SlideContainer } from '@/components/SwipeSlider'

export default {
  name: 'home',
  components: { SwipeSlider, SlideContainer },
  data() { return {
    pixiv: {
      illusts: [],
      mangas: [],
      profile: {},
      update: 0
    },
    slider: {
      idx: 1,
    }
  }},
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
  async created() {
    // 取得 PIXIV 的資料
    const pixiv = await talesAPI.getPixivUser(743865);
    this.$set(this.pixiv, 'illusts', Object.values(pixiv.illusts).reverse() );
    this.$set(this.pixiv, 'mangas', Object.values(pixiv.mangas).reverse() );
    this.$set(this.pixiv, 'profile', pixiv.profile);
    this.$set(this.pixiv, 'update', pixiv.update);
  },
}
</script>

<style lang="scss" scoped>

</style>