<template lang="pug">
  figure.modal-qrcode
    img(src="@/assets/img/tales.tw_qrcode.png")
</template>

<script>
export default {
  name: 'modal-qrcode'
}
</script>

<style lang="scss" scoped>
.modal-qrcode {
  display: flex;
  place-content: center;
}

img {
  width: 8cm;
  max-height: inherit;
  max-width: inherit;
}
</style>