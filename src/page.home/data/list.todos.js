const debug = require("debug")("ReactStarter:Home.TodosList")

import { buildList } from "just-a-list.redux"
import { GET, PATCH, POST, DELETE } from "@mutant-ws/fetch-browser"
import { sort } from "m.xyz"

export const TodosList = buildList({
  name: "HOME.TODOS",

  create: data => POST("/todos", { body: data }),

  read: () => GET("/todos"),

  readOne: id => GET(`/todo/${id}`),

  update: (id, data) => PATCH(`/todos/${id}`, { body: data }),

  remove: id => DELETE(`/todos/${id}`),

  onChange: sort((a, b) => (a.isChecked ? -1 : b.isChecked ? -1 : 0)),
})
