import { createAction } from "@reduxjs/toolkit";
import { UserModelType } from "../types";
import { AppThunk } from "../../store";

export const signIn = createAction<UserModelType>('user/set');
export const logout = createAction('user/logout');
export const autoLogin = createAction<UserModelType>('user/auto-login');

export const logoutAsync = (): AppThunk => dispatch => {
  localStorage.removeItem('authToken');
  dispatch(logout());
};