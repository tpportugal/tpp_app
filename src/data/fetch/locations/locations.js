/* eslint-disable import/prefer-default-export */
import { CancelToken } from "axios"
import { CANCEL } from "redux-saga"
import fetch from "../fetch"
import { hosts } from "../../../config"

export function getAll(params) {
  const limit = `limit: ${params.limit || 20},`
  const page = `page: ${params.page || 1},`
  const search = params.search ? `search: "${params.search}",` : ""

  const query = `
    {
      locations (${page} ${limit} ${search}) {
        count,
        rows {
          id,
          name,
        }
      }
    }`

  const source = CancelToken.source()
  const options = {
    cancelToken: source.token,
    url: `${hosts.api}/graphql`,
    method: "post",
    data: { query },
  }
  const promise = fetch(options)
  promise[CANCEL] = () => source.cancel()
  return promise
}

export default {
  getAll,
}
