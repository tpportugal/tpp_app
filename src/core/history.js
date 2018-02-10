import { createBrowserHistory } from "history"
import qhistory from "qhistory"
import { stringify, parse } from "qs"

const stringifyQuery = query => stringify(query, { arrayFormat: "brackets", encode: false })
const history = qhistory(
  createBrowserHistory({ /* history configuration options */ }),
  stringifyQuery,
  parse
)

export default history
