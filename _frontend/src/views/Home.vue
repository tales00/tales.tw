<template lang="pug">
  .home
</template>

<script>
// @ is an alias to /src
// import { talesAPI } from '@/api'
// import { SwipeSlider, SlideContainer } from '@/components/SwipeSlider'

export default {
  name: 'home',
  // components: { SwipeSlider, SlideContainer },
  data() { return {
    // pixiv: {
    //   illusts: [],
    //   mangas: [],
    //   profile: {},
    //   update: 0
    // },
    // slider: {
    //   idx: 1,
    // }
  }},
  methods: {
  },
  async created() {
    // 取得 PIXIV 的資料
    // const pixiv = await talesAPI.getPixivUserData(743865);
    // this.$set(this.pixiv, 'illusts', pixiv.illusts );
    // this.$set(this.pixiv, 'mangas', pixiv.mangas );
    // this.$set(this.pixiv, 'profile', pixiv.profile);
    // this.$set(this.pixiv, 'update', pixiv.update);
  },
}
</script>

<style lang="scss" scoped>

</style>