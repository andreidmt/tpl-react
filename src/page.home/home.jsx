const debug = require("debug")("@asd14/tpl-react:HomePage")

import React from "react"
import { Helmet } from "react-helmet"
import { Heading } from "@asd14/gruvbox-ui"

// const tranlations = require("./home.i18n.json")

export const HomePage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Heading type="h1">page.home.hello</Heading>
    </React.Fragment>
  )
}
