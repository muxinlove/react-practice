import React from 'react';
import AddTodo from '../containers/AddTodo.js'
import VisibilityTodoList from '../containers/VisibilityTodoList.js'
import Footer from './Footer.js'

function App({ params }) {
  return (
    <div>
      <AddTodo />
      <VisibilityTodoList />
      <Footer />
    </div>
  );
}

export default App;
