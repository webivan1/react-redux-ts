import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormsType } from "./types";

// Forms
import { FormRegisterUser } from "./FormRegisterUser";
import { VerifyEmailForm } from "./VerifyEmailForm";
import { RootState } from "../../../store/store";
import { RegisterFormType } from "../../../store/user/register/types";

// Actions
import * as registerAction from "../../../store/user/register/actions";

// Types
import { PropFormTypes } from "../Auth/types";

const formNames: FormsType = {
  FormRegisterUser,
  VerifyEmailForm
};

export const Register: FC<PropFormTypes> = (props: PropFormTypes) => {
  const [formName, setFormName] = useState<keyof FormsType>('FormRegisterUser');

  const dispatch = useDispatch();
  const { form, loader, error } = useSelector((state: RootState) => state.register);

  const onSetStep = (step: keyof FormsType) => setFormName(step);

  const onRegister = async (newFormData: RegisterFormType) => {
    await dispatch(registerAction.registerUserAsync(newFormData, () => onSetStep('VerifyEmailForm')));
  };

  const onVerified = async (newFormData: RegisterFormType) => {
    await dispatch(registerAction.verifyUserAsync(newFormData.verifyCode));
    props.onClose();
  };

  const FormComponent = formNames[formName];

  return (
    <div>
      <FormComponent
        onSetStep={onSetStep}
        onRegister={onRegister}
        onVerified={onVerified}
        onChangeForm={props.onChangeForm}
        onClose={() => props.onClose()}
        error={error}
        formData={form}
        loader={loader}
      />
    </div>
  )
};