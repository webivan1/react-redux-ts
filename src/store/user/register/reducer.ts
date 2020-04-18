import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { RegisterFormType, RegisterType } from "./types";
import * as registerAction from "./actions";

const initialState: RegisterType = {
  form: {
    username: 'Test',
    email: 'test@test.com',
    password: '12345',
    passwordConfirmation: '12345',
    verifyCode: ''
  },
  error: null,
  loader: false
};

export default createReducer(initialState, {
  [registerAction.setForm.type]: (state: RegisterType, action: PayloadAction<RegisterFormType>): void => {
    state.error = null;
    state.form = action.payload;
  },
  [registerAction.setLoader.type]: (state: RegisterType, action: PayloadAction<boolean>): void => {
    state.loader = action.payload;
  },
  [registerAction.setError.type]: (state: RegisterType, action: PayloadAction<string>): void => {
    state.error = action.payload;
  },
});