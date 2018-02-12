import { all, put, fork, call, take } from "redux-saga/effects"

import {
  LOCATION_GET_ALL,
  LOCATION_GET_ALL_REQUEST,
  LOCATION_GET_ALL_SUCCESS,
  LOCATION_GET_ALL_FAILURE,
  LOCATION_GET_ALL_CANCEL,
} from "../../constants/locations"

import { getAll } from "../../fetch/locations"

function* getList() {
  while (true) {
    const action = yield take([LOCATION_GET_ALL])
    yield put({ type: LOCATION_GET_ALL_REQUEST })
    try {
      const { data } = yield call(() => getAll(action.params))
      if (data) yield put({ type: LOCATION_GET_ALL_SUCCESS, data: data.data })
    } catch (error) {
      yield put({ type: LOCATION_GET_ALL_FAILURE, error: error.message })
    }
  }
}

export default function* main() {
  while (true) {
    const tasks = yield all([
      fork(getList),
    ])

    yield all(tasks)

    yield take([LOCATION_GET_ALL_CANCEL])
    yield tasks.map(task => task.cancel())
  }
}
