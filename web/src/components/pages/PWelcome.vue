<template>
  <div id="welcome">
    <ENavbar title="Olá!"></ENavbar>
    <!-- Big Option Menu -->
    <div class="menu-wrapper flex">
      <router-link to="/routes" class="button" tag="div">
        <i class="fa fa-code-branch"></i>
        <div class="text-wrapper">
          <label>Rotas</label>
        </div>
      </router-link>
      <router-link to="/" class="button" tag="div">
        <i class="fa fa-home"></i>
        <div class="text-wrapper">
          <label>Leva-me a casa</label>
        </div>
      </router-link>
      <router-link to="/" class="button" tag="div">
        <i class="fa fa-building"></i>
        <div class="text-wrapper">
          <label>Operadores disponíveis</label>
        </div>
      </router-link>
    </div>
    <!-- Ads Menu -->
    <div class="menu-wrapper">
      <h6>Publicidade</h6>
      <img src="http://via.placeholder.com/800x500">
    </div>
    <!-- Map Menu -->
    <div class="menu-wrapper">
      <h6>Mapa de paragens</h6>
      <img src="http://via.placeholder.com/800x500">
    </div>
  </div>
</template>

<script>
import ENavbar from '@/components/elements/ENavbar'
export default {
  name: 'Welcome',
  components: {
    ENavbar
  },
  data () {
    return {
      big_option_text: {
        rotas: 'Rotas disponíveis',
        take_me_home: 'Leva-me a casa <> disponível',
        operators: 'Operadores disponíveis'
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
  nav {
    background-color: $bg-blue;
    color: #FFF;
    font-weight: lighter;
    min-height: 45px;
    display: flex;
    .menu {
      display: flex;
      flex-grow: 2;
      align-items: left;
      align-content: left;
      justify-content: left;
    }
    .title {
      display: flex;
      flex-grow: 3;
      align-items: center;
      align-content: center;
      justify-content: center;
    }
    .icon {
      display: flex;
      flex-grow: 1;
      align-items: right;
      align-content: right;
      justify-content: right;
      img {
        width: 45px;
      }
    }
  }
  .menu-wrapper {
    padding: 0.8em;
    background-color: $bg-grey;
    @include box-shadow();
    &:not(:first-of-type) {
      margin-top: 0.8em;
    }
    &.flex {
      display: flex;
    }
    .button {
      position: relative;
      padding: 0.5em;
      width: 100%;
      background-color: white;
      border-radius: 3px;
      @include box-shadow();
      text-align: center;
      &:first-of-type {
        margin-right: 10px;
      }
      &:last-of-type {
        margin-left: 10px;
      }
      cursor: pointer;
      i {
        display: block;
        width: 100%;
        font-size: 2em;
        color: $bg-dark-grey;
      }
      .text-wrapper {
        text-align: center;
        padding-bottom: 5px;
        label {
          cursor: pointer;
          width: 100%;
          font-weight: lighter;
          font-size: 12px;
          text-decoration: none;
          color: $text-dark;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
        }
      }
    }
    h6 {
      font-size: 12px;
      color: $text-dark;
    }
    img {
      width: 100%;
      margin-top: 0.8em;
    }
  }
}
</style>
