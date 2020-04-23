import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, FormControl, Alert, Button } from "react-bootstrap";
import { emailRegex } from "../../../regex";

// Types
import { PropFormTypes, ListComponents } from "../Auth/types"
import { LoginFormType } from "../../../store/user/login/types";
import { RootState } from "../../../store/store";
import { loginAsync } from "../../../store/user/login/actions";

export const Login: FC<PropFormTypes> = ({ onClose, onChangeForm }: PropFormTypes) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, getValues } = useForm<LoginFormType>();
  const { loader, form, error } = useSelector((state: RootState) => state.login);

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

  const onSubmit = (data: LoginFormType) => {
    dispatch(loginAsync(data, () => onClose()));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {typeof onChangeForm === 'function' ? (
        <p className={'text-muted lead'}>
          If you dont have account, you can {' '}
          <a
            href={'#'}
            className={'text-link'}
            onClick={() => onChangeForm(ListComponents.register)}
          >register</a>
        </p>
      ) : null}

      <Form.Group>
        <Form.Label>Email <span className={'text-danger'}>*</span></Form.Label>
        <Form.Control
          type="text"
          name="email"
          defaultValue={form.email}
          ref={emailField}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type={'invalid'}>The email must be correct!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password <span className={'text-danger'}>*</span></Form.Label>
        <Form.Control
          type="password"
          name="password"
          defaultValue={form.password}
          ref={passwordField}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type={'invalid'}>The password is required!</Form.Control.Feedback>
      </Form.Group>

      {error ? <Alert variant={'danger'}>{error}</Alert> : null}

      <div className={'text-right'}>
        <Button disabled={loader} type={'submit'} variant={'primary'}>
          Sign in
        </Button>
      </div>
    </Form>
  )
};