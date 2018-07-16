<template>
  <div id="welcome">
    <nav>
      Hello
    </nav>
    <h2>{{ msg }}</h2>
    <div class="test">
      <p>BIG AND SMALL</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
  }
  h2 {
    color: blue;
  }
  .test {
    width: 300px;
    background-color: black;
    p {
      color: white;
      font-size: 30px;
    }
  }
}
</style>
