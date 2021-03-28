import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  FormControl,
  Input,
  InputLabel,
  Button,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import classes from './Todo.module.css';
import db from '../../../firebase';
import Modal from '../../../UI/modal/modal';

const Todo = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState('');

  const inputChangeHandler = (event) => setInput(event.target.value);
  const updateTodoHandler = (event) => {
    event.preventDefault();
    db.collection('todos').doc(props.todo.id).set({ task : input }, { merge : true})
    .then(res => console.log('Task updated successfully : ', res))
    .catch(err => console.log('Task updation failed : ', err));
    setInput('');
    setEditMode(false);
  };

  return (
    <React.Fragment>
      <Modal show={editMode} modalClosed={() => {setEditMode(false); setInput('');}}>
        <div>
          <form className={classes.modalContent}>
            <FormControl>
              <InputLabel htmlFor='todo-input'>{props.todo.task}</InputLabel>
              <Input
                id='todo-input'
                aria-describedby='my-helper-text'
                type='text'
                value={input}
                onChange={inputChangeHandler}/>
            </FormControl>
            <Button
              className={classes.todoButton}
              variant='contained'
              color='primary'
              onClick={updateTodoHandler}
              type='submit'
              disabled={!input}>
              Update Todo
            </Button>
          </form>
        </div>
      </Modal>
      <List className={classes.todo__list}>
        <ListItem className={classes.listItem}>
          <ListItemText primary={props.todo.task} secondary='deadline' />
          <EditIcon
            variant='outlined'
            color='primary'
            onClick={() => setEditMode(true)}
            className={classes.cursor}/>
          <DeleteForeverIcon
            variant='outlined'
            color='secondary'
            onClick={props.deleteTodo}
            className={classes.cursor}/>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Todo;
