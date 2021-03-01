const debug = require("debug")("asd14:UserLayout")

import React from "react"
import PropTypes from "prop-types"
import { useAuth } from "@asd14/react-hooks"

import { BaseLayout } from "layout.base/base"

import css from "./user.module.css"

const UserLayout = ({ children }) => {
  const { name } = useAuth()

  return (
    <BaseLayout>
      <div className={css["user-layout"]}>
        <h1>{`Hello ${name} Mutant World!`}</h1>
        <div>{children}</div>
      </div>
    </BaseLayout>
  )
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserLayout }
