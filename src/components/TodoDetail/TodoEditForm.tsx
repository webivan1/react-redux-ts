import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { FormControl, Button, Form } from "react-bootstrap";

// Types
import { TodoType } from "../../store/todo/types";
import { TodoEditType } from "../../store/todo/detail/types";

type PropTypes = {
  todo: TodoType;
  loader: boolean;
  onEdit: (attrs: TodoEditType) => void;
  onRemove: () => void;
}

declare function confirm(message: string): boolean;

export const TodoEditForm: FC<PropTypes> = ({ todo, loader, onEdit, onRemove }: PropTypes) => {
  const { register, errors, setValue, handleSubmit } = useForm<TodoEditType>();

  setValue('isCompleted', todo.isCompleted);

  const onSubmit = (data: TodoEditType) => onEdit(data);
  const handleDelete = () => confirm('Are you sure?') ? onRemove() : void 0;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="pt-5">
      <Form.Group>
        <Form.Control
          type="text"
          name="name"
          defaultValue={todo.name}
          ref={register<FormControl<"input"> & HTMLInputElement>({
            required: true,
            minLength: 2,
            maxLength: 150
          })}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type={'invalid'}>The todo name is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Check
          custom
          id="isCompleted"
          type="switch"
          name="isCompleted"
          label="Did you complete the todo?"
          ref={register}
        />
      </Form.Group>

      <div className="text-right">
        <Button
          className="mr-1"
          variant="danger"
          disabled={loader}
          type="button"
          onClick={handleDelete}
        >Delete</Button>
        <Button disabled={loader} type="submit">Update</Button>
      </div>
    </Form>
  )
};