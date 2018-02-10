import request from "axios"
import qs from "qs"

export default function fetch(options, me) {
  Object.assign(options, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" }),
  })

  return request(options)
}
