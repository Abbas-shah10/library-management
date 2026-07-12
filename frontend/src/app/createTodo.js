import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";


const createTodo = (set) => ({
  todos: [],
  addTodo: (todo) => {
    set((state) => ({
      todos: [...state.todos, todo]
    }))
  },
  removeTodo: (todoId) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId)
    }))
  }
})

const useTodosStore = create(
  devtools(
    persist(createTodo, {
      name: "todos"
    })
  )
)

export default useTodosStore;
