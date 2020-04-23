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
    } finally {
      dispatch(setLoader(false));
    }
  }
};

export const verifyUserAsync = (verifyCode: string, completeSuccess?: () => void): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(setLoader(true));

    const { user } = getState();

    try {
      if (user.user) {
        const newUser = await api.user.verify(user.user, verifyCode);
        dispatch(userAction.signIn(newUser));
        completeSuccess && completeSuccess();
      } else {
        dispatch(setError('You are not login in'));
      }
    } catch (e) {
      dispatch(setError(e.message));
    } finally {
      dispatch(setLoader(false));
    }
  }
};