import React, { FC, useEffect } from "react";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { TodoList } from "./TodoList";
import { TodoAddForm } from "./TodoAddForm";

// Actions
import {
  stopFetching,
  startFetching,
  setError,
  updateItem,
  loadTodoListAsync
} from "../../store/todo/list/actions";
import { removeTodoAsync, updateTodoAsync } from "../../store/todo/detail/actions";

// Types
import { RootState } from "../../store/store";
import { TodoListStateType } from "../../store/todo/list/types";
import { TodoType } from "../../store/todo/types";
import { TodoEditType } from "../../store/todo/detail/types";

export const Todo: FC = () => {
  const dispatch = useDispatch();

  const { todoList, pagination, loader, error } = useSelector<RootState, TodoListStateType>(state => state.todoList);

  const onClearError = () => setError(null);
  const loadList = () => dispatch(loadTodoListAsync());

  useEffect(() => {
    loadList();
  }, [dispatch]);

  const handleRemove = async (id: string) => {
    const response = await dispatch(removeTodoAsync(
      id, startFetching, stopFetching, setError, onClearError
    ));

    if (typeof response === 'boolean' && response) {
      loadList();
    }
  };

  const handleToggle = (id: string, completed: boolean) => {
    const fields: TodoEditType = { isCompleted: completed };
    const onUpdated = (newTodo: TodoType) => dispatch(updateItem(newTodo));

    dispatch(updateTodoAsync(
      id, fields, startFetching, stopFetching, onUpdated, setError, onClearError
    ));
  };

  return (
    <>
      <TodoAddForm />

      <Container className={'pt-5'}>
        <h1>Todo list</h1>

        <div className={'pt-5'}>
          <div className="d-flex justify-content-between">
            <div className="lead">
              Total: {pagination.total}
            </div>
            <Button variant="link" disabled={loader} onClick={loadList}>
              <Spinner style={{ visibility: loader ? 'visible' : 'hidden' }} animation="grow" variant="info" />
              {' '} Update
            </Button>
          </div>

          <TodoList
            todos={todoList}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />

          {error ? <Alert variant="danger">{error}</Alert> : null}
        </div>
      </Container>
    </>
  )
};