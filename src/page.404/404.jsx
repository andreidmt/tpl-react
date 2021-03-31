const debug = require("debug")("@asd14/tpl-react:NotFoundPage")

import React, { Fragment } from "react"
import { Helmet } from "react-helmet"
import { Heading } from "@asd14/gruvbox-ui"

export const NotFoundPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>404</title>
      </Helmet>

      <Heading>Page not found</Heading>
    </Fragment>
  )
}
