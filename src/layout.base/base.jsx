const debug = require("debug")("asd14:BaseLayout")

import React from "react"
import PropTypes from "prop-types"

import css from "./base.css"

const BaseLayout = ({ children }) => {
  return (
    <div className={css["base-layout"]}>
      <div className={css.leftside}>
        <ul>
          <li>
            Main: <a href="https://github.com/facebook/react">React</a>
          </li>
          <li>
            Bundler:{" "}
            <a href="https://github.com/parcel-bundler/parcel">Parcel v2</a>
          </li>
          <li>
            CSS: <a href="https://github.com/postcss/postcss">PostCSS</a>
          </li>
          <li>
            State management:{" "}
            <a href="https://github.com/reduxjs/redux">Redux</a>,{" "}
            <a href="https://github.com/andreidmt/just-a-list.redux">
              just-a-list.redux
            </a>
          </li>
          <li>
            Real time:{" "}
            <a href="https://github.com/socketio/socket.io-client">
              socket.io-client
            </a>
          </li>
          <li>
            Testing:{" "}
            <a href="https://github.com/ericelliott/riteway">riteway</a>
          </li>
          <li>
            Linting: <a href="https://github.com/eslint/eslint">ESLint</a>,{" "}
            <a href="https://github.com/stylelint/stylelint">Stylelint</a>,{" "}
            <a href="https://github.com/andreidmt/eslint-config-xyz">
              eslint-config-xyz
            </a>
          </li>
          <li>
            Functional: <a href="https://github.com/ramda/ramda">ramda</a>
          </li>
          <li>
            Code formatting: ESLint rules +{" "}
            <a href="https://github.com/prettier/prettier">prettier</a>
          </li>
          <li>
            Query string parsing: <a href="https://github.com/ljharb/qs">qs</a>
          </li>
          <li>
            DateTime handling:{" "}
            <a href="https://github.com/moment/luxon">luxon</a>
          </li>
        </ul>
      </div>
      <div>{children}</div>
    </div>
  )
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export { BaseLayout }
