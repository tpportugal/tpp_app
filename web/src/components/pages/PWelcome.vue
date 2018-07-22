<template>
  <div id="welcome">
    <ENavbar title="Olá!"></ENavbar>
    <!-- Big Option Menu -->
    <EMenuWrapper flex="true">
      <div class="button" @click="$router.push('routes')">
        <i class="fa fa-code-branch"></i>
        <div class="text-wrapper">
          <label>{{ labels.menu_wrapper.routes }}</label>
        </div>
      </div>
      <div class="button" @click="$router.push('take-me-home')">
        <i class="fa fa-home"></i>
        <div class="text-wrapper">
          <label>{{ labels.menu_wrapper.take_me_home }}</label>
        </div>
      </div>
      <div class="button" @click="$router.push('operators')">
        <i class="fa fa-building"></i>
        <div class="text-wrapper">
          <label>{{ labels.menu_wrapper.operators }}</label>
        </div>
      </div>
    </EMenuWrapper>
    <!-- Ads Menu -->
    <EMenuWrapper>
      <h6>Publicidade</h6>
      <img src="http://via.placeholder.com/800x500">
    </EMenuWrapper>
    <!-- Map Menu -->
    <EMenuWrapper>
      <h6>Mapa de paragens</h6>
      <img src="http://via.placeholder.com/800x500">
    </EMenuWrapper>
  </div>
</template>

<script>
import ENavbar from '@/components/elements/ENavbar'
import EMenuWrapper from '@/components/elements/EMenuWrapper'
export default {
  name: 'Welcome',
  components: {
    ENavbar,
    EMenuWrapper
  },
  data () {
    return {
      labels: {
        menu_wrapper: {
          routes: 'Rotas',
          take_me_home: 'Leva-me a casa',
          operators: 'Operadores'
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';
@import '../../assets/scss/fontawesome/fontawesome.scss';
@import '../../assets/scss/fontawesome/fa-solid.scss';
#welcome {
  width: 100%;
  height: 100vh;
}
</style>
