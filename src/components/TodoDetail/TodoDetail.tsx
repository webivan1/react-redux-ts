import React, { FC, useEffect } from "react";
import { withRouter, Redirect, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Alert, Container } from "react-bootstrap";
import { TodoEditForm } from "./TodoEditForm";

// Actions
import {
  setDetail,
  clearDetail,
  startFetching,
  stopFetching,
  setError,
  findTodoAsync,
  updateTodoAsync, removeTodoAsync
} from "../../store/todo/detail/actions";

// Types
import { RootState } from "../../store/store";
import { TodoEditType } from "../../store/todo/detail/types";
import { TodoType } from "../../store/todo/types";

type PropTypes = RouteComponentProps<{ id: string }>;

const TodoDetail: FC<PropTypes> = (props: PropTypes) => {

  const id: string = props.match.params.id;
  const dispatch = useDispatch();
  const { detail, error, loader } = useSelector((state: RootState) => state.todoDetail);

  useEffect(() => {
    dispatch(findTodoAsync(id));

    return () => {
      dispatch(clearDetail())
    }
  }, [dispatch]);

  const onEdit = (attrs: TodoEditType) => {
    if (detail) {
      const onSuccess = (newTodo: TodoType) => dispatch(setDetail(newTodo));

      dispatch(updateTodoAsync(
        detail.id, attrs, startFetching, stopFetching, onSuccess, setError, () => setError(null)
      ));
    }
  };

  const onRemove = async () => {
    if (detail) {
      await dispatch(removeTodoAsync(
        detail.id, startFetching, stopFetching, setError, () => setError(null)
      ));

      dispatch(setError('Todo has been deleted'));
    }
  };

  if (error) {
    return <Redirect to={'/todos'} />
  }

  return (
    <Container className={'pt-5'}>
      <h1>
        <span className={detail?.isCompleted ? 'text-completed' : ''}>
          {detail?.name}
        </span>{' '}

        {'{'}{detail?.isCompleted ? (
          <span className="text-success">Completed!</span>
        ) : (
          <span className="text-warning">Todo</span>
        )}{'}'}

        {loader ? <Spinner animation="grow" variant="info" /> : null}
      </h1>

      {detail ? (
        <TodoEditForm
          loader={loader}
          todo={detail}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ) : null}
    </Container>
  )
};

export default withRouter(TodoDetail);