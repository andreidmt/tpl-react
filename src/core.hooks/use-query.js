const debug = require("debug")("ReactStarter:useQuery")

import { useMemo, useHistory, useLocation } from "react-router-dom"
import { stringify, parse } from "qs"

import { useCallback } from "/core.hooks/use-deep"

/**
 * Get/Set query params via `qs` lib
 *
 * @returns {Object}
 */
export const useQuery = () => {
  const { search } = useLocation()
  const history = useHistory()

  const queryParams = useMemo(
    () => parse(search.replace("?", ""), { allowDots: true }),
    [search]
  )

  const setQueryParams = useCallback(
    source => {
      history.push({
        search: stringify({ ...queryParams, ...source }, { allowDots: true }),
      })
    },
    [history, queryParams]
  )

  return [queryParams, setQueryParams]
}
