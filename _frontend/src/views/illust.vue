<template lang="pug">
  .illust
    masonry-block( :colCount="3" )
      masonry-item(
        v-for=" illust in illusts"
      )
        img(:src="`//images.weserv.nl/?we&w=360&url=pixiv.cat/${illust.id}${illust.pageCount>1?'-1':''}.jpg`")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { masonryBlock, masonryItem } from '@/components/masonryBlock'
const { 
  mapState:mapPixivState,
  mapGetters:mapPixivGetters, 
  mapActions:mapPixivActions,
} = createNamespacedHelpers('pixiv');

export default {
  name: 'illust',
  components: { masonryBlock, masonryItem },
  computed: {
    ...mapPixivState(['illusts', 'mangas', 'profile', 'update',]),
    ...mapPixivGetters({
      isPixivLoaded: 'isLoaded'
    }),
  },
  methods: {
    ...mapPixivActions({
      fetchPixivUser: 'fetchUser'
    }),
  },
  created() {
    if( !this.isPixivLoaded ) {
      console.log('fetch pixiv');
      
      this.fetchPixivUser(743865);
    } else {
      console.log('not fetch pixiv');
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_modules/_variables';

.illust {
  margin: 1.5rem;
}

.masonryBlock {
  --col-count: 2;
  --col-gap: 0.5rem;
  // --row-gap: 1rem;
  // @media (min-width: $size-xs) { --col-count: 2; }
  @media (min-width: $size-sm) { --col-count: 3; }
  @media (min-width: $size-md) { --col-count: 4; }
  @media (min-width: $size-lg) { --col-count: 5; }
  // @media (min-width: $size-xl) { --col-count: 6; }
  // @media (min-width: $size-xxl) { --col-count: 7; }
}
</style>