<template>
  <div id="welcome">
    <nav>
      <div class="menu">&nbsp;</div>
      <div class="title">
        <label>Olá!</label>
      </div>
      <div class="icon">
        <img src="../assets/logo.svg">
      </div>
    </nav>
    <div class="big-option-menu">
      <div class="button" @click="bigOptionButton('rotas')">
        <div class="text-wrapper">
          <a href="#">Rotas</a>
        </div>
      </div>
      <div class="button" @click="bigOptionButton('take_me_home')">
        <div class="text-wrapper">
          <a href="#">Leva-me a casa</a>
        </div>
      </div>
      <div class="button" @click="bigOptionButton('operators')">
        <div class="text-wrapper">
          <a href="#">Operadores<br>disponíveis</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      big_option_text: {
        rotas: 'Rotas disponíveis',
        take_me_home: 'Leva-me a casa <> disponível',
        operators: 'Operadores disponíveis'
      }
    }
  },
  methods: {
    bigOptionButton: function (type) {
      console.log(this.big_option_text[type])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#welcome {
  width: 100%;
  height: 100vh;
  nav {
    background-color: #0391ff;
    color: #FFF;
    font-weight: lighter;
    min-height: 45px;
    display: flex;
    .menu {
      display: flex;
      flex-grow: 1;
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
  .big-option-menu {
    background-color: #DDD;
    display: flex;
    .button {
      position: relative;
      display: flex;
      padding: 0.5em;
      height: 70px;
      flex-grow: 1;
      width: 100%;
      margin: 10px;
      background-color: #FFF;
      border-radius: 3px;
      box-shadow: 1px 1px 1px #BBB;
      cursor: pointer;
      .text-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        padding-bottom: 5px;
        a {
          width: 100%;
          font-weight: lighter;
          font-size: 12px;
          text-decoration: none;
          color: #444;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome and Opera */
        }
      }
    }
  }
}
</style>
