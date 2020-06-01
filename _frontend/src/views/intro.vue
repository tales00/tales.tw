<template lang="pug">
  .intro
    //-
    figure.intro-img
      img(src="@/assets/img/header_bg_harakaze_curry.jpg")
    //-
    .advocate
      h3 "devoted to stupidity"
      h1 做前端有時也畫圖的人
    //-
    figure.avatar
      img(src="@/assets/img/avatar_tales_color.jpg")
    // -
    nav
      .entry
        img(src="@/assets/img/user-circle.svg")
      .entry
        img(src="@/assets/img/comment-alt-lines.svg")
      .entry
        img(src="@/assets/img/images.svg")
      .entry
        img(src="@/assets/img/envelope.svg")
      .entry
        img(src="@/assets/img/qrcode.svg")
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.intro {
  height: calc( 100vh - 3rem);
  margin: 1.5rem;

  display: grid;
  grid-template-rows: calc((100vh - 3rem) / 2.5) auto 1fr auto;
  // justify-content: center;
  justify-items: center;

  background-image: url('~@/assets/img/bg_check_note.jpg');
  background-size: cover;

  box-shadow: 0 0.5em 1em rgba(0,0,0,0.5);
}

.intro-img {
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top left;
  }
}

.advocate {
  color: var(--secndary-text-dark);
  text-align: center;
  font-weight: bolder;
  h3 {
    font-size: 1.3rem;
    margin: 1.3rem auto;
  }
  h1 {
    font-size: 1.6rem;
    margin: 1.6rem auto;;
  }
}

.avatar {
  display: grid;
  place-content: center;
  img {
    border-radius: 50%;
    height: 16vmax;
    box-shadow: 0 0.5em 1em rgba(0,0,0,0.5);
  }
}

nav {
  display: grid;
  padding: 1rem;
  grid-auto-flow: column;
  grid-gap: 2rem;
  // justify-content: center;

  .entry {
    width: 2.5rem;
  }
}
</style>