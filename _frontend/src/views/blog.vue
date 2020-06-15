<template lang="pug">
  .sect-blog
    .plurkProfile
      | {{ plurkProfile.name }}
    .plurkPosts
      article.plurkPost( v-for=" (post, idx) in plurkPost")
        .avatar
          img(:src="plurkProfile.avatar")
        .author
          span.originAuthor(v-if="'taleslogs' !== post.author") 轉 
          span.authorName {{ post.author }}
        .timestamp
          | {{ publishedTimeAgo(post.published) }}
        .content( v-html="processPlurkContent(post)" )
        a.originLink( :href="'https://www.plurk.com' + post.url")
          | (read more...)
</template>

<script>
import { dateToTimeStamp, dateToTimeAgo, htmlDecode } from '@/plugins/_util'
import { createNamespacedHelpers } from 'vuex'

const { 
  // mapState:mapPlurkState,
  mapGetters:mapPlurkGetters, 
  mapActions:mapPlurkActions,
} = createNamespacedHelpers('plurk');

export default {
  name: 'sect-blog',
  computed: {
    ...mapPlurkGetters({
      isPlurkProfileLoaded: 'isProfileLoaded', plurkProfile: 'profile',
      isPlurkPostLoaded: 'isPostLoaded', plurkPost: 'post',
    }),
  },
  methods: {
    ...mapPlurkActions({
      fetchPlurkProfile: 'fetchProfile',
      fetchPlurkPost: 'fetchPost',
      }),
    plurkInit() {
      if( !this.isPlurkPostLoaded ) {
        this.fetchPlurkPost('taleslogs');
      }

      if( !this.isPlurkProfileLoaded ) {
        this.fetchPlurkProfile('taleslogs');
      }
    },
    publishedTimeAgo( time ) {
      return dateToTimeAgo( dateToTimeStamp( time ) );
    },
    processPlurkContent( post ) {
      return htmlDecode(post.content)
        .replace( new RegExp(`^.*${post.author}\\s`), '')
        .replace(/src="http(s)?:\/\//g, 'src="//images.weserv.nl/?il&url=')
      ;
    },
  },
  created() {
    this.plurkInit();
  },
  mounted() {
    this.$emit('scrollToTop');
  }
}
</script>

<style lang="scss" scoped>
@import '~@/scss/_modules/_variables';

.sect-blog {
  margin: 1.5rem;
}

.plurkPosts {
  display: grid;
  grid-gap: 1rem;

  @media (min-width: $size-md) {
    grid-template-columns: 1fr 1fr;
  }
}

.plurkPost {
  display: grid;
  grid-template-columns: min(5rem, 12vw) 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'avatar author'
    'avatar content'
    'timestamp content'
    '... originLink'
  ;

  grid-gap: 0 0.5rem;

  .avatar { grid-area: avatar; }
  .author { grid-area: author; }
  .timestamp { grid-area: timestamp; }
  .content { grid-area: content; }
  .originLink { grid-area: originLink; }

  .avatar {
    img {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }
  .author, .content, .originLink { 
    background-color: var(--secndary-light);
  }
  .author {
    color: var(--gray-3);
    font-size: 1.2rem;
    font-weight: bold;

    padding: 0.5rem;
    margin-bottom: 0.15rem;
  }
  .content {
    color: var(--secndary-text-dark);
    padding: 1rem;

    ::v-deep {
      .ex_link, .meta {
        border: 1px solid #d1d1d1;
        padding: 0.2rem;
        
        &:hover {
          border: 1px solid #d0d0d0;
          background: #ddd;
        }
    
        img {
          height: unset;
          max-width: 100%;
          display: block;
        }
      }
      .ex_link {}
      .ex_link:not(.meta) {
        display: inline-block;
        text-decoration: underline;
      }
    
      .meta {
        opacity: 0.5;
        margin: 1rem auto;
        display: grid;
        grid-template-columns: 2fr 6fr;
        grid-gap: 1rem;
        align-items: center;
        
        img { width: 100%; }
      }
      
    }
    
  }

  .originLink {
    color: var(--gray-2);
    text-align: right;
    padding: 1rem;
  }
} 
</style>