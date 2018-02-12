import { combineReducers } from "redux"
import { reducer as form } from "redux-form"
import { reducer as notifications } from "react-notification-system-redux"
import { i18nState } from "redux-i18n"

import locations from "./locations"

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  form,
  i18nState,
  notifications,
  locations,
})

export default rootReducer
