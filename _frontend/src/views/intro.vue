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
  --intro-max-height: calc( 100vh - 3rem);
  --intro-size: calc(var(--intro-max-height) / 3);
  // position: relative;
  height: var(--intro-max-height);
  max-height: var(--intro-max-height);
  margin: 1.5rem;

  display: grid;
  grid-template-rows: var(--intro-size) auto 1fr auto;
  // justify-items: center;

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
  color: var(--gray-5);
  text-align: center;
  font-weight: bolder;
  letter-spacing: 0.1rem;
  transform: scaleY(0.8) skewX(-16deg);
  h3 {
    font-style: italic;
    font-size: 5vmin;
    margin: 1.3rem auto;
  }
  h1 {
    font-size: 6vmin;
    margin: 1.5rem auto;
  }
}

.avatar {
  place-self: stretch;
  display: grid;
  img {
    place-self: center;
    border-radius: 50%;
    box-shadow: 0 0.5em 1em rgba(0,0,0,0.5);
    height: 50vmin;
    max-height: 80%;
  }
}

nav {
  display: grid;
  padding: 1rem;
  grid-auto-flow: column;
  place-self: stretch;
  justify-content: space-between;
  align-items: center;
  .entry {
    width: calc( ((100vw - 3rem) - 2rem) / 7 );
    max-width: 10vmin;
    img {
      display: block;
      margin: auto;
    }
  }
}

// @media (max-height: $max-mobile) and (min-aspect-ratio: 480/320) {
@media (min-aspect-ratio: 480/320) {
  .intro {
    --intro-size: calc((100vw - 3rem) / 3);
    grid-template-rows: auto 1fr;
    grid-template-columns: var(--intro-size) 1fr;
    justify-items: unset;
  }

  .intro-img { grid-row: span 2; }

  .avatar {
    position: absolute;
    top: calc( 50vh - 6rem);
    left: calc(100vw / 3 - 3rem);
    img{
      height: 24vmin;
      
    }
  }

  .advocate {
    text-align: left;
    padding-left: 1rem;
    h3 {
      font-size: 4vmin;
      margin: 2vmin;
    }
    h1 {
      font-size: 6vmin;
      margin: 4vmin 2vmin;
    }
  }

  nav {
    padding: 4vmin;
    align-self: end;
    .entry {
      width: calc( ((var(--intro-size) * 2 - 2rem) / 7 ));
    }
  }
}
@media (min-height: $min-tablet) and (max-aspect-ratio: 320/568) {
  .intro {
    --intro-max-height: calc( var(--size-md) * 0.9);
    --intro-size: calc(var(--intro-max-height) / 3);
    
  }
}
@media (min-height: $min-tablet) and (min-width: $min-tablet) {
  .intro {
    --intro-max-width: calc( var(--size-md) - 3rem);
    --intro-max-height: calc( (var(--intro-max-width) * 1.6 ) - 6rem );
    height: calc( 100vh - 6rem);
    max-height: var(--intro-max-height);
    margin: 3rem;
  }
  .advocate {
    letter-spacing: 0.5rem;
  }
  @media (max-aspect-ratio: 480/320){
    .intro {
      --intro-size: calc( var(--intro-max-height) / 3);
      max-width: var(--intro-max-width);
      margin: 3rem auto;
    }
    .advocate {
      h3 {
        font-size: 1.2rem;
        margin: 1rem;
      }
      h1 {
        font-size: 1.6rem;
        margin: 1rem;
      }
    }

    .avatar {
      img {
        height: calc( var(--intro-max-width) * 24% );
        max-height: 80%;
      }
    }

    nav {
      justify-content: space-evenly;
      .entry {
        width: calc( (var(--intro-max-width) - 2rem) / 7 );
        max-width: 8vmin;
      }
    }
  }
}

@media (min-width: $min-wide) and (min-aspect-ratio: 480/320) {
  .intro {
    --intro-max-width: calc( var(--size-xl) - 6rem);
    --intro-max-height: calc( (var(--intro-max-width) * 0.8 ) - 6rem );
    --intro-size: calc(var(--intro-max-width) / 3);
  }
  .advocate {
    h3 {
      font-size: 1.5rem;
      margin: 2rem;
    }
    h1 {
      font-size: 2.5rem;
      margin: 2rem;
    }
  }
  .avatar {
    top: calc( (var(--intro-max-height) / 2) + 3rem);
    left: calc( ((100vw - var(--intro-max-width)) / 2) + var(--intro-size) );
    transform: translate(-50%, -50%);
  }
  nav {
    padding: 2rem;
  }
}
</style>