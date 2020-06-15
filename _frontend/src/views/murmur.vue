<template lang="pug">
  .sect-blog
    .plurkProfile
      img.plurkavatar(:src="plurkProfile.avatar" referrerpolicy="no-referrer")
      h2 “ 就只是平日的碎碎念… 也沒有念很多啦 ”
      a(href="//www.plurk.com/taleslogs" target="_blank") …view all my murmur on plurk

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
          | ( read comments... )
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

.plurkProfile {
  padding: 1rem;
  color: var(--secndary-text-dark);
  background-color: var(--secndary-light);
  margin-bottom: 1.5rem;
  border-radius: 0.4rem;

  display: grid;
  grid-template-columns: 5rem auto;
  grid-template-rows: auto auto;
  grid-gap: 0.5rem 1.5rem;
  
  align-items: center;

  .plurkavatar {
    grid-row: 1 / -1;
    align-self: flex-start;
  }

  a {
    font-size: 0.9rem;
    justify-self: flex-end;
  }
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
  grid-template-columns: min(6rem, 8vw) 1fr;
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
  .timestamp {
    font-size: 0.7rem;
    text-align: right;
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
        // opacity: 0.5;
        margin: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        
        img { 
          margin: 0.5rem;
          width: 100%;
          max-width: 5rem;
        }
      }
      
    }
    
  }

  .originLink {
    color: var(--gray-3);
    text-align: right;
    padding: 0.5rem;
    margin-top: 0.15rem;
  }
} 
</style>