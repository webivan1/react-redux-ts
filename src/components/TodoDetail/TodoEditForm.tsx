import React, { FC, createRef, useState } from "react";
import { TodoEditType, TodoType } from "../../store/todo/types";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { isHtmlInputElement } from "../../guards";

type PropTypes = {
  todo: TodoType;
  onEdit: (attrs: TodoEditType) => void;
  onRemove: (id: string) => void;
}

export const TodoEditForm: FC<PropTypes> = ({ todo, onEdit, onRemove }: PropTypes) => {

  const [isEditable, setIsEditable] = useState(false);
  const input = createRef<
    FormControl<"input"> & HTMLInputElement
  >();

  const handleSetEditable = () => setIsEditable(true);

  const handleChangeName = () => {
    setIsEditable(false);

    if (input && isHtmlInputElement(input.current)) {
      let value = input.current.value.trim();
      if (value && value !== todo.name) {
        onEdit({ id: todo.id, name: value })
      }
    }
  };

  const handleToggleTodo = () => {
    onEdit({ id: todo.id, isCompleted: !todo.isCompleted });
  };

  const handleRemove = () => {
    onRemove(todo.id)
  };

  return (
    <div>
      <div className={'mb-4'}>
        {isEditable ? (
          <div>
            <InputGroup size="lg">
              <Form.Control
                placeholder="Todo title"
                defaultValue={todo.name}
                as={'input'}
                ref={input}
              />
              <InputGroup.Prepend>
                <Button
                  type={'button'}
                  variant="primary"
                  onClick={handleChangeName}
                >Save</Button>
              </InputGroup.Prepend>
            </InputGroup>
          </div>
        ) : (
          <>
            <h3 className={todo.isCompleted ? 'text-completed' : ''}>
              {todo.name} {' '}
              <a
                className={'text-primary text-underline'}
                href="javascript:void(0)"
                onClick={handleSetEditable}
              >Edit</a>
            </h3>
          </>
        )}
      </div>

      <Button
        className={'mr-3'}
        type={'button'}
        variant={todo.isCompleted ? 'warning' : 'success'}
        onClick={handleToggleTodo}
      >{todo.isCompleted ? 'Cancel' : 'Finished'}</Button>

      <Button
        type={'button'}
        variant={'danger'}
        onClick={handleRemove}
      >Delete</Button>
    </div>
  )
};