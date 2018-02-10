import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router"
import { Provider } from "react-redux"
import FastClick from "fastclick"
import I18n from "redux-i18n"

import history from "./core/history"
import registerServiceWorker from "./registerServiceWorker"
import configureStore from "./data/configureStore"

import App from "./views/App"

import "./shared/styles/base.css"

// Make taps on links and buttons work fast on mobiles
FastClick.attach(document.body)

// Init redux store
const store = configureStore({})

// Render app
ReactDOM.render((
  <Provider store={store}>
    <I18n translations={{}} initialLang="pt" fallbackLang="en" useReducer>
      <Router history={history}>
        <App />
      </Router>
    </I18n>
  </Provider>
), document.getElementById("root"))

// Service worker
registerServiceWorker()
