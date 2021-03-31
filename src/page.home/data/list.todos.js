const debug = require("debug")("@asd14/react-tpl:HomePage.TodosList")

import { buildList } from "@asd14/state-list"
import { push, findWith, updateWith, removeWith } from "@asd14/m"
import cuid from "cuid"

let items = [
  { id: "1", value: "React", isChecked: true },
  { id: "2", value: "Redux", isChecked: true },
  { id: "3", value: "Next.js", isChecked: true },
  { id: "4", value: "GraphQL", isChecked: false },
]

export const TodosList = buildList({
  name: "HOME.TODOS",

  create: data => {
    const newItem = { id: cuid(), ...data }

    items = push(newItem)(items)

    return newItem
  },

  read: () => items,

  readOne: id => findWith({ id }, { id }, items),

  update: (id, data) => {
    items = updateWith({ id }, data, items)

    return findWith({ id }, { id }, items)
  },

  remove: id => {
    items = removeWith({ id }, items)

    return { id }
  },
})

/*
 * Interfacing a REST API
 *
 * @example
 * buildList({
 *   name: "HOME.TODOS",
 *
 *   create: data => POST("/todos", { body: data }),
 *   read: () => GET("/todos"),
 *   readOne: id => GET(`/todo/${id}`),
 *   update: (id, data) => PATCH(`/todos/${id}`, { body: data }),
 *   remove: id => DELETE(`/todos/${id}`),
 * })
 */
