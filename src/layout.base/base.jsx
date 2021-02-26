const debug = require("debug")("asd14:BaseLayout")

import React from "react"
import PropTypes from "prop-types"

import css from "./base.module.css"

const BaseLayout = ({ children }) => {
  return (
    <div className={css["base-layout"]}>
      <div className={css.leftside}>
        <ul>
          <li>
            Main: <a href="https://github.com/facebook/react">React</a>
          </li>
          <li>
            Bundler: <a href="https://github.com/webpack/webpack">Webpack v5</a>
          </li>
          <li>
            CSS: <a href="https://github.com/postcss/postcss">PostCSS</a>
          </li>
          <li>
            State management:{" "}
            <a href="https://github.com/reduxjs/redux">Redux</a>,{" "}
            <a href="https://github.com/asd-xiv/state-list">
              @asd14/state-list
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
            <a href="https://github.com/asd-xiv/eslint-config">
              @asd14/eslint-config
            </a>
          </li>
          <li>
            Functional: <a href="https://github.com/asd-xiv/m">@asd14/m</a>
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
