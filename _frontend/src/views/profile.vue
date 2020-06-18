<template lang="pug">
  .sect-profile
    .index
      img.indexAvatar(src="@/assets/img/avatar_tsukkomu.png")
      router-link.murmur(:to="{name:'murmur'}")
        span 看我碎碎念 → 
        img(src="@/assets/img/comment-alt-lines.svg")
      router-link.illust(:to="{name:'illust'}")
          span 看我畫的圖 → 
          img(src="@/assets/img/images.svg")
      .contact(@click="$emit('showContact')")
        span 聯絡我 → 
        img(src="@/assets/img/envelope.svg")
</template>

<script>
export default {
  name: 'sect-profile'
}
</script>

<style lang="scss" scoped>
.sect-profile {
  margin: 1.5rem;
}
.index {
  padding: 1rem;
  color: var(--secndary-text-dark);
  background-color: var(--secndary-light);
  margin-bottom: 1.5rem;
  border-radius: 0.4rem;

  display: grid;
  grid-template-columns: 5rem auto;
  grid-template-rows: auto auto auto;
  grid-gap: 0.5rem 1.5rem;

  .indexAvatar {
    grid-row: 1 / -1;
    align-self: flex-start;
  }
  
}

.murmur, .illust, .contact {
  display: flex;
  border-bottom: 1px solid var(--gray-2);
  padding-bottom: 0.5rem;
  align-items: center;
  span {
    flex: 1;
  }
  img {
    width: 2rem;
  }
}
</style>