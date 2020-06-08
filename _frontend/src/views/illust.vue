<template lang="pug">
  .illust illust
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { 
  mapState:mapPixivState,
  mapGetters:mapPixivGetters, 
  mapActions:mapPixivActions,
} = createNamespacedHelpers('pixiv');

export default {
  name: 'illust',
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