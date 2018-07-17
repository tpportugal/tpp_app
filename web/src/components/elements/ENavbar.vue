<template>
    <nav>
        <div class="menu">
            <router-link to="/" tag="i" class="fas fa-arrow-left navigation-back" v-if="navigationBack"></router-link>
        </div>
        <div class="title">
            <label>{{ title }}</label>
        </div>
        <div class="icon">
            <img src="../../assets/logo.svg">
        </div>
    </nav>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    },
    navigationBack: {
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';
@import '../../assets/scss/fontawesome/fontawesome.scss';
@import '../../assets/scss/fontawesome/fa-solid.scss';
nav {
    background-color: $bg-blue;
    color: #FFF;
    font-weight: lighter;
    min-height: 45px;
    display: flex;
    .menu {
        display: flex;
        width: 20%;
        align-items: left;
        align-content: left;
        justify-content: left;
        .navigation-back {
            cursor: pointer;
            line-height: 45px;
            padding-left: 0.8em;
        }
    }
    .title {
        display: flex;
        width: 60%;
        align-items: center;
        align-content: center;
        justify-content: center;
    }
    .icon {
        display: flex;
        width: 20%;
        align-items: right;
        align-content: right;
        justify-content: right;
        img {
            width: 45px;
        }
    }
}
</style>
