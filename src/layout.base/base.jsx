const debug = require("debug")("ReactStarter:BaseLayout")

import React from "react"
import PropTypes from "prop-types"

import css from "./base.css"

const BaseLayout = ({ children }) => {
  return (
    <div className={css["base-layout"]}>
      <div className={css.leftside}>Common for both User and Guest layouts</div>
      <div>{children}</div>
    </div>
  )
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { BaseLayout }
