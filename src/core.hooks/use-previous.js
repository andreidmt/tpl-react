const debug = require("debug")("asd14:usePrevious")

import { useRef } from "react"

import { useEffect } from "./use-deep"

export const usePrevious = value => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const reference = useRef()

  // Store current value in ref
  useEffect(() => {
    reference.current = value

    // Only re-run if value changes
  }, [value])

  // Return previous value (happens before update in useEffect above)
  return reference.current
}
