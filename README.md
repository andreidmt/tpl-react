<!-- markdownlint-disable line-length -->

# react-starter

<!-- vim-markdown-toc GFM -->

* [Stack](#stack)
* [Environment variables](#environment-variables)
* [Custom hooks](#custom-hooks)
  * [useAuth](#useauth)
  * [useSocket](#usesocket)
  * [useList](#uselist)
  * [useQuery](#usequery)
* [Recommendations](#recommendations)
* [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Stack

* Main: [React](https://github.com/facebook/react)
* Bundler: [Parcel](https://github.com/parcel-bundler/parcel)
* CSS: [PostCSS](https://github.com/postcss/postcss)
* State management: [Redux](https://github.com/reduxjs/redux) with [@mutant-ws/redux-list](https://github.com/mutant-ws/redux-list)
* Real time: [socket.io-client](https://github.com/socketio/socket.io-client)
* Testing: [riteway](https://github.com/ericelliott/riteway)
* Linting: [ESLint](https://github.com/eslint/eslint) with [@mutant-ws/eslint-config](https://github.com/mutant-ws/eslint-config), [Stylelint](https://github.com/stylelint/stylelint)
* Functional: [ramda](https://github.com/ramda/ramda)
* Code formatting: ESLint rules + [prettier](https://github.com/prettier/prettier)
* Query string parsing: [qs](https://github.com/ljharb/qs)
* DateTime handling: [luxon](https://github.com/moment/luxon)

## Environment variables

* `API_URL` - used by [`core/http.lib.js`](src/core/http.lib.js) to prefix request path
* `SOCKET_URL` - used by [`useList`](src/core/use-list.js) hook for the socket.io connection

## Custom hooks

### useAuth

### useSocket

### useList

### useQuery

## Recommendations

* Use [Hierarchical Model-View-Controller](https://en.wikipedia.org/wiki/Hierarchical_model%E2%80%93view%E2%80%93controller)
* Use consistent [naming](https://www.martinfowler.com/bliki/TwoHardThings.html)
* Better repeat yourself than a wrong abstraction
* Share as little state as possible between sections/pages
* Each section has it's own data source, don't reuse
* Refactor a lot, but not when the building is on fire
* Don't fix imaginary future problem, you're not there yet
* Extract code in libraries and test it 100% (no use in testing just the if branch)

## Changelog

See the [releases section](https://github.com/mutant-ws/react-starter/releases) for details.
