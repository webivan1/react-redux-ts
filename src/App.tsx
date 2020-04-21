import React, { FC }  from "react";
import "./style/main.scss";
import { routes, Route } from "./router/router";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginAsync } from "./store/user/setUser/actions";
import { BrowserRouter, Switch, Route as RouteComponent } from "react-router-dom";

// Components
import { Header } from "./components/layouts/header/Header";
import { RootState } from "./store/store";

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
