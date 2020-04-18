import React, { FC, useEffect } from "react";
import { withRouter, Redirect, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Spinner, Alert, Container } from "react-bootstrap";
import { TodoEditForm } from "./TodoEditForm";

// Actions
import { findTodoAsync, editDetail, clearDetail } from "../../store/todo/detail/actions";
import { removeFormList } from "../../store/todo/list/actions";
import { TodoEditType } from "../../store/todo/types";

type PropTypes = RouteComponentProps<{ id: string }>;

const TodoDetail: FC<PropTypes> = (props: PropTypes) => {

  const id: string = props.match.params.id;
  const dispatch = useDispatch();
  const detail = useSelector((state: RootState) => state.todoDetail);

  useEffect(() => {
    dispatch(findTodoAsync(id));

    return () => {
      dispatch(clearDetail())
    }
  }, []);

  if (detail.error) {
    return <Redirect to={'/todos'} />
  }

  const onEdit = (attrs: TodoEditType) => dispatch(editDetail(attrs));
  const onRemove = (id: string) => dispatch(removeFormList({ id }));

  return (
    <Container className={'pt-5'}>
      {detail.loader ? (
        <Spinner animation="grow" variant="info" />
      ) : (detail.error || !detail.detail ? (
        <Alert variant={'danger'}>{detail.error || 'Waiting...'}</Alert>
      ) : (
        <TodoEditForm
          todo={detail.detail}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </Container>
  )
};

export default withRouter(TodoDetail);