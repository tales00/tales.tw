<template lang="pug">
  .sect-illust
    masonry-block( v-if="isPixivLoaded" )
      masonry-item( v-for=" (illust, idx) in illusts" )
        .illustCard(@click="showPixivIllustModal(illust.id)")
          img.illust(
            :alt="illust.alt"
            :src="`//images.weserv.nl/?we&w=360&url=pixiv.cat/${illust.id}${illust.pageCount>1?'-1':''}.jpg`"
            referrerpolicy="no-referrer"
          )
          time.illustCreateDate {{ illust.createDate.match(/\d{4}-\d{2}-\d{2}/)[0] }}
          h3.illustTitle {{ illust.title }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { masonryBlock, masonryItem } from '@/components/masonryBlock'
import ShowPixivIllust from '@/views/modal/ShowPixivIllust'

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
  // watch: { },
  methods: {
    ...mapPixivActions({
      fetchPixivUser: 'fetchUser'
    }),

    showPixivIllustModal(illustId) {
      
      this.$dialog.show( {
        component: ShowPixivIllust,
        paramObj: {
          dialog: {
            props: {
              illustId,
              userId: '743865'
            },
            events: {
              'onIllustLoaded': () => {
                console.log('got loaded event');
              }
            }
          },
        }
      } );
    },
  },
  created() {
    if( 'illust' === this.$route.name && !this.isPixivLoaded ) {
      console.log('fetch pixiv');
      this.fetchPixivUser(743865);
    } else {
      console.log('not fetch pixiv');
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_modules/_variables';

.sect-illust {
  margin: 1.5rem;
}

.masonryBlock {
  --col-count: 2;
  --col-gap: 0.6rem;
  --row-gap: 0;
  // --row-gap: 1rem;
  // @media (min-width: $size-xs) { --col-count: 2; }
  @media (min-width: $size-sm) { --col-count: 3; }
  // @media (min-width: $size-md) { --col-count: 4; }
  @media (min-width: $size-lg) { --col-count: 4; }
  // @media (min-width: $size-xl) { --col-count: 6; }
  // @media (min-width: $size-xxl) { --col-count: 7; }

  .masonryItem { }
}

.illustCard {
  // border: 1px solid #000;
  margin-bottom: 1.2rem;
  .illust {
    width: 100%;
    display: block;
    border: 4px solid var(--gray-4);
  }
  .illustCreateDate {
    font-size: 0.5rem;
  }
  .illustTitle {
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 125%;
  }
}
</style>