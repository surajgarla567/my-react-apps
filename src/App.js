import React, { useState , useEffect } from 'react';
import './App.css';
import Todo from './components/Todo/Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('running the effect');
    let unsubscribeToSnapshot = db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(todosSnapshot => {
      //on Snapshot function is like a subscription
      console.log('snapshot chnaged');
      let result = todosSnapshot.docs.map(doc => doc.data()['task']);
      setTodos(result);
    });
    return () => {
      console.log('cleaning the snapshot subscription');
      unsubscribeToSnapshot();
    }
  }, [])

  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({ task : input , timestamp : firebase.firestore.FieldValue.serverTimestamp() })
    .then(res => console.log('added success : ', res.id))
    .catch(err => console.log('added failure : ', err));

    setInput('');
  };

  return (
    <div className='App'>
      <h1>Hello World</h1>

      <form>
        <FormControl>
            <InputLabel htmlFor="todo-input">Write a TODO</InputLabel>
            <Input id="todo-input" aria-describedby="my-helper-text" type='text' value={input} onChange={(event) => { setInput(event.target.value); }} />
        </FormControl>
        <Button className="todoButton" variant='contained' color='primary' onClick={addTodo} type='submit' disabled={!input} >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todoText={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
