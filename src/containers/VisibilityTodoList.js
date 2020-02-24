import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import {
  toggleTodo
} from '../actions/index.js'

function getVisibilityTodos(todos, filter) {
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'active':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibilityTodos(state.todos, state.visibilityFliter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => dispatch(toggleTodo(id))
  }
}

const VisibilityTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibilityTodoList;