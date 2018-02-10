import { fork } from "redux-saga/effects"

import locations from "./locations"

export default function* main() {
  yield fork(locations)
}
