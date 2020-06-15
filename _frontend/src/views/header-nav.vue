<template lang="pug">
  nav.navi
    h2.sectionName {{ $route.meta.sectionName }}
    router-link.routeLink(:to="{name:'profile'}") about
    router-link.routeLink(:to="{name:'murmur'}") murmur
    router-link.routeLink(:to="{name:'illust'}") illust
    .modal(@click="$emit('showContact')")
      img(src="@/assets/img/envelope.svg")
    .modal(@click="$emit('showQRcode')")
      img(src="@/assets/img/qrcode.svg")
</template>

<script>
export default {
  name: 'header-nav'
}
</script>

<style lang="scss" scoped>
.navi {
  padding: 0.4rem 1.5rem;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr repeat(5, auto);
  grid-gap: 1rem;

  align-items: center;

  background-color: var(--primary-dark);
  border-bottom: 0.1rem solid var(--primary-color);
  box-shadow: 0 5px 5px rgba(0,0,0,0.3);
}

.modal {
  img {
    display: block;
    height: 1.4rem;
    filter: invert(1);
  }
}
</style>