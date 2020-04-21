import { createAction } from "@reduxjs/toolkit";
import { RegisterFormType } from "./types";
import { AppThunk } from "../../store";
import { UserStatuses } from "../types";

// Actions
import * as userAction from "../setUser/actions";

// Api
import api from "../../../api";

export const setForm = createAction<RegisterFormType>('user/register/set-form');
export const setLoader = createAction<boolean>('user/register/set-loader');
export const setError = createAction<string>('user/register/set-error');

export const registerUserAsync = (form: RegisterFormType, completeSuccess?: () => void): AppThunk => {
  return async dispatch => {
    dispatch(setForm(form));
    dispatch(setLoader(true));

    try {
      const user = await api.user.create(form, UserStatuses.notVerified);
      dispatch(userAction.signIn(user));
      completeSuccess && completeSuccess();
    } catch (e) {
      dispatch(setError(e.message));
      console.log('SET ERROR');
    } finally {
      dispatch(setLoader(false));
    }
  }
};

// @todo update user
export const verifyUserAsync = (verifyCode: string): AppThunk => (dispatch, getState) => {
  dispatch(setLoader(true));

  const { user } = getState();

  setTimeout(() => {
    // send to server { id, verifyCode }
    // response form server { id, username, email, status, createdAt }
    if (user.user) {
      dispatch(userAction.signIn({...user.user, status: UserStatuses.active}));
      dispatch(setLoader(false));
    } else {
      dispatch(setError('You are not login in'));
    }
  }, 500);
};