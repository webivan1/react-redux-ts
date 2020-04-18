import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { TodoListItemType } from "../../store/todo/types";

declare function confirm(message: string): boolean;

type PropTypes = {
  todos: TodoListItemType[],
  onToggle: (id: string, completed: boolean) => void;
  onRemove: (id: string) => void;
}

export const TodoList: FC<PropTypes> = ({ todos, onToggle, onRemove }: PropTypes) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? todos.map((item: TodoListItemType) => (
            <tr key={item.id}>
              <td>
                <Link to={`/todos/${item.id}`}>
                  {item.id}
                </Link>
              </td>
              <td className={item.isCompleted ? 'text-completed' : ''}>
                {item.name}
              </td>
              <td>
                <ButtonGroup>
                  <Button
                    variant={'success'}
                    size={'sm'}
                    onClick={() => onToggle(item.id, !item.isCompleted)}
                  >Toggle</Button>
                  <Button as={Link} to={`/todos/${item.id}`} variant={'primary'} size={'sm'}>
                    Edit
                  </Button>
                  <Button
                    variant={'danger'}
                    size={'sm'}
                    onClick={() => confirm('Are you sure?') ? onRemove(item.id) : null}
                  >Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={3} className={'text-primary'}>Todo is not found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
};