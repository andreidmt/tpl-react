<!-- markdownlint-disable line-length -->

# tpl-react

<!-- vim-markdown-toc GFM -->

* [Stack](#stack)
* [Environment variables](#environment-variables)
* [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Stack

* Main: [React](https://github.com/facebook/react)
* Bundler: [Webpack](https://github.com/webpack/webpack)
* CSS: [PostCSS](https://github.com/postcss/postcss)
* State management: [Redux](https://github.com/reduxjs/redux), [@asd14/state-list](https://github.com/asd-xiv/state-list)
* Real time: [socket.io-client](https://github.com/socketio/socket.io-client)
* Testing: [riteway](https://github.com/ericelliott/riteway)
* Linting: [ESLint](https://github.com/eslint/eslint), [Stylelint](https://github.com/stylelint/stylelint), [@asd14/eslint-config](https://github.com/asd-xiv/eslint-config)
* Functional: [@asd14/m](https://github.com/asd-xiv/m)
* Code formatting: ESLint rules + [prettier](https://github.com/prettier/prettier)
* Query string parsing: [qs](https://github.com/ljharb/qs)
* DateTime handling: [luxon](https://github.com/moment/luxon)

## Environment variables

* `API_URL` - prefix request path in [`core/http.lib.js`](src/core/http.lib.js)
* `SOCKET_URL` - socket.io connection string in [`useList`](src/core/use-list.js) hook

## Changelog

See the [releases section](https://github.com/andreidmt/tpl-react/releases) for details.
