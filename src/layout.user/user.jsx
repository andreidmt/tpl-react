const debug = require("debug")("ReactStarter:UserLayout")

import React from "react"
import PropTypes from "prop-types"

import { useAuth } from "core.hooks/use-auth/auth.hook"
import { BaseLayout } from "layout.base/base"

import css from "./user.css"

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
