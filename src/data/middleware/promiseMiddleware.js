/*
* Redux middleware to handle promises
*/

export default function promiseMiddleware(getState) {
  return next => action => {
    if (typeof action === "function") {
      return action(next, getState)
    }

    const { promise, type, ...rest } = action

    if (!promise) return next(action)

    const SUCCESS = `${type}_SUCCESS`
    const REQUEST = `${type}_REQUEST`
    const FAILURE = `${type}_FAILURE`
    next({ ...rest, type: REQUEST })
    return promise
      .then(req => req.data)
      .then(req => {
        next({ ...rest, req, type: SUCCESS })
        return true
      })
      .catch(error => {
        console.log(error)
        next({ ...rest, error, type: FAILURE })
        return false
      })
  }
}
