import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: {
      stops: undefined,
      timetable: undefined,
      queryingTimetable: false
    }
  },
  mutations: {
    setStops: (state, list) => {
      state.routes.stops = list
    },
    queryingTimetable: (state, bool) => {
      state.routes.timetable = []
      state.routes.queryingTimetable = bool
    },
    setTimetable: (state, list) => {
      state.routes.timetable = list
      state.routes.queryingTimetable = false
    }
  },
  actions: {
    getStops (context, operatorOneStopId) {
      axios.get('https://api.tpp.pt/v1/stops', {
        params: {
          served_by: operatorOneStopId
        }
      })
        .then(response => {
          var stops = response.data.stops.map(function (stop) {
            return {
              'onestop_id': stop.onestop_id,
              'name': stop.name,
              'vehicle_type': stop.served_by_vehicle_types[0],
              'geometry': stop.geometry
            }
          })
          context.commit('setStops', stops)
        })
    },
    getTimetable (context, payload) {
      context.commit('queryingTimetable', true)
      var origin = payload.origin
      var destination = payload.destination
      var time = payload.time
      var typeOfTime = payload.typeOfTime
      var timeForOrigin = null
      if (typeOfTime === 'departure') {
        timeForOrigin = time
      }
      axios.get('https://api.tpp.pt/v1/route_stop_patterns', {
        // Get a route stop pattern for origin and destination stop
        params: {
          stops_visited: [origin.onestop_id, destination.onestop_id].join(',')
        }
      })
        .then(responseA => {
          if (responseA.data.route_stop_patterns.length === 0) {
            context.commit('queryingTimetable', false)
            return
          }
          axios.get('https://api.tpp.pt/v1/routes', {
            // Get route information
            params: {
              traverses: responseA.data.route_stop_patterns[0].onestop_id
            }
          })
            .then(responseB => {
              axios.get('https://api.tpp.pt/v1/schedule_stop_pairs', {
                // Get all departures from origin
                params: {
                  origin_onestop_id: origin.onestop_id,
                  route_stop_pattern_onestop_id: responseA.data.route_stop_patterns[0].onestop_id,
                  date: 'today',
                  time: 'now'
                }
              })
                .then(responseC => {
                  axios.get('https://api.tpp.pt/v1/schedule_stop_pairs', {
                    // get all arrivals from destination
                    params: {
                      destination_onestop_id: destination.onestop_id,
                      route_stop_pattern_onestop_id: responseA.data.route_stop_patterns[0].onestop_id,
                      origin_departure_between: timeForOrigin,
                      date: 'today',
                      time: 'now'
                    }
                  })
                    .then(responseD => {
                      // Merge responseB with responseC with same trip
                      var tripsOrigin = {}
                      var tripsDestination = {}
                      var timetable = []
                      for (let i = 0; i < responseC.data.schedule_stop_pairs.length; i++) {
                        let schedule = responseC.data.schedule_stop_pairs[i]
                        tripsOrigin[schedule.trip] = schedule
                      }
                      for (let i = 0; i < responseD.data.schedule_stop_pairs.length; i++) {
                        let schedule = responseD.data.schedule_stop_pairs[i]
                        tripsDestination[schedule.trip] = schedule
                      }
                      for (var trip in tripsOrigin) {
                        if (trip in tripsDestination) {
                          var departureTime = tripsOrigin[trip].origin_departure_time
                          var arrivalTime = tripsDestination[trip].destination_arrival_time
                          if (typeOfTime === 'arrival') {
                            var getTimestamp = function (timeString) {
                              var datetime = new Date('1970-01-01T' + timeString + 'Z')
                              return datetime.getTime()
                            }
                            if (getTimestamp(time) < getTimestamp(arrivalTime)) {
                              // If arrival too late, then skip
                              continue
                            }
                          }
                          timetable.push({
                            departure_time: departureTime,
                            arrival_time: arrivalTime,
                            route_name: responseB.data.routes[0].name
                          })
                        }
                      }
                      context.commit('setTimetable', timetable)
                    })
                })
            })
        })
    }
  }
})
