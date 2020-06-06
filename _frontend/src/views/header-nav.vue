<template lang="pug">
  nav.navi
    h2.sectionName sectionName
    router-link.routeLink(:to="{name:'about'}") about
    router-link.routeLink(:to="{name:'blog'}") blog
    router-link.routeLink(:to="{name:'illust'}") illust
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
  grid-template-columns: 1fr auto auto auto;
  grid-gap: 1rem;
}
</style>