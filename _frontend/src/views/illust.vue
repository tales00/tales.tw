<template lang="pug">
  .sect-illust
    .account-info
      img.pixivLogo(src="@/assets/img/logo-pixiv.svg")
      p.userName {{ profile.name }} ：
      h2 “ {{ profile.description }} ”
      a(:href="profile.url" target="_blank") …view all my works on pixiv
    masonry-block( v-if="isPixivLoaded" ref="illustsMasonry")
      masonry-item( v-for=" (illust, idx) in allWorks" )
        .illustCard(@click="pushIllustId(illust.id)")
          img.illust(
            :alt="illust.alt"
            :data-illust-id="`pixiv:${illust.id}`"
            :data-src="`//images.weserv.nl/?we&il&w=320&url=pixiv.cat/${illust.id}${illust.pageCount>1?'-1':''}.jpg`"
            loading="lazy"
            referrerpolicy="no-referrer"
          )
          time.illustCreateDate {{ illust.createDate.match(/\d{4}-\d{2}-\d{2}/)[0] }}
          h3.illustTitle {{ illust.title }}
      masonry-item
        a.illustCard(:href="profile.url" target="_blank")
          img.pixivLogo(src="@/assets/img/logo-pixiv.svg")
          h3 view all my works on pixiv
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
  // data() { return { }},
  computed: {
    ...mapPixivState(['illusts', 'mangas', 'profile', 'update',]),
    ...mapPixivGetters({ isPixivLoaded: 'isLoaded', allWorks: 'allWorks' }),
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
    ...mapPixivActions({ fetchPixivUser: 'fetchUser' }),

    // view 'illust' 的 init
    // 載入 pixiv 的資料後或者立刻設定 lazy load
    illustInit() {
      if( !this.isPixivLoaded ) {
        this.fetchPixivUser(743865).then( () => {
          setTimeout( this.setillustEvent, 1000);
        });
      } else {
        setTimeout( this.setillustEvent, 100);
      }
    },

    // 給載入的 img 設定 lazy load （或者立刻載入）
    setillustEvent() {
      // 將 data-src 改回 src
      const dataSrcToSrc = img => {
        img.setAttribute('src', img.dataset.src) // 把值塞回 src
        img.removeAttribute('data-src');
        img.onload = () => {
          setTimeout( ()=>{
            window.dispatchEvent( new Event('resize') );
          }, 100);
        };
      };

      // 設定目標進入畫面時要做什麼
      const onEnterView = ( entries, observer ) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            // 監視目標進入畫面
            const img = entry.target;
            if( img.dataset.src ) {
              dataSrcToSrc(img);
            }
            observer.unobserve(img) // 取消監視
          }
        }
      };

      const watcher = new IntersectionObserver(onEnterView);

      // 逐個將瀑布流中的 img 設定 lazy load
      [...this.$refs['illustsMasonry'].$el.querySelectorAll('img.illust')].map( img=>{
        watcher.observe(img);
      });
    },

    // view 'showPixivIllust' 的 init
    // 開啟 modal ， isDirectOpen 表示是直接進入這個 route 的狀態
    showPixivInit( isDirectOpen = false ) {
      this.showPixivIllustModal(this.$route.params.illustId, isDirectOpen );
    },

    // 切入 showPixivIllust 的 route
    pushIllustId( illustId ) {
      this.$router.push({ name: 'showPixivIllust', params: { illustId }});
    },

    // 開啟 modal
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

  display: grid;
  grid-template-columns: 5rem auto;
  grid-template-rows: auto auto auto;
  grid-gap: 0.5rem 1.5rem;
  
  align-items: center;

  .pixivLogo {
    grid-row: 1 / -1;
    align-self: flex-start;
  }

  a {
    font-size: 0.9rem;
    justify-self: flex-end;
  }
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
  margin-bottom: 1.2rem;
  .illust {
    width: 100%;
    max-width: 100%;
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