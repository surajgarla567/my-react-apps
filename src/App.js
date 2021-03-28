import React, { useState , useEffect } from 'react';
import classes from './App.module.css';
import Todo from './components/Todo/Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    let unsubscribeToSnapshot = db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(todosSnapshot => {
      //on Snapshot function is like a subscription
      let result = todosSnapshot.docs.map(doc => {return {id: doc.id, task: doc.data().task}});
      setTodos(result);
    });
    return () => {
      console.log('cleaning the snapshot subscription when the component unmounts');
      unsubscribeToSnapshot();
    }
  }, [])

  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({ task : input , timestamp : firebase.firestore.FieldValue.serverTimestamp() })
    .then(res => console.log('Task added successfully with id : ', res.id))
    .catch(err => console.log('Task addition failed : ', err));
    setInput('');
  };

  const removeTodo = (idToDelete) => {
    db.collection('todos').doc(idToDelete).delete()
    .then(() => console.log('Task deleted successfully'))
    .catch(err => console.log('Task deletion failed : ', err));
  }

  return (
    <div className={classes.App}>
      <h1>TODO Management App 📅 </h1>
      <form>
        <FormControl>
            <InputLabel htmlFor="todo-input">Write a TODO</InputLabel>
            <Input id="todo-input" 
                   aria-describedby="my-helper-text" 
                   type='text' 
                   value={input} 
                   onChange={(event) => { setInput(event.target.value); }} />
        </FormControl>
        <Button className={classes.todoButton} 
                variant='contained' 
                color='primary' 
                onClick={addTodo} 
                type='submit' 
                disabled={!input} >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} deleteTodo={() => removeTodo(todo.id)}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
