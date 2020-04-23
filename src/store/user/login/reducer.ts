import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormType, LoginType } from "./types";
import * as loginActions from "./actions";
import * as userActions from "../setUser/actions";

const initialState: LoginType = {
  loader: false,
  error: null,
  form: {
    email: '',
    password: ''
  }
};

export default createReducer(initialState, {
  [loginActions.setLoader.type]: (state: LoginType, action: PayloadAction<boolean>) => {
    state.loader = action.payload;
  },
  [loginActions.setError.type]: (state: LoginType, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
  [loginActions.changeFormFields.type]: (state: LoginType, action: PayloadAction<LoginFormType>) => {
    state.form = action.payload;
  }
});