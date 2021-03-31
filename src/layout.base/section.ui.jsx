const debug = require("debug")("@asd14/tpl-react:BaseLayout.SectionUI")

import React, { Fragment } from "react"
import {
  Button,
  Divider,
  Heading,
  useTheme,
  GUI_COLOR_SCHEME_DARK,
  GUI_COLOR_SCHEME_LIGHT,
} from "@asd14/gruvbox-ui"

const SectionUI = () => {
  const [{ colorScheme }, { setColorScheme }] = useTheme()

  return (
    <Fragment>
      <Heading>UI</Heading>
      Packages:{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/asd-xiv/gruvbox-ui">
        @asd14/gruvbox-ui
      </a>
      <Divider />
      Change color scheme:{" "}
      <Button
        label="light"
        isDisabled={colorScheme === GUI_COLOR_SCHEME_LIGHT}
        onClick={() => setColorScheme(GUI_COLOR_SCHEME_LIGHT)}
      />
      <Button
        label="dark"
        isDisabled={colorScheme === GUI_COLOR_SCHEME_DARK}
        onClick={() => setColorScheme(GUI_COLOR_SCHEME_DARK)}
      />
    </Fragment>
  )
}

SectionUI.propTypes = {}

SectionUI.defaultProps = {}

const memo = React.memo(SectionUI)

export { memo as SectionUI }
