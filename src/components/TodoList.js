import React from 'react'
import { PropTypes } from 'prop-types'
import Todo from './Todo.js'

export default function TodoList({ todos, onTodoClick }) {
  return (
    <ul>
      {
        todos.map((todo, index) => (
          <Todo key={index} onClick={() => onTodoClick(todo.id)} {...todo}></Todo>
        ))
      }
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
}
