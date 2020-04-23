import React, { FC, useState } from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { logoutAsync } from "../../../store/user/setUser/actions";
import { Auth } from "../../User/Auth/Auth";

enum AuthForm {
  'login' = 'login',
  'register' = 'register'
}

type AuthFormType = keyof typeof AuthForm;

export const Header: FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { todoList, user } = state;

  const [authModal, setAuthModal] = useState(false);

  const handleShowAuthModal = () => setAuthModal(true);
  const handleHideAuthModal = () => setAuthModal(false);

  const handleLogout = () => dispatch(logoutAsync());

  return (
    <>
      <Auth
        isShow={authModal}
        onHide={handleHideAuthModal}
      />

      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to={'/'}>TodoApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
            {user.user ? (
              <Nav.Link as={Link} to={'/todos'}>
                Todo <strong>({ todoList.todoList.length })</strong>
              </Nav.Link>
            ) : null}
          </Nav>
          <Nav>
            {user.user ? (
              <NavDropdown title={user.user.username} drop={'left'} id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Button} onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button className={'mr-1'} variant={'link'} onClick={handleShowAuthModal}>
                Log in
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
};