const debug = require("debug")("ReactStarter:UIInput")

import React, { forwardRef } from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import cuid from "cuid"
import { isEmpty, is } from "m.xyz"

import css from "./input.css"

const UIInput = forwardRef(
  (
    {
      className,
      placeholder,
      value,
      label,
      type,
      size,
      name,
      shadow,
      tabIndex,
      error,
      isDisabled,
      isChecked,
      isLoading,
      hasAutoFocus,
      hasAutocomplete,
      hasErrorMessage,
      onChange,
      onSubmit,
      onFocus,
      onBlur,
      onKeyDown,
    },
    ref
  ) => {
    const handleKeyDown = event => {
      if (event.key === "Tab") {
        event.preventDefault()

        if (onBlur) {
          onBlur(event)
        }
      }

      if (is(onSubmit) && event.key === "Enter") {
        onSubmit(event)
      }

      if (is(onKeyDown)) {
        onKeyDown(event)
      }
    }

    const hasError = !isEmpty(error)

    return (
      <span
        className={cx(css.input, css[`input--type-${type}`], {
          [className]: !isEmpty(className),
          [css["input--is-disabled"]]: isDisabled || isLoading,
          [css["input--has-error"]]: hasError,
          [css[`input--size-${size}`]]: is(size),
        })}>
        {/* eslint-disable react/forbid-dom-props */}
        {(type === "text" || type === "password") && (
          <React.Fragment>
            {isEmpty(label) ? null : <label htmlFor={name}>{label}</label>}
            {!isEmpty(shadow) && type === "text" ? (
              <span className={css.shadow}>{shadow}</span>
            ) : null}
            <input
              ref={ref}
              id={is(name) ? name : cuid()}
              placeholder={placeholder}
              type={type}
              name={name}
              value={value}
              tabIndex={tabIndex}
              disabled={isDisabled || isLoading}
              autoComplete={hasAutocomplete ? "on" : "off"}
              autoFocus={hasAutoFocus}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </React.Fragment>
        )}
        {type === "checkbox" && (
          <label>
            <input
              type={type}
              name={name}
              value={value}
              disabled={isDisabled || isLoading}
              checked={isChecked}
              onChange={onChange}
            />
            {label}
          </label>
        )}

        {hasError && hasErrorMessage && (
          <div className={css.error}>{error}</div>
        )}
      </span>
    )
  }
)

UIInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(["medium"]),
  name: PropTypes.string,
  shadow: PropTypes.string,
  tabIndex: PropTypes.number,
  error: PropTypes.string,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasAutoFocus: PropTypes.bool,
  hasAutocomplete: PropTypes.bool,
  hasErrorMessage: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
}

UIInput.defaultProps = {
  className: null,
  placeholder: null,
  label: null,
  type: "text",
  size: null,
  name: "",
  shadow: "",
  tabIndex: undefined,
  error: null,
  isDisabled: false,
  isChecked: false,
  isLoading: false,
  hasAutoFocus: false,
  hasAutocomplete: true,
  hasErrorMessage: true,
  onSubmit: null,
  onFocus: null,
  onBlur: null,
  onKeyDown: null,
}

const memo = React.memo(UIInput)

export { memo as UIInput }
