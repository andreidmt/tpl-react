const debug = require("debug")("@asd14/tpl-react:ErrorBoundaryUI")

import React from "react"
import PropTypes from "prop-types"
import { is } from "@asd14/m"

import css from "./error-boundary.module.css"

class ErrorBoundaryUI extends React.Component {
  constructor(properties) {
    super(properties)

    this.state = {
      error: undefined,
      errorInfo: undefined,
      // eventId: undefined,
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Sentry.withScope(scope => {
    //   scope.setExtras(errorInfo)
    //   const eventId = Sentry.captureException(error)

    //   this.setState({ eventId })
    // })
  }

  render() {
    const { children, message } = this.props
    const { error, errorInfo } = this.state

    return is(errorInfo) ? (
      <div className={css.error}>
        <h3>{message}</h3>

        <p>Error report has been sent. We&apos;re on it!</p>

        {
          // <UIButton
          //   size="small"
          //   label="Report feedback"
          //   onClick={() => Sentry.showReportDialog({ eventId })}
          // />
        }

        <details style={{ display: "none", whiteSpace: "pre-wrap" }}>
          {is(error) ? error.toString() : message}
          <br />
          {errorInfo.componentStack}
        </details>
      </div>
    ) : (
      children
    )
  }
}

ErrorBoundaryUI.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ErrorBoundaryUI.defaultProps = {
  message: "Upsilon",
}

export { ErrorBoundaryUI }
