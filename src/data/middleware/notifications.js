import { show } from "react-notification-system-redux"
import { getTranslateFunction } from "redux-i18n"

import {
  LOCATION_GET_ALL_FAILURE,
} from "../constants/locations"

export default function notificationMiddleware({ dispatch, getState }) {
  return next => action => {
    let options
    let level
    const { i18nState } = getState()
    const translate = getTranslateFunction(i18nState.translations, i18nState.lang, "pt")
    next(action)

    switch (action.type) {
      // FAILURES
      case LOCATION_GET_ALL_FAILURE:
        options = {
          title: translate("Ups!"),
          message: translate("Looks like something went wrong on our side. Please, try again."),
          position: "tr",
        }
        level = "error"
        break
      default:
        options = null
    }

    if (options) {
      dispatch(show(options, level))
    }
  }
}
