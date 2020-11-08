const debug = require("debug")("asd14:usePortal")

import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { is } from "@asd14/m"

/**
 * Hook to create a React Portal.
 * Inspiration from https://www.jayfreestone.com/writing/react-portals-with-hooks
 *
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 *
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 *
 * @param {String} id The id of the target container, e.g 'modal' or 'spotlight'
 *
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
const usePortal = id => {
  const rootElemRef = useRef(null)

  if (!is(rootElemRef.current)) {
    const rootElem =
      document.querySelector(`#${id}`) || document.createElement("div")

    rootElem.setAttribute("id", id)
    rootElemRef.current = rootElem

    document.body.appendChild(rootElem)
  }

  useEffect(() => {
    rootElemRef.current.setAttribute("id", id)

    return () => rootElemRef.current.remove()
  }, [id])

  return rootElemRef.current
}

/**
 * Portal wrapper component
 *
 * @example
 * <Portal id="image-overlay">
 *   This is rendered in a direct child of document.body
 * </Portal>
 *
 * @returns {React.Component}
 */
export const Portal = ({ id, children }) => {
  const target = usePortal(id)

  return createPortal(children, target)
}
