const debug = require("debug")("ReactStarter:usePrev")

import { useRef } from "react"

import { useEffect } from "./use-deep"

export const usePrev = value => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value

    // Only re-run if value changes
  }, [value])

  // Return previous value (happens before update in useEffect above)
  return ref.current
}
