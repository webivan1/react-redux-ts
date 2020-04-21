import React, { FC, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { TodoList } from "./TodoList";
import { TodoAddForm } from "./TodoAddForm";

// Actions
import { setDefaultTodoListAsync, removeFormList } from "../../store/todo/list/actions";
import { editDetail } from "../../store/todo/detail/actions";
import { TodoListType } from "../../store/todo/types";

export const Todo: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector<RootState, TodoListType>(state => state.todoList);

  useEffect(() => {
    if (!data.todoList.length) {
      dispatch(setDefaultTodoListAsync())
    }
  }, [dispatch]);

  const handleRemove = (id: string) => dispatch(removeFormList({ id }));
  const handleToggle = (id: string, completed: boolean) => {
    dispatch(editDetail({ id, isCompleted: completed }));
  };

  return (
    <>
      <TodoAddForm />

      <Container className={'pt-5'}>
        <h1>Todo</h1>

        <div className={'pt-5'}>
          {data.loader ? (
            <Spinner animation="grow" variant="info" />
          ) : null}

          <TodoList
            todos={data.todoList}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        </div>
      </Container>
    </>
  )
};