<template>
  <div id="routes">
    <ENavbar title="Rotas" navigationBack="true"></ENavbar>
    <div class="search-group">
      <div class="input-group">
        <div class="info">
          <label>De</label>
        </div>
        <i class="fa icon-type" :class="[getIconType(origin)]"></i>
        <input type="text" @focus="querying = true; currentInput = 'origin'" v-model="originInput">
      </div>
      <div class="input-group">
        <div class="info">
          <label>Para</label>
        </div>
        <i class="fa icon-type" :class="[getIconType(destination)]"></i>
        <input type="text" @focus="querying = true; currentInput = 'destination'" v-model="destinationInput">
      </div>
      <div class="input-group">
        <div class="info toggle">
          <label class="location" :class="{ toggled : toggleTime == 'departure'}" @click.prevent="toggleTime = 'departure'; getTimetable()">Partir</label>
          <label class="toggle-separator">ou</label>
          <label class="location" :class="{ toggled : toggleTime == 'arrival'}" @click.prevent="toggleTime = 'arrival'; getTimetable()">Chegar</label>
          <div class="time">
            <label class="prefix">às&nbsp;</label>
            <label class="hours" @click.prevent="incrementHours()">{{ twoDigits(searchHours) }}</label>
            <label class="time-separator">:</label>
            <label class="seconds" @click.prevent="incrementMinutes()">{{ twoDigits(searchMinutes) }}</label>
            <br>
          </div>
        </div>
      </div>
    </div>
    <div class="title" v-if="querying">Paragens</div>
    <div class="stops" v-if="querying">
      <div class="result-group" v-for="stop in stopResults" v-bind:key="stop.onestop_id" @click="chooseStop(stop)">
        <i class="fa icon-type" :class="[getIconType(stop)]"></i>
        <div class="name-group">
          <label class="geo-name">Braga / Guimarães</label>
          <br>
          <label class="stop-name">{{ stop.name }}</label>
        </div>
      </div>
    </div>
    <div class="title" v-if="showingTimeTable">Horários</div>
    <div class="timetable" v-if="showingTimeTable">
      <div class="row" v-for="row in timetable" v-bind:key="row.trip">
        <div class="vehicle-info">
          <label class="logo">TUG</label>
          /
          <label class="route-name">{{ row.route_name }}</label>
        </div>
        <div class="time-header-info">
          <label>Partida</label>
          <label>Chegada</label>
        </div>
        <div class="time-info">
          <label class="departure">{{ formatTime(row.departure_time) }}</label>
          <label class="arrival">{{ formatTime(row.arrival_time) }}</label>
        </div>
      </div>
    </div>
    <div class="timetableEmpty" v-if="timetableEmpty">
      <label>Não há transportes para esta pesquisa :(</label>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ENavbar from '@/components/elements/ENavbar'

export default {
  name: 'Routes',
  components: {
    ENavbar
  },
  data () {
    return {
      tug: 'o-ez65d-tug',
      querying: false,
      currentInput: 'origin',
      filteredStops: [],
      origin: undefined,
      destination: undefined,
      originValue: '',
      destinationValue: '',
      toggleTime: 'departure',
      searchHours: (new Date()).getHours(),
      searchMinutes: Math.ceil((new Date()).getMinutes() / 5) * 5 // round up to next multiple of 5
    }
  },
  created () {
    this.$store.dispatch('getStops', this.tug)
  },
  computed: {
    ...mapState({
      stops: state => state.routes.stops,
      timetable: state => state.routes.timetable,
      queryingTimetable: state => state.routes.queryingTimetable
    }),
    originInput: {
      get: function () {
        return this.originValue
      },
      set: function (value) {
        this.searchStop(value, 'origin')
      }
    },
    destinationInput: {
      get: function () {
        return this.destinationValue
      },
      set: function (value) {
        this.searchStop(value, 'destination')
      }
    },
    stopResults: function () {
      var self = this
      return this.filteredStops.filter(function (stop) {
        if (self.origin && self.currentInput === 'destination') {
          // Don't show originStop in destinationStop search results
          return (self.origin.onestop_id !== stop.onestop_id)
        }
        if (self.destination && self.currentInput === 'origin') {
          // Don't show destinationStop in originStop search results
          return (self.destination.onestop_id !== stop.onestop_id)
        }
        return true
      })
    },
    showingTimeTable: function () {
      if (this.origin && this.destination && !this.querying && this.timetable !== undefined && this.timetable.length > 0 && !this.queryingTimetable) {
        return true
      }
      return false
    },
    timetableEmpty: function () {
      if (this.origin && this.destination && !this.querying && this.timetable !== undefined && this.timetable.length === 0 && !this.queryingTimetable) {
        return true
      }
      return false
    }
  },
  methods: {
    getIconType: function (stop) {
      if (stop) {
        return 'fa-' + stop.vehicle_type
      }
      return undefined
    },
    searchStop: function (search, input) {
      if (search.length === 0) {
        this.filteredStops = this.stops
        return
      }
      this.filteredStops = this.stops.filter(function (stop) {
        return stop.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
      })
      if (input === 'origin') {
        this.originValue = search
      }
      if (input === 'destination') {
        this.destinationValue = search
      }
    },
    chooseStop: function (stop) {
      if (this.currentInput === 'origin') {
        this.origin = stop
        this.originValue = stop.name
      }
      if (this.currentInput === 'destination') {
        this.destination = stop
        this.destinationValue = stop.name
      }
      this.querying = false
      if (this.origin && this.destination) {
        this.getTimetable()
      }
    },
    getTimetable: function () {
      var hours = this.searchHours - 1
      var minutes = this.searchMinutes
      this.$store.dispatch('getTimetable', {
        origin: this.origin,
        destination: this.destination,
        time: this.twoDigits(hours) + ':' + this.twoDigits(minutes) + ':00',
        typeOfTime: this.toggleTime
      })
    },
    formatTime: function (timeString) {
      var datetime = new Date('1970-01-01T' + timeString + 'Z')
      var hours = ('0' + datetime.getHours()).substr(-2)
      var minutes = ('0' + datetime.getMinutes()).substr(-2)
      return hours + ':' + minutes
    },
    twoDigits: function (number) {
      return ('0' + number).substr(-2)
    },
    incrementHours: function () {
      this.searchHours = this.searchHours < 23 ? this.searchHours + 1 : 0
      this.getTimetable()
    },
    incrementMinutes: function () {
      this.searchMinutes = this.searchMinutes < 55 ? this.searchMinutes + 5 : 0
      this.getTimetable()
    }
  },
  watch: {
    stops: function () {
      this.filteredStops = this.stops
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
  overflow-x: hidden;
  .search-group {
    width: 100%;
    background-color: white;
    flex: 0 1 auto;
  }
  .input-group {
    position: relative;
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom: 1px solid $bg-grey;
    .info {
      display: flex;
      align-items: center;
      width: 40px;
      margin-left: 10px;
      label {
        display: flex;
        font-size: 14px;
        color: $text-black;
      }
      &.toggle {
        width: auto;
        .toggle-separator {
          position: relative;
          vertical-align: middle;
          padding: 0 2px;
          height: 14px;
          line-height: 13px;
          color: $text-blue;
          font-size: 10px;
          border-top: 1px solid $bg-blue;
          border-bottom: 1px solid $bg-blue;
        }
        .location {
          position: relative;
          padding: 4px 6px;
          border: 1px solid $bg-blue;
          border-radius: 5px;
          font-size: 12px;
          color: $text-blue;
          cursor: pointer;
          &.toggled {
            background-color: $bg-blue;
            border-color: $bg-blue;
            color: white;
          }
          &:not(.toggled) {
            &:after {
              content: ' ';
              position: absolute;
              top: 3px;
              bottom: 3px;
              width: 1px;
              background-color: white;
            }
            &:first-of-type {
              &:after {
                right: -1px;
              }
            }
            &:not(:first-of-type) {
              &:after {
                left: -1px;
              }
            }
          }
        }
      }
      .time {
        display: flex;
        width: 100%;
        height: 40px;
        margin-left: 5px;
        align-items: center;
        .prefix {
          font-size: 12px;
          padding: 0 10px;
        }
        .hours,
        .seconds {
          position: relative;
          padding: 4px 6px;
          border-radius: 5px;
          font-size: 12px;
          background-color: $bg-blue;
          color: white;
          font-size: 14px;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome and Opera */
          cursor: pointer;
        }
        .time-separator {
          vertical-align: middle;
          height: 15px;
          line-height: 14px;
          background-color: $bg-blue;
          text-align: center;
          padding: 0 1px;
          color: white;
        }
      }
    }
    .icon-type {
      display: flex;
      width: 20px;
      line-height: 40px;
      color: $text-blue;
    }
    input {
      position: absolute;
      width: 100%;
      height: 40px;
      padding-left: 75px;
      background-color: transparent;
      border: none;
      font-size: 12px;
    }
  }
  .title {
    width: 100%;
    background-color: $bg-blue;
    color: white;
    font-size: 14px;
    padding: 3px 10px;
  }
  .stops {
    overflow-y: scroll;
    flex: 1 1 auto;
    background-color: white;
    .result-group {
      display: flex;
      align-items: center;
      padding: 8px 10px;
      border-bottom: 1px solid $bg-grey;
      cursor: pointer;
      .icon-type {
        display: flex;
        width: 30px;
        color: $text-blue;
      }
      .name-group {
        line-height: 12px;
        .geo-name {
          vertical-align: top;
          width: 100%;
          font-size: 8px;
          color: $text-dark-grey;
          cursor: pointer;
        }
        .stop-name {
          vertical-align: top;
          width: 100%;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
  .timetable {
    overflow: scroll;
    flex: 1 1 auto;
    .row {
      padding: 6px 10px;
      border-bottom: 8px solid $bg-grey;
      background-color: white;
      .vehicle-info {
        font-size: 12px;
        color: $text-dark-grey;
      }
      .time-header-info {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding-bottom: 5px;
        color: $text-blue;
        border-bottom: 1px dashed $bg-blue;
      }
      .time-info {

        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        .departure,
        .arrival {
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
  }
  .timetableEmpty {
    flex: 1 1 auto;
    align-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    label {
      width: 100%;
      font-size: 20px;
      color: $text-blue;
      text-shadow: 1px 1px $shadow-grey;
    }
  }
}
</style>
