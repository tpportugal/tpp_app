import {
  LOCATION_GET_ALL_REQUEST,
  LOCATION_GET_ALL_FAILURE,
  LOCATION_GET_ALL_SUCCESS,
  LOCATION_CLEAR_ALL
} from "../../constants/locations"

const defaultState = {
  loading: false,
  error: null,
  count: 0,
  data: [],
}

export default function locations(state = defaultState, action) {
  switch (action.type) {
    case LOCATION_GET_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case LOCATION_GET_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case LOCATION_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        count: action.count,
        data: action.data,
      }
    case LOCATION_CLEAR_ALL:
      return defaultState
    default:
      return state
  }
}
