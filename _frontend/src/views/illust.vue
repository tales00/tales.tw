<template lang="pug">
  .sect-illust
    .account-info
      | {{ profile.description }}
    masonry-block( v-if="isPixivLoaded" ref="illustsMasonry")
      masonry-item( v-for=" (illust, idx) in illusts" )
        .illustCard(@click="pushIllustId(illust.id)")
          img.illust(
            :alt="illust.alt"
            :src="`//images.weserv.nl/?we$il&w=360&url=pixiv.cat/${illust.id}${illust.pageCount>1?'-1':''}.jpg`"
            loading="lazy"
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
    ...mapPixivGetters({ isPixivLoaded: 'isLoaded' }),
  },
  watch: {
    '$route.name': {
      handler( name ) {
        switch ( name ) {
          case 'illust':
            this.illustInit();
            break;

          case 'showPixivIllust':
            this.showPixivInit();
            break;
        
          default:
            break;
        }
      }
    }
  },
  methods: {
    ...mapPixivActions({
      fetchPixivUser: 'fetchUser'
    }),
    illustInit() {
      if( !this.isPixivLoaded ) {
        this.fetchPixivUser(743865).then( () => {
          setTimeout( () => {
            this.setillustEvent();
          }, 1000);
        });
      } else {
        setTimeout( () => {
          window.dispatchEvent( new Event('resize') );
        }, 250);
      }
    },
    setillustEvent() {
      [...this.$refs['illustsMasonry'].$el.querySelectorAll('img.illust')].map( el=>{

        if(el.complete) {
          window.dispatchEvent( new Event('resize') );
        } else {
          el.onload = () => {
            window.dispatchEvent( new Event('resize') );
          }
        }
      
      });
    },
    showPixivInit( isDirectOpen = false ) {
      this.showPixivIllustModal(this.$route.params.illustId, isDirectOpen );
    },
    pushIllustId( illustId ) {
      this.$router.push({ name: 'showPixivIllust', params: { illustId }});
    },
    showPixivIllustModal(illustId, isDirectOpen = false) {
      const popstateEv = () => {
        this.$dialog.hide();
      }
      this.$dialog.show( {
        component: ShowPixivIllust,
        paramObj: {
          dialog: {
            minWidth: '60vw',
            maxWidth: '90vw',
            props: {
              illustId,
              userId: '743865'
            },
            events: {
              'userError': () => {
                window.location.replace(`https://www.pixiv.net/artworks/${illustId}`);
              }
            }
          },
          hook: {
            beforeOpen: () => {
              window.addEventListener('popstate', popstateEv, {once: true});
            },
            beforeClose: () => {              
              if( isDirectOpen ) { this.$router.push({ name: 'illust' }); }
            },
            closed: () => {
              window.removeEventListener('popstate', popstateEv);
              if( 'showPixivIllust' === this.$route.name ) { this.$router.go(-1); }
            }
          }
        }
      } );
    },
  },
  created() {
    if( 'illust' === this.$route.name ) {
      this.illustInit();
    } else {
      this.$once('hook:mounted', ()=>{ this.showPixivInit( true ); });
    }
  },
  mounted() {
    this.$emit('scrollToTop');
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_modules/_variables';

.sect-illust {
  margin: 1.5rem;
}

.account-info {
  padding: 1rem;
  color: var(--secndary-text-dark);
  background-color: var(--secndary-light);
  margin-bottom: 1.5rem;
  border-radius: 0.4rem;
}

.masonryBlock {
  --col-count: 2;
  --col-gap: 0.6rem;
  --row-gap: 0;

  border: 1px solid var(--gray-1);
  padding: 0.5rem;
  margin: 1.5rem auto;
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
  cursor: pointer;
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

  &:hover {
    .illust {
      border: 4px solid var(--gray-2);
    }
  }
}
</style>