const debug = require("debug")("asd14:useQuery")

import { useHistory, useLocation } from "react-router-dom"
import { stringify, parse } from "qs"

import { useMemo, useCallback } from "./use-deep"

/**
 * Get/Set query params via `qs` lib
 *
 * @returns {Object}
 */
export const useQuery = () => {
  const { search } = useLocation()
  const history = useHistory()

  const queryParameters = useMemo(() => parse(search.replace("?", "")), [
    search,
  ])

  const setQueryParameters = useCallback(
    source => {
      history.push({
        search: stringify({ ...queryParameters, ...source }),
      })
    },
    [history, queryParameters]
  )

  return [queryParameters, setQueryParameters]
}
