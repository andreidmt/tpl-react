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
 * @param {string} id The id of the target container, e.g 'modal' or 'spotlight'
 *
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
const usePortal = id => {
  const rootElementReference = useRef(null)

  if (!is(rootElementReference.current)) {
    const rootElement =
      document.querySelector(`#${id}`) || document.createElement("div")

    rootElement.setAttribute("id", id)
    rootElementReference.current = rootElement

    document.body.append(rootElement)
  }

  useEffect(() => {
    rootElementReference.current.setAttribute("id", id)

    return () => rootElementReference.current.remove()
  }, [id])

  return rootElementReference.current
}

/**
 * Portal wrapper component
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {any}    props.children
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
