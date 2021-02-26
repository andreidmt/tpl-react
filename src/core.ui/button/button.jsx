const debug = require("debug")("asd14:UIButton")

import * as React from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import { is } from "@asd14/m"

import css from "./button.css"

const UIButton = ({
  className,
  label,
  icon,
  type,
  size,
  isDisabled,
  onClick,
}) => (
  <span
    className={cx(
      className,
      css.button,
      css[`button--type-${type}`],
      css[`button--size-${size}`],
      {
        [css["button--is-disabled"]]: isDisabled,
      }
    )}
    onMouseDown={isDisabled ? undefined : onClick}>
    {is(icon) && <span className={css["button-icon"]}>{icon}</span>}
    {is(label) && <span className={css["button-label"]}>{label}</span>}
  </span>
)

UIButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  type: PropTypes.oneOf(["default", "primary", "secondary", "bad"]),
  size: PropTypes.oneOf(["default", "small", "tiny", "medium"]),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
}

UIButton.defaultProps = {
  className: "",
  icon: undefined,
  type: "default",
  size: "default",
  isDisabled: false,
  onClick: undefined,
}

const memo = React.memo(UIButton)

export { memo as UIButton }
