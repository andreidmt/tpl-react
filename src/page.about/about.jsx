const debug = require("debug")("@asd14/tpl-react:AboutPage")

import React from "react"
import { Helmet } from "react-helmet"
import { Heading } from "@asd14/gruvbox-ui"

export const AboutPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>About</title>
      </Helmet>

      <Heading type="h1">About</Heading>
    </React.Fragment>
  )
}
