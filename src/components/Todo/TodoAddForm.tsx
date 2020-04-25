import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Container, Row, Col, InputGroup, FormControl, Button, Form } from "react-bootstrap";

// Actions
import { addNewTodoAsync } from "../../store/todo/create/actions";

// Types
import { RootState } from "../../store/store";
import { TodoAddType } from "../../store/todo/types";

export const TodoAddForm: FC = () => {
  const dispatch = useDispatch();
  const { loader, error } = useSelector((state: RootState) => state.todoCreate);
  const { errors, register, handleSubmit, setValue } = useForm<TodoAddType>();

  const onSubmit = async (data: TodoAddType) => {
    setValue('name', '');
    await dispatch(addNewTodoAsync(data));
  };

  return (
    <Container fluid className={'py-5 bg-primary'}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className={'justify-content-md-center'}>
          <Col md={6} className={'text-center'}>
            <InputGroup>
              <Form.Control
                name="name"
                placeholder="Todo title..."
                isInvalid={!!errors.name || !!error}
                disabled={loader}
                ref={register<FormControl<"input"> & HTMLInputElement>({
                  required: true,
                  minLength: 2,
                  maxLength: 150
                })}
              />
              <InputGroup.Append>
                <Button type={'submit'} disabled={loader} variant="warning">
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  )
};