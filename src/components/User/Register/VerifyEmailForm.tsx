import React, { FC } from "react";
import { PropTypes } from "./types";
import { useForm } from "react-hook-form";
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { RegisterFormType } from "../../../store/user/register/types";

export const VerifyEmailForm: FC<PropTypes> = (props: PropTypes) => {

  const { register, errors, handleSubmit } = useForm<RegisterFormType>();
  const { formData, error, loader } = props;

  const onSubmit = (data: RegisterFormType) => props.onVerified(data);
  const handleClose = () => props.onClose();

  const verifyCodeField = register<FormControl<"input"> & HTMLInputElement>({
    required: true,
    minLength: 2,
    maxLength: 50,
    // @todo test
    validate: (value: string) => value === '12345'
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Alert variant={'info'}>
        We sent a verify code on your email address {formData.email}
      </Alert>

      <Form.Group>
        <Form.Label>Verify code <span className={'text-danger'}>*</span></Form.Label>
        <Form.Control
          type="text"
          name="verifyCode"
          defaultValue={formData.verifyCode}
          ref={verifyCodeField}
          isInvalid={!!errors.verifyCode}
        />
        <Form.Control.Feedback type={'invalid'}>The verify code is required!</Form.Control.Feedback>
        <p className={'text-muted text-sm'}>Write code <strong className={'text-danger'}>12345</strong></p>
      </Form.Group>

      {error ? (<Alert variant={'danger'}>{error}</Alert>) : null}

      <div className={'text-right'}>
        <Button disabled={loader} type={'button'} onClick={handleClose} variant={'warning'} className={'mr-2'}>
          Cancel
        </Button>
        <Button disabled={loader} type={'submit'} variant={'primary'}>
          Verify
        </Button>
      </div>
    </Form>
  )
};