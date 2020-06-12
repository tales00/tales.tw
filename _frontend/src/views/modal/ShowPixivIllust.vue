<template lang="pug">
  article.modal-showPixivIllust(v-if="isIllustLoaded")
    picture
      img(
        v-for="idx in illust.pageCount"
        :src="`//images.weserv.nl/?il&url=pixiv.cat/${illustId}${illust.pageCount>1?'-'+idx:''}.jpg`"
        referrerpolicy="no-referrer"
      )
    .illustInfo
      time.illustCreateDate {{ illust.createDate.match(/\d{4}-\d{2}-\d{2}/)[0] }}
      h2.illustTitle
        a(:href="`//www.pixiv.net/artworks/${illustId}`" target="_blank")
          | {{ illust.title }}
      .author
        a.authorName(:href="user.URL" target="_blank") by {{ user.name }}
      .tags
        a.tag(
          v-for=" (tag, idx) in illust.tags"
          :href="`https://www.pixiv.net/users/${userId}/artworks/${ tag.tag }`"
          target="_blank"
        )
          | {{ tag.tag }}
      .extrnal
        a.linkToPixiv(:href="`//www.pixiv.net/artworks/${illustId}`" target="_blank")
          | view on pixiv
</template>

<script>
import { getPixivIllustData } from '@/api/_api.tales.tw'

export default {
  name: 'modal-showPixivIllust',
  props: {
    illustId: { type: [String, Number] },
    userId: { type: [String, Number], },
  },
  data() { return {
    illust: {},
    user: {},
    isIllustLoaded: false,
  }},
  // computed: { },
  methods: {
    fetchPixivIllust( illustId, userId ) {
      getPixivIllustData( illustId ).then( ({illust, user}) => {
        if( userId && userId !== user.userId ) {
          this.$emit('userError');
        } else {
          this.illust = illust;
          this.user = user;
          this.isIllustLoaded = true;
        }
      });

    }
  },
  created() {
    this.fetchPixivIllust( this.illustId, this.userId );
  }
}
</script>

<style lang="scss" scoped>
.modal-showPixivIllust {
  color: var(--secndary-text-dark);
  display: grid;
  max-height: inherit;

  @media (orientation: Portrait) {
    overflow-y: auto;
  }
  @media (orientation: landscape) {
    grid-template-columns: 1fr minmax(30%, 30vw);
    
    picture {
      max-height: inherit;
      overflow-y: auto;
    }
  }
}
picture {
  background: var(--secndary-light);
}
.illustInfo {
  padding: 0.5rem;
  background-color: hsla(0, 0%, 100%, 0.7);
  overflow-y: auto;
  max-height: inherit;

  @media (orientation: Portrait) {
    position: sticky;
    bottom: 0;
  }
}
.illustCreateDate {
  font-size: 0.6rem;
}
.illustTitle {
  font-weight: bold;
}
.author {
  margin: 0.5rem auto 1rem;
  text-align: right;
}
.authorName {
  font-size: 0.8rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
}
.tag {
  font-size: 0.6rem;
  line-height: 100%;
  color: var(--gray-0);
  background-color: var(--gray-3);
  margin-bottom: 0.2rem;
  margin-right: 0.6rem;
  padding: 0.2rem 0.5rem 0.2rem 0.2rem;
}
.extrnal {
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  .linkToPixiv {
    display: block;
    color: var(--info-text-light);
    background-color: var(--info-color);
    border-radius: 1.5rem;
    padding: 0.2rem 1rem;
  }

}
</style>