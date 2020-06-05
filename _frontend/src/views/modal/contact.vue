<template lang="pug">
  .modal-contact
    h4 mail : talesworks@gmail.com
    h4 follow my activity or Contact me on :
    a(href="https://plurk.com/taleslogs")
      img.icon(src="@/assets/img/logo-plurk.png")
      | plurk
    a(href="https://pixiv.me/tales00") 
      img.icon(src="@/assets/img/logo-pixiv.svg")
      | pixiv
</template>

<script>
export default {
  name: 'modal-contact'
}
</script>

<style lang="scss" scoped>
.modal-contact {
  a {
    margin: 1rem auto;
    display: grid;
    grid-template-columns: 4rem auto;
    grid-gap: 1rem;

    align-items: center;

    img {
      max-width: 100%;
    }
  }
}
</style>