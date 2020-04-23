import { createAction } from "@reduxjs/toolkit";
import * as userActions from "../setUser/actions";

// Types
import { AppThunk } from "../../store";
import { LoginFormType } from "./types";
import { UserModelType } from "../types";

// Api
import api from "../../../api";

export const setLoader = createAction<boolean>('login/set-loader');
export const setError = createAction<string>('login/set-error');
export const changeFormFields = createAction<LoginFormType>('login/change-form');

export const loginAsync = (form: LoginFormType, completeSuccess?: () => void): AppThunk => async dispatch => {
  dispatch(setLoader(true));

  try {
    const user: UserModelType = await api.user.findByCredentials(form);
    dispatch(userActions.signIn(user));
    completeSuccess && completeSuccess();
  } catch (e) {
    dispatch(setError(e.message))
  } finally {
    dispatch(setLoader(false));
  }
};

export const autoLoginAsync = (): AppThunk => async dispatch => {
  dispatch(setLoader(true));

  try {
    const token: string|null = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token is not found');
    } else {
      const user: UserModelType|null = await api.user.findByToken(token);
      if (user) {
        dispatch(userActions.signIn(user));
      }
    }
  } catch (e) {
    console.log(e.message);
  } finally {
    dispatch(setLoader(false))
  }
};