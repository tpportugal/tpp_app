<template>
  <div id="pages">
    <ENavbar title="Rotas" navigationBack="true"></ENavbar>
    <p>Rotas fixes</p>
  </div>
</template>

<script>
import ENavbar from '@/components/elements/ENavbar'
export default {
  name: 'Routes',
  components: {
    ENavbar
  },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';
@import '../../assets/scss/fontawesome/fontawesome.scss';
@import '../../assets/scss/fontawesome/fa-solid.scss';
#rotas {
  width: 100%;
  height: 100vh;
}
</style>
