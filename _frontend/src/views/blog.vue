<template lang="pug">
  .sect-blog
    .plurkProfile
      | {{ plurkProfile.name }}
    .plurkPosts
      article.plurkPost( v-for=" (post, idx) in plurkPost")
       | {{ post.content }}
</template>

<script>
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
    }
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
</style>