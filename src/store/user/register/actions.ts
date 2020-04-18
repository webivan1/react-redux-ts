import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RegisterFormType } from "./types";
import { AppThunk } from "../../store";
import { UserModelType, UserStatuses } from "../types";
import * as userAction from "../setUser/actions";

export const setForm = createAction<RegisterFormType>('user/register/set-form');
export const setLoader = createAction<boolean>('user/register/set-loader');
export const setError = createAction<string>('user/register/set-error');

export const registerUserAsync = (form: RegisterFormType): AppThunk<Promise<UserModelType|null>> => {
  return dispatch => {
    dispatch(setForm(form));
    dispatch(setLoader(true));

    return new Promise(resolve => {
      setTimeout(() => {
        // send to server { username, email, password }
        // response form server { id, username, email, status, createdAt }
        if (form.email === 'admin@admin.com') {
          dispatch(setError('User is already exists'));
          resolve(null);
        } else {
          const responseUser: UserModelType = {
            id: uuidv4(),
            username: form.username,
            email: form.email,
            status: UserStatuses.notVerified,
            createdAt: (new Date).getTime()
          };

          dispatch(userAction.signIn(responseUser));
          resolve(responseUser);
        }

        dispatch(setLoader(false));
      }, 1000)
    });
  }
};

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