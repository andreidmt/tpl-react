const debug = require("debug")("asd14:Home.TodosList")

import { buildList } from "@asd14/state-list"
import { GET, PATCH, POST, DELETE } from "@asd14/fetch-browser"
import { sort } from "@asd14/m"

export const TodosList = buildList({
  name: "HOME.TODOS",

  create: data => POST("/todos", { body: data }),

  read: () => GET("/todos"),

  readOne: id => GET(`/todo/${id}`),

  update: (id, data) => PATCH(`/todos/${id}`, { body: data }),

  remove: id => DELETE(`/todos/${id}`),

  onChange: sort((a, b) => (a.isChecked ? -1 : b.isChecked ? -1 : 0)),
})
