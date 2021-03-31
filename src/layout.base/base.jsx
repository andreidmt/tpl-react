const debug = require("debug")("@asd14/tpl-react:BaseLayout")

import React from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import { Divider, useTheme } from "@asd14/gruvbox-ui"

import { SectionLanguage } from "./section.language"
import { SectionOther } from "./section.other"
import { SectionUI } from "./section.ui"

import css from "./base.module.css"

const BaseLayout = ({ className, children }) => {
  const [{ colorScheme, size }] = useTheme()

  return (
    <div className={cx(css["base-layout"], className, colorScheme, size)}>
      <div className={css.leftside}>
        <SectionLanguage />
        <Divider />
        <SectionUI />
        <Divider isFancy={true} />
        <SectionOther />
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}

BaseLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

BaseLayout.defaultProps = {
  className: undefined,
}

export { BaseLayout }
