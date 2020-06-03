<template lang="pug">
  .intro
    //-
    picture.intro-img
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
@import '~@/scss/_modules/_variables';
.intro {
  --intro-height: calc(100vh - 3rem);
  --intro-width: calc(100vw - 3rem);
  margin: 1.5rem;
  height: var(--intro-height);
  display: grid;

  background-image: url('~@/assets/img/bg_check_note.jpg');
  background-size: cover;

  box-shadow: 0 0.5em 1em rgba(0,0,0,0.5);
}

.intro-img {
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top right;
  }
}

.advocate {
  color: var(--gray-5);
  text-align: center;
  font-weight: bolder;
  letter-spacing: 0.1rem;
  transform: scaleY(0.8) skewX(-16deg);
  h3 {
    font-style: italic;
    font-size: calc( var(--intro-width) / 18);
  }
  h1 {
    font-size: calc( var(--intro-width) / 16);
  }
}

.avatar {
  img {
    place-self: center;
    border-radius: 50%;
    box-shadow: 0 0.5em 1em rgba(0,0,0,0.5);
    
    max-height: 80%;
    max-width: 60%;
  }
}

nav {
  display: grid;
  padding: 1rem;
  grid-auto-flow: column;
  justify-content: space-evenly;
  align-items: center;
  .entry {
    width: calc( ((100vmin - 3rem) - 2rem) / 7 );
    max-width: 2rem;
    img {
      display: block;
      margin: auto;
    }
  }
}
// 橫 1.5:1 以內或者直的
@media (max-aspect-ratio: 480/320) {
  .intro {
    grid-template-rows: calc(var(--intro-height) / 3) auto 1fr auto;
  }
  .advocate {
    h3 { margin: 0.3em auto; }
    h1 { margin: 0.5em auto; }
  }
  .avatar { display: grid; }
}
// 橫 1.5:1 或者更寬
@media (min-height: $size-sm) and (min-width: $size-md), (min-aspect-ratio: 480/320) {
  .intro {
    position: relative;
    grid-template-columns: calc(var(--intro-width) / 3) 1rem 1fr;
    grid-template-rows: auto 1fr;
  }

  .intro-img { grid-row: span 2; }

  .advocate {
    grid-column: 3;
    text-align: left;
    padding-right: 1.5rem;
    h3 {
      font-size: calc( var(--intro-width) / 28);
      margin: 3vmin auto;
      margin-left: 1rem;
    }
    h1 {
      font-size: calc( var(--intro-width) / 22);
      margin: 6vmin auto;
      margin-left: 1rem;
    }
  }

  .avatar {
    grid-column: 2;
    grid-row: span 2;
    img{
      position: absolute;
      top: 50%;
      // left: calc(var(--intro-width) / 3);
      width: calc(var(--intro-height) / 3);
      height: calc(var(--intro-height) / 3);

      transform: translateX(-50%) translateY(-50%);;
    }
  }

  nav {
    padding: 1rem;
    padding-left: 0;
    align-self: flex-end;
    .entry {
      width: calc( ((var(--intro-width) / 3 * 2 ) - 2rem) / 7 );
    }
  }
}
@media (min-height: $size-sm) {
  .intro {
    --intro-height: calc(var(--size-sm) - 3rem);
  }
  .advocate {
    h3 { margin-top: 1rem; margin-bottom: 0;}
    h1 { margin-top: 1.5rem; margin-bottom: 0;}
  }
}
@media (min-height: $size-md) {
  .intro {
    --intro-height: calc(var(--size-md) - 3rem);
  }
}
@media (min-width: $size-sm) {
 nav {
    justify-content: flex-end;
    .entry {
      margin: auto 0.6rem;
    }
  }
}
@media (min-width: $size-md) {
  .intro {
    --intro-width: calc(var(--size-md) - 3rem);
    grid-template-columns: 1fr 1rem auto;
  }
  .avatar {
    img{
      left: unset;
    }
  }
  nav {
    padding: 1rem 1.5rem;
    padding-left: 4rem;
    align-self: flex-end;
  }
}
</style>