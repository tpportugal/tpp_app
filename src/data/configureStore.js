import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "./reducers"
import sagas from "./sagas"
import promiseMiddleware from "./middleware/promiseMiddleware"
import notificationMiddleware from "./middleware/notifications"

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 */
export default function configureStore(initialState) {
  // Installs hooks that always keep react-router and redux
  // store in sync
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [
    thunk,
    promiseMiddleware,
    sagaMiddleware,
    notificationMiddleware,
  ]

  if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger({
      collapsed: true,
    }))
  }

  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

  sagaMiddleware.run(sagas)

  return store
}
