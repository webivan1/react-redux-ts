import React, { FC, createRef, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { isHtmlInputElement } from "../../guards";

// Actions
import { addToList } from "../../store/todo/list/actions";

export const TodoAddForm: FC = () => {
  const dispatch = useDispatch();
  const input = createRef<
    FormControl<"input"> & HTMLInputElement
  >();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isHtmlInputElement(input.current)) {
      const value = input.current.value.trim();
      if (value) {
        dispatch(addToList({ name: value }));
        input.current.value = '';
      }
    }
  };

  return (
    <Container fluid className={'py-5 bg-primary'}>
      <Form onSubmit={handleSubmit}>
        <Row className={'justify-content-md-center'}>
          <Col md={6} className={'text-center'}>
            <InputGroup>
              <FormControl
                placeholder="Todo title..."
                ref={input}
              />
              <InputGroup.Append>
                <Button variant="warning">
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