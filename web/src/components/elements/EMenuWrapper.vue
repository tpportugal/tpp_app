<template>
    <div class="menu-wrapper" :class="{ flex }">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    flex: {
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
        height: 75px;
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
        .fa {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 2em;
            color: $text-blue;
        }
        .text-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
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
</style>
