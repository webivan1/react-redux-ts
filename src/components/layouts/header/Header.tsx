import React, { FC, useState } from "react";
import { Navbar, Nav, Modal, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { logout } from "../../../store/user/setUser/actions";

import { Register } from "../../User/Register/Register";

export const Header: FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { todoList, user } = state;

  const [authModal, setAuthModal] = useState(false);

  const handleShowRegisterModal = () => setAuthModal(true);
  const handleHideRegisterModal = () => setAuthModal(false);
  const handleLogout = () => dispatch(logout());

  return (
    <>
      <Modal show={authModal} onHide={handleHideRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register onClose={handleHideRegisterModal} />
        </Modal.Body>
      </Modal>

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
              <>
                <Button className={'mr-1'} variant={'link'}>
                  Sign In
                </Button>
                <Button variant={'link'} onClick={handleShowRegisterModal}>
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
};