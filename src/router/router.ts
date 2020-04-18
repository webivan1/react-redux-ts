import { ComponentType, FC } from "react";

// Components
import { Home } from "../components/Home/Home";
import { Todo } from "../components/Todo/Todo";
import TodoDetail from "../components/TodoDetail/TodoDetail";

export type Route = {
  path: string;
  component: FC | ComponentType;
  exact?: boolean;
  routes?: Route[]
}

export function routes(isLoggedIn: boolean): Route[] {
  const routes: Route[] = [
    {
      path: "/",
      component: Home,
      exact: true
    }
  ];

  if (isLoggedIn) {
    routes.push({
      path: "/todos",
      component: Todo,
      exact: true
    });

    routes.push({
      path: "/todos/:id",
      component: TodoDetail,
    })
  }

  return routes;
};