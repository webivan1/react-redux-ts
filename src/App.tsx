import React, { FC }  from "react";
import "./style/main.scss";
import { routes, Route } from "./router/router";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route as RouteComponent } from "react-router-dom";
import { autoLoginAsync } from "./store/user/login/actions";
import { RootState } from "./store/store";

// Components
import { Header } from "./components/layouts/header/Header";

export const App: FC = () => {

  useDispatch()(autoLoginAsync());

  const isLoggedIn: boolean = useSelector((state: RootState) => !!state.user.user);

  return (
    <BrowserRouter>
      <Header />

      <main>
        <Switch>
          {routes(isLoggedIn).map((route: Route, index: number) => (
            <RouteComponent key={index} {...route} />
          ))}
        </Switch>
      </main>

      <footer>Footer</footer>
    </BrowserRouter>
  )
};
