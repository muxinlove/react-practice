import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/index.js'

let AddTodo = ({ dispatch }) => {
  let input;

  function submit(e) {
    e.preventDefault();
    if (!input.value.trim()) {
      alert('信息必填');
      return;
    }
    dispatch(addTodo(input.value.trim()));
    input.value = '';
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input type="text" ref={node => input = node} />
        <button type="submit">ADD</button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo;
