import React from 'react';
// import classes from './Todos.module.css';
import Todo from './Todo/Todo';
import db from '../../firebase';

const todos = (props) => {
  const removeTodo = (idToDelete) => {
    db.collection('todos')
      .doc(idToDelete)
      .delete()
      .then(() => console.log('Task deleted successfully'))
      .catch((err) => console.log('Task deletion failed : ', err));
  };

  return (
    <ul>
      {props.todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo.id}
          deleteTodo={() => removeTodo(todo.id)}/>
      ))}
    </ul>
  );
};

export default todos;
