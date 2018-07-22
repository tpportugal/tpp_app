<template>
  <div id="routes">
    <ENavbar title="Rotas" navigationBack="true"></ENavbar>
    <div class="search-group">
      <div class="input-group">
        <label>De</label>
        <i class="far fa-dot-circle icon-type"></i>
        <input id="from" type="text">
      </div>
      <div class="input-group">
        <label>Para</label>
        <i class="fa fa-train icon-type"></i>
        <input id="to" type="text">
      </div>
    </div>
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
@import '../../assets/scss/fontawesome/fa-regular.scss';
#routes {
  width: 100%;
  height: 100vh;
  background-color: $bg-grey;
  .search-group {
    width: 100%;
    background-color: white;
    .input-group {
      width: 100%;
      height: 40px;
      display: flex;
      border-bottom: 1px solid $bg-grey;
      label {
        display: flex;
        width: 15%;
        line-height: 40px;
        font-size: 14px;
        padding-left: 10px;
        color: $text-dark-grey;
      }
      .icon-type {
        display: flex;
        width: 5%;
        line-height: 40px;
        color: $text-blue;
      }
      input {
        display: flex;
        width: 80%;
        padding-left: 10px;
        background-color: white;
        border: none;
        font-size: 14px;
      }
    }
  }
}
</style>
