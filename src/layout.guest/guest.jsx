const debug = require("debug")("@asd14/tpl-react:GuestLayout")

import React from "react"
import PropTypes from "prop-types"

import { BaseLayout } from "layout.base/base"

import css from "./guest.module.css"

const GuestLayout = ({ children }) => {
  return (
    <BaseLayout>
      <div className={css["guest-layout"]}>{children}</div>
    </BaseLayout>
  )
}

GuestLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { GuestLayout }
