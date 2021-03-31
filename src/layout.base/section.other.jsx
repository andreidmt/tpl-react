const debug = require("debug")("@asd14/tpl-react:BaseLayout.SectionOther")

import React, { Fragment } from "react"

const SectionOther = () => {
  return (
    <Fragment>
      <ul>
        <li>
          Main:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/facebook/react">
            React
          </a>
        </li>
        <li>
          Bundler:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/webpack/webpack">
            Webpack
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/babel/babel">
            Babel
          </a>
        </li>
        <li>
          CSS:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/postcss/postcss">
            PostCSS
          </a>{" "}
          with CSS modules
        </li>
        <li>
          State management:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/reduxjs/redux">
            Redux
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/asd-xiv/state-list">
            @asd14/state-list
          </a>
        </li>
        <li>
          Real time:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/socketio/socket.io-client">
            socket.io-client
          </a>
        </li>
        <li>
          Testing:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/ericelliott/riteway">
            riteway
          </a>
        </li>
        <li>
          Linting:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/eslint/eslint">
            ESLint
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/stylelint/stylelint">
            Stylelint
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/asd-xiv/eslint-config">
            @asd14/eslint-config
          </a>
        </li>
        <li>
          Functional:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/asd-xiv/m">
            @asd14/m
          </a>
        </li>
        <li>
          Code formatting: ESLint rules +{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/prettier/prettier">
            prettier
          </a>
        </li>
        <li>
          Query string parsing:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/ljharb/qs">
            qs
          </a>
        </li>
        <li>
          DateTime handling:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/moment/luxon">
            luxon
          </a>
        </li>

        <li>
          React libraries:
          <ul>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/nfl/react-helmet">
                react-helmet
              </a>
              : A document head manager for React
            </li>
          </ul>
        </li>
      </ul>
    </Fragment>
  )
}

SectionOther.propTypes = {}

SectionOther.defaultProps = {}

const memo = React.memo(SectionOther)

export { memo as SectionOther }
