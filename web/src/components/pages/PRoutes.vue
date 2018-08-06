<template>
  <div id="routes">
    <ENavbar title="Rotas" navigationBack="true"></ENavbar>
    <div class="search-group">
      <div class="input-group">
        <label>De</label>
        <i class="fa icon-type" :class="['fa-' + from.vehicle_type]"></i>
        <input id="from" type="text" @focus="querying = true; currentInput = 'from'" v-model="fromInput">
      </div>
      <div class="input-group">
        <label>Para</label>
        <i class="fa icon-type" :class="['fa-' + to.vehicle_type]"></i>
        <input id="to" type="text" @focus="querying = true; currentInput = 'to'" v-model="toInput">
      </div>
    </div>
    <div class="stops" v-if="querying">
      <div class="input-group" v-for="stop in filteredStops" v-bind:key="stop.onestop_id" @click="chooseStop(stop)">
        <i class="fa icon-type" :class="['fa-' + stop.vehicle_type]"></i>
        <label>{{ stop.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import ENavbar from '@/components/elements/ENavbar'
import axios from 'axios'

export default {
  name: 'Routes',
  components: {
    ENavbar
  },
  data () {
    return {
      querying: false,
      currentInput: 'from',
      stops: [],
      filteredStops: [],
      from: { onestop_id: '', vehicle_type: '', name: '' },
      to: { onestop_id: '', vehicle_type: '', name: '' },
      fromValue: '',
      toValue: ''
    }
  },
  created () {
    axios.get('https://api.tpp.pt/v1/stops?served_by=o-ez65d-tug')
      .then(response => {
        this.stops = response.data.stops.map(function (stop) {
          return {
            'onestop_id': stop.onestop_id,
            'vehicle_type': stop.served_by_vehicle_types[0],
            'name': stop.name
          }
        })
        this.filteredStops = this.stops
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  computed: {
    fromInput: {
      get: function () {
        return this.fromValue
      },
      set: function (value) {
        this.searchStop(value, 'from')
      }
    },
    toInput: {
      get: function () {
        return this.toValue
      },
      set: function (value) {
        this.searchStop(value, 'to')
      }
    }
  },
  methods: {
    searchStop: function (search, input) {
      if (search.length === 0) {
        this.filteredStops = this.stops
        return
      }
      this.filteredStops = this.stops.filter(function (stop) {
        return stop.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
      })
      if (input === 'from') {
        this.fromValue = search
      }
      if (input === 'to') {
        this.toValue = search
      }
    },
    chooseStop: function (stop) {
      if (this.currentInput === 'from') {
        this.from = stop
        this.fromValue = stop.name
      }
      if (this.currentInput === 'to') {
        this.to = stop
        this.toValue = stop.name
      }
      this.querying = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';
@import '@/assets/scss/fontawesome/fontawesome.scss';
@import '@/assets/scss/fontawesome/fa-solid.scss';
@import '@/assets/scss/fontawesome/fa-regular.scss';
#routes {
  width: 100%;
  height: 100vh;
  background-color: $bg-grey;
  display: flex;
  flex-flow: column;
  .search-group {
    width: 100%;
    background-color: white;
    flex: 0 1 auto;
  }
  .input-group {
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom: 1px solid $bg-grey;
    label {
      display: flex;
      width: 60px;
      line-height: 40px;
      font-size: 14px;
      padding-left: 10px;
      color: $text-dark-grey;
    }
    .icon-type {
      display: flex;
      width: 20px;
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
  .stops {
    background-color: white;
    margin-top: 20px;
    padding: 0px 10px;
    overflow: scroll;
    flex: 1 1 auto;
    .input-group {
      label {
        width: 100%;
      }
    }
  }
}
</style>
