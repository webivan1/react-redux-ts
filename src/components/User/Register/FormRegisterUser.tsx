import React, { FC } from "react";
import { PropTypes } from "./types";
import { useForm } from "react-hook-form";
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { emailRegex } from "../../../regex";
import { RegisterFormType } from "../../../store/user/register/types";

export const FormRegisterUser: FC<PropTypes> = (props: PropTypes) => {
  const { register, handleSubmit, errors, getValues } = useForm<RegisterFormType>();
  const { formData, loader, error } = props;

  const onSubmit = (data: RegisterFormType) => props.onRegister(data);

  const usernameField = register<FormControl<"input"> & HTMLInputElement>({
    required: true,
    minLength: 2,
    maxLength: 50
  });

  const emailField = register<FormControl<"input"> & HTMLInputElement>({
    required: true,
    pattern: emailRegex,
    maxLength: 50
  });

  const passwordField = register<FormControl<"input"> & HTMLInputElement>({
    required: true,
    minLength: 5,
    maxLength: 32
  });

  const passwordConfirmation = register<FormControl<"input"> & HTMLInputElement>({
    required: true,
    validate: (value: string) => value === getValues().password
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Username <span className={'text-danger'}>*</span></Form.Label>
        <Form.Control
          type="text"
          name="username"
          defaultValue={formData.username}
          ref={usernameField}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type={'invalid'}>The username is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Email <span className={'text-danger'}>*</span></Form.Label>
        <Form.Control
          type="text"
          name="email"
          defaultValue={formData.email}
          ref={emailField}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type={'invalid'}>The email is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password <span className={'text-danger'}>*</span></Form.Label>
        <Form.Control
          type="password"
          name="password"
          defaultValue={formData.password}
          ref={passwordField}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type={'invalid'}>The password is required or min 5 length!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password confirmation <span className={'text-danger'}>*</span></Form.Label>
        <Form.Control
          type="password"
          name="passwordConfirmation"
          defaultValue={formData.passwordConfirmation}
          ref={passwordConfirmation}
          isInvalid={!!errors.passwordConfirmation}
        />
        <Form.Control.Feedback type={'invalid'}>Repeat your password please</Form.Control.Feedback>
      </Form.Group>

      {error ? (<Alert variant={'danger'}>{error}</Alert>) : null}

      <div className={'text-right'}>
        <Button disabled={loader} type={'submit'} variant={'primary'}>
          Register
        </Button>
      </div>
    </Form>
  )
};