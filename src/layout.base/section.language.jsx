const debug = require("debug")("tpl-react:BaseLayout.SectionLanguage")

import React, { Fragment } from "react"
import { useParams } from "react-router-dom"
import { Heading } from "@asd14/gruvbox-ui"
import { useI18n } from "@asd14/react-hooks"

const SectionLanguage = () => {
  const { language: languageParameter } = useParams()
  const { languages, language, defaultLanguage } = useI18n()

  debug({
    languages,
    languageParam: languageParameter,
    language,
    defaultLanguage,
  })

  return (
    <Fragment>
      <Heading>Language</Heading>
      URL parameter: {languageParameter}
      <br />
      Current: {language}
      <br />
      Default: {defaultLanguage}
    </Fragment>
  )
}

SectionLanguage.propTypes = {}

SectionLanguage.defaultProps = {}

const memo = React.memo(SectionLanguage)

export { memo as SectionLanguage }
